import { SaveModelInRepositoryError } from '@domain/entities/errors/save-model-in-repository.error';
import { Email } from '@domain/entities/models/email.model';
import { Either } from '@domain/shared/utils/either.util';

export namespace SaveCustomersRepositoryDTO {
  export type Parameters = {
    id?: string;
    email: Email;
    password: string;
    name: string;
  };

  export type Result = Promise<
    Either<
      SaveModelInRepositoryError,
      {
        customer: {
          id: string;
        };
      }
    >
  >;
}

export interface SaveCustomersRepository {
  save(parameters: SaveCustomersRepositoryDTO.Parameters): SaveCustomersRepositoryDTO.Result;
}
