import { ErrorType } from '../shared';

export default class AppError extends Error {
  public status: number;
  public type: ErrorType;
  constructor(
    message: string,
    status = 400,
    type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.status = status;
    this.type = type;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
