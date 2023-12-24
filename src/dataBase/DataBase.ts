import { dbTables } from "../models/listsAndEnums/dbTables";
import { idDB } from "../models/interfacesAndTypes/idDB";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";

export abstract class DataBase{
    protected _ready: Promise<boolean>;
    readonly #path: string; 
    readonly #name: string;

    constructor(name: string, path: string){
        this._ready = Promise.resolve(false);
        this.#path = path;
        this.#name = name;
        open();
    }

    open(): void{
        this._ready = this.init();
    };

    abstract init(): Promise<boolean>;

    abstract get(table: dbTables, id?: idDB): Promise<tableDB>;

    abstract getAll(table?: dbTables): Promise<tableDB>;

    abstract writeAll(data: tableDB, table?: dbTables): Promise<boolean>;

    abstract getByQuery(query: string): Promise<tableDB>;

    abstract getByForeignKeys(table: dbTables, fieldName: string, foreignKeys: tableFieldValue[]): Promise<tableDB>;

    abstract getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB | undefined>;

    get ready(): Promise<boolean>{
        return this._ready;
    }

    get path(): string{
        return this.#path;
    }

    get name(): string{
        return this.#name;
    }

}