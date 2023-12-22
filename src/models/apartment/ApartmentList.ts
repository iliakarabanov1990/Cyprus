import { Apartment } from "./Apartment";
import { ObjectList } from "../abstracts/ObjectList";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { idDB } from "../interfacesAndTypes/idDB";
import { ServiceDB } from "../../dataBase/ServiceDB";
import { dbTables } from "../listsAndEnums/dbTables";

export class ApartmentList extends ObjectList<Apartment>{

    constructor(){
        super();
    }

    createNewItems(newItemsDB: tableDB): void{

        newItemsDB.forEach(element => {
            this.getItem(element.id as idDB, element as tableRecord);         
        });    
    }

    getItem(id: idDB, tableRecord?: tableRecord): Apartment{

        let obj = this.findItem(id);
        
        if(!obj)
            obj = this.createNewItem(id, tableRecord);

        return obj;    
    }

    createNewItem(id: idDB, newItemDB?: tableRecord): Apartment{
        const apartment = new Apartment(id);
        if(newItemDB)
            apartment.fillFromData(newItemDB);
        else
            apartment.fillFromDB();

        this.objectList.set(id, apartment);   

        return apartment;
    }

    getByComplexId(id: idDB): Promise<boolean>{

        return ServiceDB.currDB.getByForeignKeys(dbTables.apartments, "complexId", [Number(id)])
        .then((dataRows) => this.createNewItems(dataRows))
        .then(() => true)
        .catch(() => false);
    }

}