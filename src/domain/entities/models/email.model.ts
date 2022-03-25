import { validateEmail } from '@application/validators/shared/email.validator';
import { Either, failure, success } from '@domain/shared/utils/either.util';

import { InvalidContentParameterError } from '../errors/invalid-content-parameter.error';

export class Email {
  public readonly value: string;

  private constructor(email: string) {
    this.value = email;
    Object.freeze(this);
  }

  public static create({ email }: CreateEmailDTO.Parameters): CreateEmailDTO.Result {
    const validated = validateEmail({ email });
    if (validated.isFailure()) return failure(validated.value);

    return success(new Email(validated.value.emailValidated));
  }
}

export namespace CreateEmailDTO {
  export type Parameters = { email: string };

  export type Result = Either<InvalidContentParameterError, Email>;
}
