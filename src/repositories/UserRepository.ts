import pool from '../config/database.js';
import { User } from '../models/User.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IUser } from '../interfaces/models/IUser';

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  async save(user: IUser): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
      [user.name, user.username, user.password],
    );
    return result.insertId;
  }
}
