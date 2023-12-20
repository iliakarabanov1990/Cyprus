import { ObjectDB } from "../abstracts/ObjectDB";
import { idDB } from "./idDB";

export interface IDBObject{
    _id: idDB;
    readonly _objectDB: ObjectDB;
    updateFromDB: () => Promise<boolean>;
}

