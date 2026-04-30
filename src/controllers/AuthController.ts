import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  public handleRegister = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await this.authService.registerUser(req.body);
      res.status(201).json({ message: 'Sikeres regisztráció!' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  public handleLogin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
      const { token, user } = await this.authService.loginUser(
        username,
        password,
      );

      res.status(200).json({
        token: token,
        user: user,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message || 'Sikertelen bejelentkezés',
      });
    }
  };
}
