import * as uuid from 'uuid';

import { ServerError } from '@domain/entities/errors/server.error';
import {
  GenerateUuidCryptoProviderDTO,
  IGenerateUuidCryptoProvider
} from '@domain/providers/crypto/generate-uuid-crypto-provider.interface';
import { failure, success } from '@domain/shared/utils/either.util';

export class UuidCryptoProvider implements IGenerateUuidCryptoProvider {
  public generateUuid(): GenerateUuidCryptoProviderDTO.Result {
    try {
      const generatedUuid = uuid.v4();
      return success(generatedUuid);
    } catch (error: any) {
      console.log({ error });
      return failure(new ServerError(error));
    }
  }
}
