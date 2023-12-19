import { dbTables } from "./dbTables";
import { idDB } from "./idDB";
import { tableRecords } from "./tableRecords";

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

    abstract get(table: dbTables, id?: idDB): Promise<tableRecords>;

    abstract getByQuery(query: string): Promise<tableRecords>;

    // abstract set(table: dbTables, tableRecords: tableRecord | tableRecords): Promise<boolean>;

    // abstract update(table: dbTables, tableRecords: tableRecord | tableRecords): Promise<boolean>;

    // abstract delete(table: dbTables, id: idDB | idDB[]): Promise<boolean>;

}