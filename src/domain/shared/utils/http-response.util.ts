import { ServerError } from '@domain/entities/errors/server.error';

import { IHttpResponse } from '../interfaces/http-response.interface';
import { HttpStatusCode } from './http-status-code.util';

export const serverError = (error: unknown): IHttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
});

export const ok = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.OK,
  data
});

export const created = (data: unknown): IHttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  data
});

export const conflict = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.CONFLICT,
  data: error
});

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: error
});
