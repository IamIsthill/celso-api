import { STATUS } from "./status";

export class AppError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    status: number = 500,
    isOperational: boolean = true
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = this.constructor.name;
    this.status = status;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Users
export class ExistingEmailError extends AppError {
  constructor() {
    super("Email already in use", STATUS.CONFLICT);
  }
}
