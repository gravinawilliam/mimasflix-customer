import { NotFoundModelByParameterError } from '@domain/entities/errors/not-found-model-by-parameter.error';
import { Customer } from '@domain/entities/models/customer.model';
import { Email } from '@domain/entities/models/email.model';
import { Either } from '@domain/shared/utils/either.util';

export namespace FindByEmailCustomersRepositoryDTO {
  export type Parameters = {
    email: Email;
  };

  export type Result = Promise<Either<NotFoundModelByParameterError, Customer>>;
}

export interface IFindByEmailCustomersRepository {
  findByEmail(parameters: FindByEmailCustomersRepositoryDTO.Parameters): FindByEmailCustomersRepositoryDTO.Result;
}
