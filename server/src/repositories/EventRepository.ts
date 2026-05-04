import pool from '../config/database.js';
import { ResultSetHeader } from 'mysql2';
import { ChoirEvent } from '../models/ChoirEvent.js';

export class EventRepository {
  public async findAll(): Promise<ChoirEvent[]> {
    const [result] = await pool.execute('SELECT * FROM events');
    return result as ChoirEvent[];
  }

  public async findById(id: number): Promise<ChoirEvent[] | null> {
    const [result] = await pool.execute('SELECT * FROM events WHERE id = ?', [
      id,
    ]);

    return result as ChoirEvent[];
  }

  public async findByKeyword(keyword: string): Promise<ChoirEvent[]> {
    const query = `%${keyword}%`;
    const [result] = await pool.execute(
      'SELECT * FROM events WHERE title LIKE ? OR place LIKE ? OR date LIKE ?',
      [query, query, query],
    );
    return result as ChoirEvent[];
  }

  public async update(event: ChoirEvent): Promise<boolean> {
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

  public async create(event: ChoirEvent): Promise<boolean> {
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
