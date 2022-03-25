import { HttpStatusCode } from '@domain/shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

export class ServerError extends CustomError {
  constructor(error?: Error) {
    super({
      message: 'Server failed. Try again soon',
      name: 'ServerError',
      stack: error?.stack,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
    });
  }
}
