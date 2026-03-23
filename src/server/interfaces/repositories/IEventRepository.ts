import {IEvent} from "../models/IEvent";

export interface IEventRepository {
  findAll(): Promise<IEvent[]>;
  findById(id: number): Promise<IEvent>;
  update(event: IEvent): Promise<boolean>;
  create(event: IEvent): Promise<boolean>;
}