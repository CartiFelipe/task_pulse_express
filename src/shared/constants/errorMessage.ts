export const ERRORMESSAGE = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ALREADY_EXISTS: 'User already exists',
  PASSWORD_REQUIREMENTS: 'Password does not meet the requirements',
  NOT_FOUND: 'Domain not found',
  CREATION_ERROR: 'Error creating domain',
  UPDATE_ERROR: 'Error updating domain',
  DELETE_ERROR: 'Error deleting domain',
  NOT_AUTHORIZED: 'Not authorized to perform this action',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;

export type ErrorMessage = (typeof ERRORMESSAGE)[keyof typeof ERRORMESSAGE];
