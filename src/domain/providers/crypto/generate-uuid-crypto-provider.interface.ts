import { ServerError } from '@domain/entities/errors/server.error';
import { Either } from '@domain/shared/utils/either.util';

export namespace GenerateUuidCryptoProviderDTO {
  export type Result = Either<ServerError, string>;
}

export interface IGenerateUuidCryptoProvider {
  generateUuid(): GenerateUuidCryptoProviderDTO.Result;
}
