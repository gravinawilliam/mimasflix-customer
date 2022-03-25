// eslint-disable-next-line node/no-unpublished-import
import { mock, MockProxy } from 'jest-mock-extended';

import { ICreateCustomerController } from '@domain/controllers/customers/create-customer.controller';
import { success } from '@domain/shared/utils/either.util';
import { ICreateCustomerUseCase } from '@domain/use-cases/customers/create-customer.use-case';

import { CreateCustomerController } from '../create-customer.controller';

describe('Create Customer Controller', () => {
  let sut: ICreateCustomerController;
  let createCustomerUseCase: MockProxy<ICreateCustomerUseCase>;

  beforeAll(() => {
    createCustomerUseCase = mock();
    createCustomerUseCase.execute.mockResolvedValue(
      success({
        customerId: 'any_id'
      })
    );
  });

  beforeEach(() => {
    sut = new CreateCustomerController(createCustomerUseCase);
  });

  it('should call CreateCustomerUseCase with correct params', async () => {
    const parameters = {
      body: {
        email: 'any_email@example.com',
        name: 'any_name',
        password: 'Any_Password123'
      }
    };

    await sut.handle(parameters);

    expect(createCustomerUseCase.execute).toHaveBeenCalledWith({
      email: parameters.body.email,
      name: parameters.body.name,
      password: parameters.body.password
    });
    expect(createCustomerUseCase.execute).toHaveBeenCalledTimes(1);
  });
});
