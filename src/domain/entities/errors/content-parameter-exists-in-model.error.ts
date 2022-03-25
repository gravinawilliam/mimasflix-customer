import { HttpStatusCode } from '@domain/shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  model: string;
  parameter: string;
  content: string;
};

export class ContentParameterExistsInModelError extends CustomError {
  constructor({ model, parameter, content }: ParametersDTO) {
    super({
      message: `Content ${content} of parameter ${parameter} already exists in model ${model}.`,
      statusCode: HttpStatusCode.CONFLICT,
      name: 'ContentParameterExistsInModelError'
    });
  }
}
