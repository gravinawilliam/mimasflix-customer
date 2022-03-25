import { ContentParameterExistsInModelError } from '@domain/entities/errors/content-parameter-exists-in-model.error';
import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';
import { SaveModelInRepositoryError } from '@domain/entities/errors/save-model-in-repository.error';
import { Either } from '@domain/shared/utils/either.util';

export namespace CreateCustomerUseCaseDTO {
  export type Parameters = {
    name: string;
    email: string;
    password: string;
  };

  export type Errors = InvalidContentParameterError | ContentParameterExistsInModelError | SaveModelInRepositoryError;

  export type Result = Promise<Either<Errors, { customerId: string }>>;
}

export interface ICreateCustomerUseCase {
  execute(parameters: CreateCustomerUseCaseDTO.Parameters): CreateCustomerUseCaseDTO.Result;
}
