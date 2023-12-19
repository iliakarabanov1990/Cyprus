import { DataBase } from "./DataBase";
import { dbTables } from "./dbTables";
import { tableRecords } from "./tableRecords";


export class FireBaseDB extends DataBase{

    constructor(name: string, path: string){
        super(name, path);
    }

    open(): Promise<void>{
        return Promise.resolve();
    };

    get(table: dbTables): Promise<tableRecords>
    {
        return Promise.resolve([{'name': 'test'}]);
    };

    getByQuery(query: string): Promise<tableRecords>{
        return Promise.resolve([{'name': 'test'}]);
    };

    // abstract set(table: dbTables, tableRecords: tableRecord | tableRecords): Promise<boolean>;

    // abstract update(table: dbTables, tableRecords: tableRecord | tableRecords): Promise<boolean>;

    // abstract delete(table: dbTables, id: idDB | idDB[]): Promise<boolean>;

}