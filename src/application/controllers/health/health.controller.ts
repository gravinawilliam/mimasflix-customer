import { HealthControllerDTO, IHealthController } from '@domain/controllers/health/health.controller';
import { IHealthUseCase } from '@domain/use-cases/health/health.use-case';

export class HealthController implements IHealthController {
  constructor(private readonly useCase: IHealthUseCase) {}

  public handle({ body }: HealthControllerDTO.Parameters): HealthControllerDTO.Result {
    return this.useCase.execute({
      status: body.status
    });
  }
}
