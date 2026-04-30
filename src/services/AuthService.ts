import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository.js';
import { User } from '../models/User.js';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'titkos_kulcs';

  constructor(private userRepository: UserRepository) {}

  async registerUser(userData: User): Promise<void> {
    const existingUser = await this.userRepository.findByUsername(
      userData.username,
    );
    if (existingUser) {
      throw new Error('Ez a felhasználónév már foglalt.');
    }

    const hashedPassword = await bcrypt.hash(userData.password!, 10);

    await this.userRepository.save(
      new User({
        ...userData,
        password: hashedPassword,
      }),
    );
  }

  async loginUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Hibás felhasználónév vagy jelszó.');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      this.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return { token: token, user: user };
  }
}
