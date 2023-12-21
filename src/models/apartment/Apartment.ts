import { Property } from "../abstracts/Property";
import { ResidentialProperty } from "../abstracts/ResidentialProperty";
import { Complex } from "../complex/Complex";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dataMap } from "../listsAndEnums/dataMap";
import { dbTables } from "../listsAndEnums/dbTables";
import { propertyTypes } from "../listsAndEnums/propertyTypes";
import { roomsNumberTypes } from "../listsAndEnums/roomsNumberTypes";
import { Location } from "../location/Location";

export class Apartment extends ResidentialProperty{

    static tableName = dbTables.complexes;
    #complex: Complex | undefined;

    constructor(id: idDB){
        super(id);
        
        this._propertyType = propertyTypes.complex;
    }

    async fillFromDB(): Promise<boolean>{

        return Promise.resolve(true);
    }

    fillFromData(record: tableRecord): void{

        this.#complex = dataMap.get(dbTables.complexes)?.getItem(record.complexId as number) as Complex;
        this._name = record.name as string;
        this._description = record.description as string;
        this._propertyOptions = record.propertyOptions as string[];    
        this._roomsNumber = record.roomsNumber as roomsNumberTypes;
        this._commissioningDate = record.commissioningDate as Date;
    }

}