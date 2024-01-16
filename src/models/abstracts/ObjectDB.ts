import { dbTables } from "../listsAndEnums/dbTables";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";

export abstract class ObjectDB{

    static readonly tableName: dbTables;

    constructor(protected _id: idDB = '', 
            protected _name: string = '', 
                protected _description: string = '', 
                    protected _imgMain: string = '',
                        protected _images: string[] = []){
    }

    fillFromData(record: tableRecord): void{
        this._name = record.name as string;
        this._description = record.description as string;
        this._images = record.images as string[];
        if(record.images && (record.images as string[]).length)
            this._imgMain = (record.images as string[])[0] as string;
    };

    get id(): idDB{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get imgMain(): string{
        return this._imgMain;
    }

    get images(): string[]{
        return this._images;
    }

    //abstract get(id: idDB):Promise<boolean>;
    // abstract set(_properties: tableRecord):Promise<boolean>;
    // abstract update(_properties: tableRecord):Promise<boolean>;
    // abstract delete(id: idDB):Promise<boolean>;
}