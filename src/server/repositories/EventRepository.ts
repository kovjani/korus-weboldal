import { IEvent } from '../interfaces/models/IEvent';
import pool from '../config/database.js';
import { ResultSetHeader } from 'mysql2';

export class EventRepository {
  public async findAll(): Promise<IEvent[]> {
    const [result] = await pool.execute('SELECT * FROM events');
    return result as IEvent[];
  }

  public async findById(id: number): Promise<IEvent | null> {
    const [result] = await pool.execute('SELECT * FROM events WHERE id = ?', [
      id,
    ]);
    const events = result as IEvent[];
    return events[0] || null;
  }

  public async findByKeyword(keyword: string): Promise<IEvent[]> {
    const query = `%${keyword}%`;
    const [result] = await pool.execute(
      'SELECT * FROM events WHERE title LIKE ? OR place LIKE ? OR date LIKE ?',
      [query, query, query],
    );
    return result as IEvent[];
  }

  public async update(event: IEvent): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE events SET 
        title = :title,
        date = :date,
        place = :place,
        conductor = :conductor,
        description = :description,
        local_folder = :localFolder,
        cover_image = :coverImage
      WHERE id = :eventId`,
      {
        eventId: event.id,
        title: event.title,
        date: event.date,
        place: event.place,
        conductor: event.conductor,
        description: event.description,
        localFolder: event.local_folder,
        coverImage: event.cover_image,
      },
    );
    return result.affectedRows > 0;
  }

  public async create(event: IEvent): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO events (title, date, place, conductor, description, local_folder, cover_image) 
            VALUES (:title, :date, :place, :conductor, :description, :localFolder, :coverImage)`,
      {
        title: event.title,
        date: event.date,
        place: event.place,
        conductor: event.conductor,
        description: event.description,
        localFolder: event.local_folder,
        coverImage: event.cover_image,
      },
    );
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM events WHERE id = ?',
      [id],
    );

    return result.affectedRows > 0;
  }
}
