import { IHttpResponse } from '@domain/shared/interfaces/http-response.interface';

export namespace HealthUseCaseDTO {
  export type Parameters = {
    status?: string;
  };

  export type HealthCheckStatus = {
    status: string;
  };

  export type Result = IHttpResponse<Error | HealthCheckStatus>;
}

export interface IHealthUseCase {
  execute(parameters: HealthUseCaseDTO.Parameters): HealthUseCaseDTO.Result;
}

//
