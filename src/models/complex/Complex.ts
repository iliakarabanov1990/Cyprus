import { Property } from "../abstracts/Property";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dbTables } from "../listsAndEnums/dbTables";
import { propertyTypes } from "../listsAndEnums/propertyTypes";

export class Complex extends Property{

    static tableName = dbTables.complexes;
    #minPrice: number;
    #maxPrice: number;

    constructor(id: idDB){
        super(id);
        this.#minPrice = 0;
        this.#maxPrice = 0;
        this._propertyType = propertyTypes.complex;
    }

    fillFromData(record: tableRecord): void{

        super.fillFromData(record);
           
        this.#minPrice = record.minPrice as number;
        this.#maxPrice = record.maxPrice as number;  
    }

    get minPrice(): number{
        return this.#minPrice;
    }
    get maxPrice(): number{
        return this.#maxPrice;
    }
}