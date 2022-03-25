import { IHttpResponse } from '@domain/shared/interfaces/http-response.interface';
import { CreateCustomerUseCaseDTO } from '@domain/use-cases/customers/create-customer.use-case';

export namespace CreateCustomerControllerDTO {
  export type Parameters = {
    body: {
      name: string;
      email: string;
      password: string;
    };
  };

  export type Result = Promise<IHttpResponse<CreateCustomerUseCaseDTO.Errors | { customerId: string }>>;
}

export interface ICreateCustomerController {
  handle(parameters: CreateCustomerControllerDTO.Parameters): CreateCustomerControllerDTO.Result;
}
