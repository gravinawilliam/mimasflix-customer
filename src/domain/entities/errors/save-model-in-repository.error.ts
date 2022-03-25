import { HttpStatusCode } from '@domain/shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  error: Error;
  model: string;
};

export class SaveModelInRepositoryError extends CustomError {
  constructor({ error, model }: ParametersDTO) {
    super({
      message: `Error saving model ${model} in repository`,
      name: 'SaveModelInRepositoryError',
      stack: error?.stack,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
    });
  }
}
