import {IEvent} from "../models/IEvent";

export interface IEventRepository {
    findAll(): Promise<IEvent[]>;
    update(event: IEvent): Promise<boolean>;
}