import { Request, Response, NextFunction } from 'express';

export const authorize =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Access denied: insufficient rights' });
      return;
    }

    next();
  };
