/* eslint-disable node/no-unpublished-import */
import { mock, MockProxy } from 'jest-mock-extended';

import { HealthUseCase } from '@application/use-cases/health/health.use-case';
import { HealthControllerDTO, IHealthController } from '@domain/controllers/health/health.controller';
import { ServerError } from '@domain/entities/errors/server.error';
import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import { IHealthUseCase } from '@domain/use-cases/health/health.use-case';

import { HealthController } from '../health.controller';

describe('Health Controller', () => {
  let sut: IHealthController;
  let useCase: IHealthUseCase;
  let logger: MockProxy<ILoggerErrorProvider>;

  beforeAll(() => {
    logger = mock();
    useCase = new HealthUseCase(logger);
  });

  beforeEach(() => {
    sut = new HealthController(useCase);
  });

  it('should health check success', () => {
    const result = sut.handle({ body: { status: 'OK' } });

    expect(result.statusCode).toBe(200);
    expect(result.data).toEqual({
      status: 'OK'
    } as HealthControllerDTO.HealthCheckStatus);
  });

  it('should not health check success', () => {
    const result = sut.handle({ body: { status: 'any' } });

    expect(result.statusCode).toBe(500);
    expect(result.data).toEqual(new ServerError());
  });
});
