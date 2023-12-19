import { Coordinates } from "./Coordinates";
import { DBObject } from "./DBObject";
import { IDBObject } from "./IDBObject.";
import { idDB } from "./idDB";
import { propertyOptions } from "./propertyOptions";

export abstract class Property implements IDBObject{
    _id: idDB;
    readonly _dBObject: DBObject;
    protected _location: Location; 
    protected _name: string;
    protected _description: string;
    protected _propertyOptions: propertyOptions[];

    constructor(location: Location, name: string, description: string, propertyOptions: propertyOptions[], id: idDB, dBObject: DBObject){
        this._location = location;
        this._name = name;
        this._description = description;
        this._id = id;
        this._dBObject = dBObject;
        this._propertyOptions = propertyOptions;
    }

    abstract updateFromDB(): Promise<boolean>;

    get location(): Location{
        return this._location;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get propertyOptions(): propertyOptions[]{
        return this._propertyOptions;
    }

    get id(): idDB{
        return this._id;
    }
}