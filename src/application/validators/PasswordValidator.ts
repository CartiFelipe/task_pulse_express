import AppError from '@/erros/AppError';
import { ERRORMESSAGE } from '@/shared/constants/errorMessage';
import ErrorType from '@/shared/enums/error';

export class PasswordValidator {
  validate(password: string): boolean {
    if (password.length < 8 || password.length > 64) {
      throw new AppError(
        ERRORMESSAGE.PASSWORD_REQUIREMENTS,
        400,
        ErrorType.PASSWORD_VALIDATION_ERROR,
      );
    }

    const asciiRegex = /^[\x20-\x7E]+$/;

    if (!asciiRegex.test(password)) {
      throw new AppError(
        ERRORMESSAGE.PASSWORD_REQUIREMENTS,
        400,
        ErrorType.PASSWORD_VALIDATION_ERROR,
      );
    }

    const bytes = Buffer.byteLength(password, 'utf8');

    if (bytes > 72) {
      throw new AppError(
        ERRORMESSAGE.PASSWORD_REQUIREMENTS,
        400,
        ErrorType.PASSWORD_VALIDATION_ERROR,
      );
    }

    const uppercaseRegex = /[A-Z]/;

    if (!uppercaseRegex.test(password)) {
      throw new AppError(
        ERRORMESSAGE.PASSWORD_REQUIREMENTS,
        400,
        ErrorType.PASSWORD_VALIDATION_ERROR,
      );
    }

    const symbolRegex = /[^a-zA-Z0-9]/;

    if (!symbolRegex.test(password)) {
      throw new AppError(
        ERRORMESSAGE.PASSWORD_REQUIREMENTS,
        400,
        ErrorType.PASSWORD_VALIDATION_ERROR,
      );
    }

    return true;
  }
}
