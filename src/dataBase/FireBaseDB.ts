import { DataBase } from "./DataBase";
import { dbTables } from "../models/listsAndEnums/dbTables";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { idDB } from "../models/interfacesAndTypes/idDB";

import listLocations from './listLocations.json';
import listComplexes from './listComplexes.json';

export class FireBaseDB extends DataBase{

    constructor(name: string, path: string){
        super(name, path);
    }

    async open(): Promise<void>{
        return Promise.resolve();
    };

    get(table: dbTables): Promise<tableDB>
    {
        return Promise.resolve([{'name': 'test'}]);
    };

    getByQuery(query: string): Promise<tableDB>{
        return Promise.resolve(fetch(listLocations).then(response => response.json()));
    };

    getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB | undefined>{
        
        switch (table) {
            case dbTables.locations:
                return Promise.resolve(fetch(listLocations).then(response => response.json()));
            case dbTables.complexes:
                return Promise.resolve(fetch(listComplexes).then(response => response.json()));
            default:
                return Promise.resolve(undefined);
        }       
    };  

    // abstract set(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract update(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract delete(table: dbTables, id: idDB | idDB[]): Promise<boolean>;

}