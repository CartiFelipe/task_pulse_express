import AppError from '@/erros/AppError';
import { ErrorType } from '@/shared';
import { Handler } from 'express';
import { JWTTokenProvider } from '@/provider/JwtTokenProvider';
const authMiddleware: Handler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new AppError('Token is missing', 401, ErrorType.NOT_AUTHORIZED);
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
