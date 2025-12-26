import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your-secret-key';

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
      username: string;
    };

    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

export const optionalAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'your-secret-key';

      const decoded = jwt.verify(token, secret) as {
        userId: string;
        email: string;
        username: string;
      };

      req.userId = decoded.userId;
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        username: decoded.username,
      };
    }

    next();
  } catch (error) {
    // Token invalid but optional, continue
    next();
  }
};
