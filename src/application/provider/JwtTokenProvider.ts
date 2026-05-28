import jwt from 'jsonwebtoken';

import { TokenPayload, TokenProvider } from './tokenProvider';

export class JWTTokenProvider implements TokenProvider {
  private readonly secret = 'my-super-secret';

  public generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, this.secret, {
      expiresIn: '10m',
    });
  };

  public verifyToken = (token: string): TokenPayload => {
    const decoded: TokenPayload = jwt.verify(
      token,
      this.secret,
    ) as TokenPayload;
    return decoded;
  };

  public decodeToken = (token: string): TokenPayload => {
    const decoded: TokenPayload = jwt.decode(token) as TokenPayload;
    return decoded;
  };
}
