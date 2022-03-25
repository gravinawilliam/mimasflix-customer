import {
  FindByEmailCustomersRepositoryDTO,
  IFindByEmailCustomersRepository
} from '@domain/contracts/repositories/customers/find-by-email.customers-repository';
import {
  ISaveCustomersRepository,
  SaveCustomersRepositoryDTO
} from '@domain/contracts/repositories/customers/save.customers-repository';
import { NotFoundModelByParameterError } from '@domain/entities/errors/not-found-model-by-parameter.error';
import { SaveModelInRepositoryError } from '@domain/entities/errors/save-model-in-repository.error';
import { ServerError } from '@domain/entities/errors/server.error';
import { Email } from '@domain/entities/models/email.model';
import { Password } from '@domain/entities/models/password.model';
import { IGenerateUuidCryptoProvider } from '@domain/providers/crypto/generate-uuid-crypto-provider.interface';
import { failure, success } from '@domain/shared/utils/either.util';

import { CustomerTable } from '../tables/customer.table';
import { TypeormRepository } from './index';

export default class CustomersRepositoryTypeorm
  extends TypeormRepository
  implements IFindByEmailCustomersRepository, ISaveCustomersRepository
{
  constructor(private readonly cryptoProvider: IGenerateUuidCryptoProvider) {
    super();
  }

  public async findByEmail(
    parameters: FindByEmailCustomersRepositoryDTO.Parameters
  ): FindByEmailCustomersRepositoryDTO.Result {
    try {
      const ormRepository = this.getRepository<CustomerTable>(CustomerTable);

      const found = await ormRepository.findOne({
        where: { email: parameters.email.value }
      });

      if (found === undefined) {
        return failure(new NotFoundModelByParameterError({ model: 'customer', parameter: 'email' }));
      }

      const email = Email.create({ email: found.email });
      const password = Password.validate({ password: found.password });
      if (email.isFailure()) return failure(email.value);
      if (password.isFailure()) return failure(password.value);

      return success({
        email: email.value,
        password: password.value,
        name: found.name,
        id: found.id
      });
    } catch (error: any) {
      return failure(new ServerError(error));
    }
  }

  public async save(parameters: SaveCustomersRepositoryDTO.Parameters): SaveCustomersRepositoryDTO.Result {
    try {
      const ormRepository = this.getRepository(CustomerTable);
      if (parameters.id !== undefined) {
        await ormRepository.update(
          {
            id: parameters.id
          },
          {
            name: parameters.name,
            email: parameters.email.value,
            password: parameters.password.value
          }
        );

        return success({
          customer: {
            id: parameters.id
          }
        });
      }

      const idGenerated = this.cryptoProvider.generateUuid();
      if (idGenerated.isFailure()) return failure(idGenerated.value);

      const created = await ormRepository.save({
        name: parameters.name,
        email: parameters.email.value,
        password: parameters.password.value,
        id: idGenerated.value
      });

      return success({
        customer: {
          id: created.id
        }
      });
    } catch (error: any) {
      console.log({ error });
      return failure(
        new SaveModelInRepositoryError({
          model: 'customer',
          error
        })
      );
    }
  }
}
