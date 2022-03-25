// eslint-disable-next-line node/no-unpublished-import
import { mock, MockProxy } from 'jest-mock-extended';

import { IFindByEmailCustomersRepository } from '@domain/contracts/repositories/customers/find-by-email.customers-repository';
import { ISaveCustomersRepository } from '@domain/contracts/repositories/customers/save.customers-repository';
import { ContentParameterExistsInModelError } from '@domain/entities/errors/content-parameter-exists-in-model.error';
import { NotFoundModelByParameterError } from '@domain/entities/errors/not-found-model-by-parameter.error';
import { Customer } from '@domain/entities/models/customer.model';
import { Email } from '@domain/entities/models/email.model';
import { Password } from '@domain/entities/models/password.model';
import { failure, success } from '@domain/shared/utils/either.util';
import { ICreateCustomerUseCase } from '@domain/use-cases/customers/create-customer.use-case';

import { CreateCustomerUseCase } from '../create-customer.use-case';

describe('Create Customer Use Case', () => {
  let sut: ICreateCustomerUseCase;
  let customersRepository: MockProxy<IFindByEmailCustomersRepository & ISaveCustomersRepository>;
  let emailCustomer: Email;
  let passwordCustomer: Password;

  beforeAll(() => {
    customersRepository = mock();
    customersRepository.findByEmail.mockResolvedValue(
      failure(
        new NotFoundModelByParameterError({
          model: 'customer',
          parameter: 'email'
        })
      )
    );
    customersRepository.save.mockResolvedValue(success({ customer: { id: 'any_id' } }));
    const emailCreated = Email.create({ email: 'any_email_customer@example.com' });
    emailCustomer = emailCreated.value as Email;
    const passwordValidated = Password.validate({ password: 'Any_Password123' });
    passwordCustomer = passwordValidated.value as Email;
  });

  beforeEach(() => {
    sut = new CreateCustomerUseCase(customersRepository);
  });

  it('should be defined email and password of customer', () => {
    expect(emailCustomer).toBeInstanceOf(Email);
    expect(passwordCustomer).toBeInstanceOf(Password);
  });

  it('should call FindByEmailCustomersRepository with correct params', async () => {
    const parameters = { email: emailCustomer.value, name: 'any_name', password: passwordCustomer.value };

    await sut.execute(parameters);

    expect(customersRepository.findByEmail).toHaveBeenCalledWith({ email: emailCustomer });
    expect(customersRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it('should call SaveCustomersRepository with correct params', async () => {
    const parameters = { email: emailCustomer.value, name: 'any_name', password: passwordCustomer.value };

    await sut.execute(parameters);

    expect(customersRepository.save).toHaveBeenCalledWith({
      email: emailCustomer,
      name: parameters.name,
      password: passwordCustomer
    });
    expect(customersRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should return ContentParameterExistsInModelError when FindByEmailCustomersRepository returns Customer', async () => {
    const error = new ContentParameterExistsInModelError({
      content: emailCustomer.value,
      model: 'customer',
      parameter: 'email'
    });
    customersRepository.findByEmail.mockResolvedValueOnce(
      success(
        new Customer({
          email: emailCustomer,
          password: passwordCustomer,
          id: 'any_id',
          name: 'any_name'
        })
      )
    );

    const parameters = { email: emailCustomer.value, name: 'any_name', password: passwordCustomer.value };

    const result = await sut.execute(parameters);

    expect(result.value).toEqual(error);
  });
});
