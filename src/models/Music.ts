import { IMusic } from '../interfaces/models/IMusic';

export class Music implements IMusic {
  private _author: string;
  private _title: string;

  constructor(author: string, title: string) {
    this._author = author;
    this._title = title;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
