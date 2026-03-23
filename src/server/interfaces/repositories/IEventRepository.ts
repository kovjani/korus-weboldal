import {IEvent} from "../models/IEvent";

export interface IEventRepository {
    findAll(): IEvent[];
}