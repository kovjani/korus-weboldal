// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Hozzáférés megtagadva. Kérjük, jelentkezzen be!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'titkos_kulcs');
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Érvénytelen vagy lejárt token.' });
  }
};
