import { IChoirEvent } from '../interfaces/models/IChoirEvent';

export class ChoirEvent implements IChoirEvent {
  private _id: number = 0;
  private _conductor: string = '';
  private _cover_image: string = '';
  private _date: Date = new Date();
  private _description: string = '';
  private _local_folder: string = '';
  private _place: string = '';
  private _title: string = '';

  constructor(data?: any) {
    if (data) {
      this._conductor = data.conductor ? data.conductor : '';
      this._cover_image = data.cover_image ? data.cover_image : '';
      this._date = data.date ? data.date : new Date();
      this._description = data.description ? data.description : '';
      this._id = data.id ? data.id : 0;
      this._local_folder = data.local_folder ? data.local_folder : '';
      this._place = data.place ? data.place : '';
      this._title = data.title ? data.title : '';
    }
  }

  get conductor(): string {
    return this._conductor;
  }

  set conductor(value: string) {
    this._conductor = value;
  }

  get cover_image(): string {
    return this._cover_image;
  }

  set cover_image(value: string) {
    this._cover_image = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get local_folder(): string {
    return this._local_folder;
  }

  set local_folder(value: string) {
    this._local_folder = value;
  }

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
