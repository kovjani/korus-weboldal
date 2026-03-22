import { ILink } from '../interfaces/models/ILink';

export class Link implements ILink {
  private _title: string;
  private _url: string;

  constructor(title: string, url: string) {
    this._title = title;
    this._url = url;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
}
