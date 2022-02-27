/* eslint-disable node/no-unpublished-import */
import { mock, MockProxy } from 'jest-mock-extended';

import { HealthControllerDTO } from '@domain/controllers/health/health.controller';
import { ServerError } from '@domain/entities/errors/server.error';
import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import { IHealthUseCase } from '@domain/use-cases/health/health.use-case';

import { HealthUseCase } from '../health.use-case';

describe('Health Controller', () => {
  let sut: IHealthUseCase;
  let logger: MockProxy<ILoggerErrorProvider>;

  beforeEach(() => {
    logger = mock();
    sut = new HealthUseCase(logger);
  });

  it('should health check success', () => {
    const result = sut.execute({ status: 'OK' });

    expect(result.statusCode).toBe(200);
    expect(result.data).toEqual({
      status: 'OK'
    } as HealthControllerDTO.HealthCheckStatus);
  });

  it('should not health check success', () => {
    const result = sut.execute({ status: 'any' });

    expect(result.statusCode).toBe(500);
    expect(result.data).toEqual(new ServerError());
  });
});
