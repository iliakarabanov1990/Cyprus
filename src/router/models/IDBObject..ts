import { DBObject } from "./DBObject";
import { idDB } from "./idDB";

export interface IDBObject{
    _id: idDB;
    readonly _dBObject: DBObject;
    updateFromDB: () => Promise<boolean>;
}

