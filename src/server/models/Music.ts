import { IMusic } from '../interfaces/models/IMusic';
import { IAuthor } from '../interfaces/models/IAuthor';

export class Music implements IMusic {
  private _author: IAuthor;
  private _title: string;

  constructor(author: IAuthor, title: string) {
    this._author = author;
    this._title = title;
  }

  get author(): IAuthor {
    return this._author;
  }

  set author(value: IAuthor) {
    this._author = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
