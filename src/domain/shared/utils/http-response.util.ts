import { ServerError } from '@domain/entities/errors/server.error';

import { IHttpResponse } from '../interfaces/http-response.interface';
import { HttpStatusCode } from './http-status-code.util';

export const serverError = (error: unknown): IHttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
});

export const ok = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.OK,
  data: data
});
