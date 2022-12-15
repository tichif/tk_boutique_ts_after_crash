import { Request, Response, NextFunction } from 'express';

import { verifyJwt } from '../utils/jwt';
import ErrorResponse from '../utils/Error';

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.tkCookie ||
    ''
  ).replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (expired) {
    return next(
      new ErrorResponse("Vous n'êtes pas authorisé à poursuivre", 401)
    );
  }

  res.locals.decoded = decoded;

  return next();
}

export default deserializeUser;
