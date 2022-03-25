import { IFindByEmailCustomersRepository } from '@domain/contracts/repositories/customers/find-by-email.customers-repository';
import { ISaveCustomersRepository } from '@domain/contracts/repositories/customers/save.customers-repository';
import { ContentParameterExistsInModelError } from '@domain/entities/errors/content-parameter-exists-in-model.error';
import { Email } from '@domain/entities/models/email.model';
import { Password } from '@domain/entities/models/password.model';
import { IEncryptPasswordCryptoProvider } from '@domain/providers/crypto/encrypt-password-crypto-provider.interface';
import { failure, success } from '@domain/shared/utils/either.util';
import { CreateCustomerUseCaseDTO, ICreateCustomerUseCase } from '@domain/use-cases/customers/create-customer.use-case';

export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    private readonly customersRepository: IFindByEmailCustomersRepository & ISaveCustomersRepository,
    private readonly cryptoProvider: IEncryptPasswordCryptoProvider
  ) {}

  public async execute(parameters: CreateCustomerUseCaseDTO.Parameters): CreateCustomerUseCaseDTO.Result {
    const emailCreatedOrError = Email.create({ email: parameters.email });
    if (emailCreatedOrError.isFailure()) return failure(emailCreatedOrError.value);

    const passwordValidatedOrError = Password.validate({ password: parameters.password });
    if (passwordValidatedOrError.isFailure()) return failure(passwordValidatedOrError.value);

    const emailExistsOrError = await this.customersRepository.findByEmail({ email: emailCreatedOrError.value });
    if (emailExistsOrError.isSuccess()) {
      return failure(
        new ContentParameterExistsInModelError({
          content: parameters.email,
          parameter: 'email',
          model: 'customer'
        })
      );
    }

    const encryptedPasswordOrError = await this.cryptoProvider.encryptPassword({
      password: passwordValidatedOrError.value
    });
    if (encryptedPasswordOrError.isFailure()) return failure(encryptedPasswordOrError.value);

    const savedCustomerOrError = await this.customersRepository.save({
      email: emailCreatedOrError.value,
      password: encryptedPasswordOrError.value.encryptedPassword,
      name: parameters.name
    });
    if (savedCustomerOrError.isFailure()) return failure(savedCustomerOrError.value);

    return success({ customerId: savedCustomerOrError.value.customer.id });
  }
}
