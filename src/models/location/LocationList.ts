import { ObjectList } from "../abstracts/ObjectList";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { idDB } from "../interfacesAndTypes/idDB";
import { Location } from "./Location";


export class LocationList extends ObjectList<Location>{

    constructor(){
        super();
    }

    // async updateFromDB(): Promise<boolean>{

    //     const newItemsDB = await this.checkNewItems(Location.tableName);
    //     if (newItemsDB)
    //         this.createNewItems(newItemsDB);

    //     return Promise.resolve(true);
    // }

    createNewItems(newItemsDB: tableDB): void{

        newItemsDB.forEach(element => {
            this.getItem(element.id as idDB, element as tableRecord);         
        });    

    }

    // getItem(id: idDB, tableRecord?: tableRecord): Location | undefined{

    //     if(!id)
    //         return undefined;

    //     let obj = this.findItem(id);
        
    //     if(!obj)
    //         obj = this.createNewItem(id, tableRecord);

    //     return obj;    

    // }

    createNewItem(id: idDB, newItemDB?: tableRecord): Location{
        const location = new Location(id);
        if(newItemDB)
            location.fillFromData(newItemDB);
        else
            location.fillFromDB();

        this.objectList.set(id, location);

        return location;
    }

}