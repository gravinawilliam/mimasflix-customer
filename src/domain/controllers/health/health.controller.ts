import { IHttpResponse } from '@domain/shared/interfaces/http-response.interface';

export namespace HealthControllerDTO {
  export type Parameters = {
    body: {
      status?: string;
    };
  };

  export type HealthCheckStatus = {
    status: string;
  };

  export type Result = IHttpResponse<Error | HealthCheckStatus>;
}

export interface IHealthController {
  handle(parameters: HealthControllerDTO.Parameters): HealthControllerDTO.Result;
}
