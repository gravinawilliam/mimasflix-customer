import { Request, Response } from 'express';

import { IHttpRequest } from '@domain/shared/interfaces/http-request.interface';
import { IHttpResponse } from '@domain/shared/interfaces/http-response.interface';
import { HttpStatusCode } from '@domain/shared/utils/http-status-code.util';

interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

export const adapterRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
      params: request.params,
      headers: request.headers,
      query: request.query
    };

    const { data, statusCode } = await controller.handle(httpRequest);
    if (statusCode >= HttpStatusCode.OK && statusCode <= 299) {
      response.status(statusCode).json(data);
    } else {
      response.status(statusCode).json({
        error: data.message
      });
    }
  };
};
