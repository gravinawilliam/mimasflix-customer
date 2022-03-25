import { validatePassword } from '@application/validators/shared/password.validator';
import { Either, failure, success } from '@domain/shared/utils/either.util';

import { InvalidContentParameterError } from '../errors/invalid-content-parameter.error';

export class Password {
  public readonly value: string;

  private constructor(password: string) {
    this.value = password;
    Object.freeze(this);
  }

  public static validate({ password }: ValidatePasswordDTO.Parameters): ValidatePasswordDTO.Result {
    const validated = validatePassword({ password });
    if (validated.isFailure()) return failure(validated.value);

    return success(new Password(validated.value.passwordValidated));
  }
}

export namespace ValidatePasswordDTO {
  export type Parameters = { password: string };

  export type Result = Either<InvalidContentParameterError, Password>;
}
