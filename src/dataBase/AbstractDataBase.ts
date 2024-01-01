import { dbTables } from "../models/listsAndEnums/dbTables";
import { idDB } from "../models/interfacesAndTypes/idDB";
import { tableDB } from "../models/interfacesAndTypes/tableDB";

export abstract class AbstractDataBase{
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
    abstract get(table?: dbTables,  id?: idDB): Promise<tableDB>;
    abstract write(data: tableDB, table?: dbTables): Promise<boolean>;
    abstract delete(table?: dbTables,  id?: idDB): Promise<boolean>;

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