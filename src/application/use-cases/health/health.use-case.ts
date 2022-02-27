import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import { Either, left, right } from '@domain/shared/utils/either.util';
import { ok, serverError } from '@domain/shared/utils/http-response.util';
import { HealthUseCaseDTO, IHealthUseCase } from '@domain/use-cases/health/health.use-case';

export class HealthUseCase implements IHealthUseCase {
  constructor(private readonly logger: ILoggerErrorProvider) {}

  public execute({ status }: HealthUseCaseDTO.Parameters): HealthUseCaseDTO.Result {
    const result = this.verifyStatus(status);
    if (result.isLeft()) {
      this.logger.error({
        message: 'Error on health check',
        value: result.value
      });
      return serverError(result.value);
    }

    return ok(result.value);
  }

  private verifyStatus(status?: string): Either<Error, HealthUseCaseDTO.HealthCheckStatus> {
    if (status === 'OK') {
      return right({ status });
    }

    return left(new Error('Invalid status'));
  }
}
