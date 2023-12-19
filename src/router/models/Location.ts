import { Coordinates } from "./Coordinates";
import { DBObject } from "./DBObject";
import { IDBObject } from "./IDBObject.";
import { idDB } from "./idDB";

export class Location implements IDBObject{
    _id: idDB;
    readonly _dBObject: DBObject;
    private _coordinates: Coordinates; 
    private _name: string;
    private _description: string;

    constructor(coordinates: Coordinates, name: string, description: string, id: string, dBObject: DBObject){
        this._coordinates = coordinates;
        this._name = name;
        this._description = description;
        this._id = id;
        this._dBObject = dBObject;
    }

    async updateFromDB(): Promise<boolean>{
        await this._dBObject.get(this._id);

        this._coordinates.latitude = this._dBObject.properties['latitude'] as string;
        this._coordinates.longitude = this._dBObject.properties['longitude'] as string;
        this._name = this._dBObject.properties['name'] as string;
        this._description = this._dBObject.properties['description'] as string;
        this._id = this._dBObject.properties['id'] as idDB;

        return Promise.resolve(true);
    }

    get coordinates(): Coordinates{
        return this._coordinates;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get id(): idDB{
        return this._id;
    }
}