import { Coordinates } from "./Coordinates";
import { DBObject } from "./DBObject";
import { IDBObject } from "./IDBObject.";
import { Property } from "./Property";
import { idDB } from "./idDB";
import { propertyOptions } from "./propertyOptions";

export  class  Complex extends Property{
    constructor(location: Location, name: string, description: string, propertyOptions: propertyOptions[], id: idDB, dBObject: DBObject){
        super(location, name, description, propertyOptions, id, dBObject);
    }

    async updateFromDB(): Promise<boolean>{
        await this._dBObject.get(this._id);

        this._name = this._dBObject.properties['name'] as string;
        this._description = this._dBObject.properties['description'] as string;

        return Promise.resolve(true);
    }
}