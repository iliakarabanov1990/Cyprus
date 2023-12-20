import { ServiceDB } from "../../dataBase/ServiceDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dataMap } from "../listsAndEnums/dataMap";
import { dbTables } from "../listsAndEnums/dbTables";
import { ObjectDB } from "./ObjectDB";

export abstract class ObjectList<T extends ObjectDB> {
   
    protected objectList: Map<idDB, T>; 

    constructor(){
        this.objectList = new Map<idDB, T>();
    }

    abstract updateFromDB(): Promise<boolean>;
    abstract createNewItems(newItemsDB: tableDB): void;
    abstract createNewItem(id: idDB, newItemsDB: tableRecord): ObjectDB;
    abstract getItem(id: idDB, tableRecord?: tableRecord): T | undefined;

    async checkNewItems(tableName: dbTables): Promise<tableDB | undefined>{

        return await ServiceDB.currDB.getNewRecords(tableName, Object.keys(this.objectList));

        //return await ServiceDB.currDB.getByQuery(`SELECT * FROM ${tableName} WHERE NOT id IN ${Object.keys(this.objectList).join(', ')}`);
        
    }

    findItem(id: idDB): T | undefined{
        return this.objectList.get(id);
    }

}