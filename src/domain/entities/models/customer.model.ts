import { Email } from './email.model';
import { Password } from './password.model';

type ParametersConstructor = {
  id?: string;
  name: string;
  email: Email;
  password: Password;
};

export class Customer {
  id?: string;

  email: Email;

  name: string;

  password: Password;

  constructor(parameters: ParametersConstructor) {
    this.id = parameters.id;
    this.email = parameters.email;
    this.password = parameters.password;
    this.name = parameters.name;
  }
}
