import { dbTables } from "../listsAndEnums/dbTables";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";

export abstract class ObjectDB{

    // protected _properties: tableRecord;   
    protected id: idDB;
    static readonly tableName: dbTables;

    constructor(id: idDB){
        this.id = id;
        // this._properties = {};

        //if(tablesName instanceof dbTables)
        // else
        //     throw new Error("implementation needed");

    }

    abstract fillFromDB(): Promise<boolean>;
    abstract fillFromData(record: tableRecord): void;

    // get properties(){
    //     return this._properties;
    // }

    //abstract get(id: idDB):Promise<boolean>;
    // abstract set(_properties: tableRecord):Promise<boolean>;
    // abstract update(_properties: tableRecord):Promise<boolean>;
    // abstract delete(id: idDB):Promise<boolean>;
}