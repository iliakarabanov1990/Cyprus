import { dbTables } from "../listsAndEnums/dbTables";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";

export abstract class ObjectDB{

    // protected _properties: tableRecord;   
    protected _id: idDB;
    protected _imgMain: string;
    static readonly tableName: dbTables;

    constructor(id: idDB){
        this._id = id;
        this._imgMain = `https://gallerix.ru/fullpic/0cd13e0f52241cbf30d391910d396981/`;
        // this._properties = {};

        //if(tablesName instanceof dbTables)
        // else
        //     throw new Error("implementation needed");

    }

    abstract fillFromDB(): Promise<boolean>;
    abstract fillFromData(record: tableRecord): void;

    get id(): idDB{
        return this._id;
    }

    get imgMain(): string{
        return this._imgMain;
    }

    // get properties(){
    //     return this._properties;
    // }

    //abstract get(id: idDB):Promise<boolean>;
    // abstract set(_properties: tableRecord):Promise<boolean>;
    // abstract update(_properties: tableRecord):Promise<boolean>;
    // abstract delete(id: idDB):Promise<boolean>;
}