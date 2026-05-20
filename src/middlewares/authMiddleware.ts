import AppError from '@/erros/AppError';
import { ERRORMESSAGE, ErrorType } from '@/shared';
import { Handler } from 'express';
import { JWTTokenProvider } from '@/application/provider/JwtTokenProvider';
const authMiddleware: Handler = (req, _, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new AppError(
      ERRORMESSAGE.NOT_AUTHORIZED,
      401,
      ErrorType.NOT_AUTHORIZED,
    );
  }

  const tokenProvider = new JWTTokenProvider();
  const { id, role } = tokenProvider.verifyToken(token);
  req.user = {
    id,
    role,
  };

  next();
};

export default authMiddleware;
