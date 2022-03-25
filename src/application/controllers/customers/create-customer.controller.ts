import {
  CreateCustomerControllerDTO,
  ICreateCustomerController
} from '@domain/controllers/customers/create-customer.controller';
import { created } from '@domain/shared/utils/http-response.util';
import { ICreateCustomerUseCase } from '@domain/use-cases/customers/create-customer.use-case';

export class CreateCustomerController implements ICreateCustomerController {
  constructor(private readonly createCustomerUseCase: ICreateCustomerUseCase) {}

  public async handle({ body }: CreateCustomerControllerDTO.Parameters): CreateCustomerControllerDTO.Result {
    const createdCustomer = await this.createCustomerUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password
    });

    if (createdCustomer.isFailure()) {
      return {
        data: createdCustomer.value,
        statusCode: createdCustomer.value.statusCode
      };
    }

    return created(createdCustomer.value);
  }
}
