import { DataBase } from "./DataBase";
import { dbTables } from "./dbTables";
import { idDB } from "./idDB";
import { tableRecord } from "./tableRecord";

export abstract class DBObject{

    protected _properties: tableRecord;   
    readonly #tableName: dbTables;
    protected id: idDB;
    protected dataBase: DataBase;

    constructor(dataBase: DataBase, tableName: dbTables, id = ''){
        this.id = id;
        this._properties = {};
        this.dataBase = dataBase;

        //if(tablesName instanceof dbTables)
            this.#tableName = tableName;
        // else
        //     throw new Error("implementation needed");

    }

    get properties(){
        return this._properties;
    }

    abstract get(id: idDB):Promise<boolean>;
    // abstract set(_properties: tableRecord):Promise<boolean>;
    // abstract update(_properties: tableRecord):Promise<boolean>;
    // abstract delete(id: idDB):Promise<boolean>;
}