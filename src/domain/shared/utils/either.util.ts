/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
export type Either<F, S> = Failure<F, S> | Success<F, S>;

export class Failure<F, S> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isFailure(): this is Failure<F, S> {
    return true;
  }

  isSuccess(): this is Success<F, S> {
    return false;
  }
}

export class Success<F, S> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isFailure(): this is Failure<F, S> {
    return false;
  }

  isSuccess(): this is Success<F, S> {
    return true;
  }
}

export const failure = <F, S>(error: F): Either<F, S> => {
  return new Failure<F, S>(error);
};

export const success = <F, S>(value: S): Either<F, S> => {
  return new Success<F, S>(value);
};
