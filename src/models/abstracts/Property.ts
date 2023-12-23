import { ObjectDB } from "./ObjectDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { Location } from "../location/Location";
import { propertyTypes } from "../listsAndEnums/propertyTypes";
import { propertyOptions } from "../listsAndEnums/propertyOptions";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dataMap } from "../listsAndEnums/dataMap";
import { dbTables } from "../listsAndEnums/dbTables";

export abstract class Property extends ObjectDB{

    protected _price: number;
    protected _propertyOptions: propertyOptions[];
    protected _propertyType: propertyTypes | undefined; 
    protected _location: Location | undefined;

    constructor(id: idDB, name?: string, description: string = '', imgMain: string = '', price = 0, propertyType = undefined, location = undefined, propertyOptions = []){
        super(id, name, description, imgMain); 
        this._price = price;
        this._propertyType = propertyType;
        this._location = location;
        this._propertyOptions = propertyOptions;           
    }

    fillFromData(record: tableRecord): void{

        super.fillFromData(record);

        this._propertyOptions = (record.propertyOptions as unknown[]).map(el => el as propertyOptions);
        this._location = dataMap.get(dbTables.locations)?.getItem(record.locationId as number) as Location;
    };

    get location(): Location | undefined{
        return this._location;
    }

    get propertyOptions(): propertyOptions[]{
        return this._propertyOptions;
    }

    get propertyType(): propertyTypes | undefined{
        return this._propertyType;
    }

    get price(): number{
        return this._price;
    }
}