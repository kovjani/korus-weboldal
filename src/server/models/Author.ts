import { IAuthor } from '../interfaces/models/IAuthor';

export class Author implements IAuthor {
  private _firstName: string;
  private _surname: string;

  constructor(firstName: string, surname: string) {
    this._firstName = firstName;
    this._surname = surname;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }
}
