import { HealthController } from '@application/controllers/health/health.controller';
import { HealthUseCase } from '@application/use-cases/health/health.use-case';
import { IHealthController } from '@domain/controllers/health/health.controller';
import { WinstonLoggerProvider } from '@infra/providers/logger/winston-logger.provider';

export const makeHealthController = (): IHealthController => {
  const logger = new WinstonLoggerProvider();
  const useCase = new HealthUseCase(logger);
  return new HealthController(useCase);
};
