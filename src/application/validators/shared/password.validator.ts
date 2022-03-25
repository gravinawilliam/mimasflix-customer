import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';
import { Either, failure, success } from '@domain/shared/utils/either.util';

function hasLetters(password: string): boolean {
  return /[A-Za-z]+/.test(password);
}

function hasNumber(password: string): boolean {
  return /\d+/.test(password);
}
function hasLowercase(password: string): boolean {
  return password.toUpperCase() !== password;
}
function hasUppercase(password: string): boolean {
  return password.toLowerCase() !== password;
}
function hasSymbols(password: string): boolean {
  return /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~£¥€₹-]+/.test(password);
}

export function validatePassword({ password }: ValidatePasswordDTO.Parameters): ValidatePasswordDTO.Result {
  const MINIMUM_PASSWORD_SIZE = 8;
  const MAXIMUM_PASSWORD_SIZE = 50;

  if (password.length < MINIMUM_PASSWORD_SIZE) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must be at least ${MINIMUM_PASSWORD_SIZE} characters long`
      })
    );
  }

  if (password.length > MAXIMUM_PASSWORD_SIZE) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must be less than ${MAXIMUM_PASSWORD_SIZE} characters long`
      })
    );
  }

  if (!hasNumber(password)) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must contain at least one number`
      })
    );
  }

  if (!hasLetters(password)) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must contain at least one letter`
      })
    );
  }

  if (!hasUppercase(password)) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must contain at least one uppercase letter`
      })
    );
  }

  if (!hasLowercase(password)) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must contain at least one lowercase letter`
      })
    );
  }

  if (!hasSymbols(password)) {
    return failure(
      new InvalidContentParameterError({
        customMessage: `Password must contain at least one symbol`
      })
    );
  }

  return success({
    passwordValidated: password
  });
}

export namespace ValidatePasswordDTO {
  export type Parameters = { password: string };

  export type Result = Either<InvalidContentParameterError, { passwordValidated: string }>;
}
