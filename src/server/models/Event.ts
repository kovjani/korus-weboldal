import { IEvent } from '../interfaces/models/IEvent';

export class Event implements IEvent {
  private _conductor: string;
  private _cover_image: string;
  private _date: string;
  private _description: string;
  private _id: number;
  private _local_folder: string;
  private _place: string;
  private _title: string;

  constructor(conductor: string, cover_image: string, date: string, description: string, id: number, local_folder: string, place: string, title: string) {
    this._conductor = conductor;
    this._cover_image = cover_image;
    this._date = date;
    this._description = description;
    this._id = id;
    this._local_folder = local_folder;
    this._place = place;
    this._title = title;
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

  get date(): string {
    return this._date;
  }

  set date(value: string) {
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