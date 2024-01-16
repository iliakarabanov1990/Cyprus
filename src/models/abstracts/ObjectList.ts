import { currDB } from "../../dataBase/serviceDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dbTables } from "../listsAndEnums/dbTables";
import { ObjectDB } from "./ObjectDB";

export abstract class ObjectList<T extends ObjectDB> {
   
    protected _objectList: Map<idDB, T>; 

    constructor(){
        this._objectList = new Map<idDB, T>();
    }

    abstract createNewItems(newItemsDB: tableDB): void;
    abstract createNewItem(id: idDB, newItemsDB: tableRecord): T;

    async checkNewItems(tableName: dbTables): Promise<tableDB | undefined>{
        return currDB.getNewRecords(tableName, Object.keys(this.objectList));      
    }

    async updateFromDB(tableName: dbTables): Promise<boolean>{

        const newItemsDB = await this.checkNewItems(tableName);
        if (newItemsDB)
            this.createNewItems(newItemsDB);

        return Promise.resolve(true);
    }

    findItem(id: idDB): T | undefined{
        return this._objectList.get(id);
    }
    getItem(id: idDB, tableRecord?: tableRecord): T | undefined{

        let obj = this.findItem(id);
        
        if(!obj && tableRecord)
            obj = this.createNewItem(id, tableRecord!);

        return obj;    
    }

    get objectList(): Map<idDB, T>{
        return this._objectList;
    }

}