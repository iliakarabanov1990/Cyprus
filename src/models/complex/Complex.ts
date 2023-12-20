import { Property } from "../abstracts/Property";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dataMap } from "../listsAndEnums/dataMap";
import { dbTables } from "../listsAndEnums/dbTables";
import { Location } from "../location/Location";
import { LocationList } from "../location/LocationList";

export  class  Complex extends Property{

    static tableName = dbTables.complexes;

    // constructor(location: Location, name: string, description: string, propertyOptions: propertyOptions[], id: idDB){
    //     super(location, name, description, propertyOptions, id);        
    // }

    constructor(id: idDB){
        super(id);
    }

    async fillFromDB(): Promise<boolean>{

        return Promise.resolve(true);
    }

    fillFromData(record: tableRecord): void{

        this._location = dataMap.get(dbTables.locations)?.getItem(record.locationId as idDB) as Location;
        this._name = record.name as string;
        this._description = record.description as string;
        this._propertyOptions = String(record.propertyOptions).split(', ');      
    }
}