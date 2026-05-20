import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  role: 'admin' | 'user';
}

export interface TokenProvider {
  generateToken(payload: TokenPayload): string;

  verifyToken(token: string): TokenPayload;
}
