import { IEventRepository } from '../interfaces/repositories/IEventRepository';
import { IEvent } from '../interfaces/models/IEvent';
import pool from '../config/database.js';
import { ResultSetHeader } from 'mysql2';

export class EventRepository implements IEventRepository {
  public async findAll(): Promise<IEvent[]> {
    const [result] = await pool.execute('SELECT * FROM events');
    return result as IEvent[];
  }

  public async update(event: IEvent): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE events SET title = ?, description = ?, date = ? WHERE id = ?',
      [event.title, event.description, event.date, event.id],
    );
    return result.affectedRows > 0;
  }
}