import { Coordinates } from "./Coordinates";
import { DBObject } from "./DBObject";
import { IDBObject } from "./IDBObject.";
import { idDB } from "./idDB";
import { propertyOptions } from "./propertyOptions";

export abstract class ObjectList<T> {
   
    protected objectList: Map<idDB, T>; 

    constructor(){
        this.objectList = new Map<idDB, T>();
    }

    abstract updateFromDB(): Promise<boolean>;

}