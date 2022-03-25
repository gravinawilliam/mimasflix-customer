import { HttpStatusCode } from '@domain/shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  messageDefault?: {
    parameter: string;
    content?: string;
  };
  customMessage?: string;
};

export class InvalidContentParameterError extends CustomError {
  constructor({ messageDefault, customMessage }: ParametersDTO) {
    super({
      message:
        customMessage ??
        `Invalid content ${messageDefault?.content ?? 'is null'} of parameter ${messageDefault?.parameter}.`,
      name: 'InvalidContentParameterError',
      statusCode: HttpStatusCode.BAD_REQUEST
    });
  }
}
