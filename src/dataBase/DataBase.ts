import { dbTables } from "../models/listsAndEnums/dbTables";
import { idDB } from "../models/interfacesAndTypes/idDB";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";

export abstract class DataBase{
    readonly #ready: boolean;
    readonly #path: string; 
    readonly #name: string;

    constructor(name: string, path: string){
        this.#ready = false;
        this.#path = path;
        this.#name = name;
    }

    abstract open(): Promise<void>;

    abstract get(table: dbTables, id?: idDB): Promise<tableDB>;

    abstract getByQuery(query: string): Promise<tableDB>;

    abstract getByForeignKeys(table: dbTables, fieldName: string, foreignKeys: tableFieldValue[]): Promise<tableDB>;

    abstract getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB | undefined>;

    // abstract set(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract update(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract delete(table: dbTables, id: idDB | idDB[]): Promise<boolean>;

}