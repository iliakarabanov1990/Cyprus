import { DataBase } from "./DataBase";
import { dbTables } from "../models/listsAndEnums/dbTables";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { idDB } from "../models/interfacesAndTypes/idDB";

import listLocations from './listLocations.json';
import listComplexes from './listComplexes.json';
import listApartment from './listApartment.json'; 
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";

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
        return fetch(listApartment)
        .then(response => response.json())
    };

    getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB>{
        
        let list: any;

        switch (table) {
            case dbTables.locations:
                list = listLocations;
                break;
            case dbTables.complexes:
                list = listComplexes;
                break;
            case dbTables.apartments:
                list = listApartment;
                break;
            default:
                return Promise.resolve([]);
        }      
        
        return fetch(list).then(response => response.json());
    };  

    getByForeignKeys(table: dbTables, fieldName: string, foreignKeys: tableFieldValue[]): Promise<tableDB>{

    let list: any;

    switch (table) {
        case dbTables.locations:
            list = listLocations;
            break;
        case dbTables.complexes:
            list = listComplexes;
            break;
        case dbTables.apartments:
            list = listApartment;
            break;
        default:
            return Promise.resolve([]);
    }
    
        return fetch(list)
        .then(response => response.json())
        .then(mass => mass.filter((el: {[id: idDB]: tableFieldValue}) => foreignKeys.includes(el[fieldName])));
        // return Promise.resolve(fetch(listLocations).then(response => response.json()));
    };

    // abstract set(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract update(table: dbTables, tableRecords: tableRecord | tableDB): Promise<boolean>;

    // abstract delete(table: dbTables, id: idDB | idDB[]): Promise<boolean>;

}