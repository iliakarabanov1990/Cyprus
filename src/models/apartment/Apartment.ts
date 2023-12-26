import { ResidentialProperty } from "../abstracts/ResidentialProperty";
import { Complex } from "../complex/Complex";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { complexes } from "../listsAndEnums/lists";
import { dbTables } from "../listsAndEnums/dbTables";
import { propertyTypes } from "../listsAndEnums/propertyTypes";
import { roomsNumberTypes } from "../listsAndEnums/roomsNumberTypes";

export class Apartment extends ResidentialProperty{

    static tableName = dbTables.complexes;
    #complex: Complex | undefined;
    #floor: string;

    constructor(id: idDB){
        super(id);
        
        this._propertyType = propertyTypes.apartment;
        this.#floor = '';
    }

    fillFromData(record: tableRecord): void{

        super.fillFromData(record);

        this.#complex = complexes.getItem(record.complexId as number) as Complex;
        this._roomsNumber = record.roomsNumber as roomsNumberTypes;
        this._commissioningDate = record.commissioningDate as string;
        this._square = record.square as number;
        this.#floor = record.floor as string;
        this._price = record.price as number;
    }

    get complex(): Complex | undefined{
        return this.#complex;
    }

    get floor(): string{
        return this.#floor;
    }

}