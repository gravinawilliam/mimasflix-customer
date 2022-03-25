type ParametersConstructorDTO = {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;
};

export class CustomError {
  name: string;

  message: string;

  stack?: string;

  statusCode: number;

  constructor({ message, statusCode, name, stack }: ParametersConstructorDTO) {
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.stack = stack;
  }
}
