import { Property } from "../abstracts/Property";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dataMap } from "../listsAndEnums/dataMap";
import { dbTables } from "../listsAndEnums/dbTables";
import { propertyTypes } from "../listsAndEnums/propertyTypes";
import { Location } from "../location/Location";

export class Complex extends Property{

    static tableName = dbTables.complexes;
    #minPrice: number;
    #maxPrice: number;

    // constructor(location: Location, name: string, description: string, propertyOptions: propertyOptions[], id: idDB){
    //     super(location, name, description, propertyOptions, id);        
    // }

    constructor(id: idDB){
        super(id);
        this.#minPrice = 0;
        this.#maxPrice = 0;
        this._propertyType = propertyTypes.complex;
    }

    async fillFromDB(): Promise<boolean>{

        return Promise.resolve(true);
    }

    fillFromData(record: tableRecord): void{

        this._location = dataMap.get(dbTables.locations)?.getItem(record.locationId as number) as Location;
        this._name = record.name as string;
        this._description = record.description as string;
        this._propertyOptions = record.propertyOptions as string[];
        this.#minPrice = record.minPrice as number;
        this.#maxPrice = record.maxPrice as number; 
        this._imgMain = record.imgMain as string;     
    }

    get minPrice(): number{
        return this.#minPrice;
    }
    get maxPrice(): number{
        return this.#maxPrice;
    }
}