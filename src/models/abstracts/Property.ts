import { ObjectDB } from "./ObjectDB";
import { IDBObject } from "../interfacesAndTypes/IDBObject.";
import { idDB } from "../interfacesAndTypes/idDB";
import { propertyOptions } from "../listsAndEnums/propertyOptions";
import { dbTables } from "../listsAndEnums/dbTables";
import { Location } from "../location/Location";

export abstract class Property extends ObjectDB{
    protected _location: Location | undefined; 
    protected _name: string;
    protected _description: string;
    protected _propertyOptions: string[];//propertyOptions[];

    constructor(id: idDB){
        super(id); 
        this._name = '';
        this._description = '';
        this._propertyOptions = [];  
    }

    

    // abstract updateFromDB(): Promise<boolean>;

    get location(): Location | undefined{
        return this._location;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get propertyOptions(): string[]{//propertyOptions[]{
        return this._propertyOptions;
    }

}