import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';
import { Either, failure, success } from '@domain/shared/utils/either.util';

namespace ValidateEmailDTO {
  export type Parameters = {
    email: string;
  };

  export type Result = Either<InvalidContentParameterError, { emailValidated: string }>;
}

function emptyOrTooLarge(string_: string, maxSize: number): boolean {
  return !string_ || string_.length > maxSize;
}

function nonConformant(email: string): boolean {
  const emailRegex =
    /^[\w!#$%&'*+/=?^`{|}~-](\.?[\w!#$%&'*+/=?^`{|}~-])*@[\dA-Za-z](-*\.?[\dA-Za-z])*\.[A-Za-z](-?[\dA-Za-z])+$/;

  return !emailRegex.test(email);
}

function somePartIsTooLargeIn(domain: string): boolean {
  const maxPartSize = 63;
  const domainParts = domain.split('.');
  return domainParts.some(part => part.length > maxPartSize);
}

export function validateEmail({ email }: ValidateEmailDTO.Parameters): ValidateEmailDTO.Result {
  const MAX_EMAIL_SIZE = 320;

  if (emptyOrTooLarge(email, MAX_EMAIL_SIZE) || nonConformant(email)) {
    return failure(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'email',
          content: email
        }
      })
    );
  }

  const [local, domain] = email.split('@');
  const MAX_LOCAL_SIZE = 64;
  const MAX_DOMAIN_SIZE = 255;

  if (emptyOrTooLarge(local, MAX_LOCAL_SIZE) || emptyOrTooLarge(domain, MAX_DOMAIN_SIZE)) {
    return failure(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'email',
          content: email
        }
      })
    );
  }

  if (somePartIsTooLargeIn(domain)) {
    return failure(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'email',
          content: email
        }
      })
    );
  }

  return success({
    emailValidated: email.toLowerCase()
  });
}
