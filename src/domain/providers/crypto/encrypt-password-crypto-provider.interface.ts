import { ServerError } from '@domain/entities/errors/server.error';
import { Password } from '@domain/entities/models/password.model';
import { Either } from '@domain/shared/utils/either.util';

export namespace EncryptPasswordCryptoProviderDTO {
  export type Parameters = {
    password: Password;
  };
  export type Result = Promise<
    Either<
      ServerError,
      {
        encryptedPassword: string;
      }
    >
  >;
}

export interface IEncryptPasswordCryptoProvider {
  encryptPassword(parameters: EncryptPasswordCryptoProviderDTO.Parameters): EncryptPasswordCryptoProviderDTO.Result;
}
