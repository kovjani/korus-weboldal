import { IUser } from '../interfaces/models/IUser';

export class User implements IUser {
  private _id: number;
  private _name: string;
  private _username: string;
  private _password: string;

  constructor(data: any) {
    this._id = data.id;
    this._name = data.name;
    this._username = data.username;
    this._password = data.password;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
