import { ObjectDB } from "./ObjectDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { Location } from "../location/Location";
import { propertyTypes } from "../listsAndEnums/propertyTypes";

export abstract class Property extends ObjectDB{
    protected _location: Location | undefined; 
    protected _name: string;
    protected _description: string;
    protected _propertyType: propertyTypes | undefined;
    protected _propertyOptions: string[];//propertyOptions[];
    protected _price: number;

    constructor(id: idDB){
        super(id); 
        this._name = '';
        this._description = '';
        this._propertyOptions = [];      
        this._price = 0;
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

    get propertyType(): propertyTypes | undefined{
        return this._propertyType;
    }

    get price(): number{
        return this._price;
    }
}