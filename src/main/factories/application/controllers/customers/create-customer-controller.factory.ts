import { CreateCustomerController } from '@application/controllers/customers/create-customer.controller';
import { CreateCustomerUseCase } from '@application/use-cases/customers/create-customer.use-case';
import { IFindByEmailCustomersRepository } from '@domain/contracts/repositories/customers/find-by-email.customers-repository';
import { ISaveCustomersRepository } from '@domain/contracts/repositories/customers/save.customers-repository';
import { ICreateCustomerController } from '@domain/controllers/customers/create-customer.controller';
import { IGenerateUuidCryptoProvider } from '@domain/providers/crypto/generate-uuid-crypto-provider.interface';
import { ICreateCustomerUseCase } from '@domain/use-cases/customers/create-customer.use-case';
import CustomersRepositoryTypeorm from '@infra/database/typeorm/repositories/customers-repository.typeorm';
import { UuidCryptoProvider } from '@infra/providers/crypto/uuid-crypto.provider';

export const makeCreateCustomerController = (): ICreateCustomerController => {
  const cryptoProvider: IGenerateUuidCryptoProvider = process.env.nodeEnv == 'prod' ? new UuidCryptoProvider() : new Qualqer();
  const customersRepository: IFindByEmailCustomersRepository & ISaveCustomersRepository =
    new CustomersRepositoryTypeorm(cryptoProvider);
  const createCustomerUseCase: ICreateCustomerUseCase = new CreateCustomerUseCase(customersRepository);
  return new CreateCustomerController(createCustomerUseCase);
};
