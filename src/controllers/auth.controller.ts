import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { hardcodedUsers } from '../data/users';


export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = hardcodedUsers.find(u => u.username === username && u.password === password);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
