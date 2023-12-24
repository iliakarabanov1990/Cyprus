
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
    abstract createNewItem(id: idDB, newItemsDB: tableRecord): ObjectDB;
    abstract getItem(id: idDB, tableRecord?: tableRecord): T | undefined;

    async checkNewItems(tableName: dbTables): Promise<tableDB | undefined>{

        return await currDB.getNewRecords(tableName, Object.keys(this.objectList));

        //return await ServiceDB.currDB.getByQuery(`SELECT * FROM ${tableName} WHERE NOT id IN ${Object.keys(this.objectList).join(', ')}`);
        
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

    get objectList(): Map<idDB, T>{
        return this._objectList;
    }



}