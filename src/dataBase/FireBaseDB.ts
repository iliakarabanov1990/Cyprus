import { DataBase } from "./DataBase";
import { dbTables } from "../models/listsAndEnums/dbTables";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { idDB } from "../models/interfacesAndTypes/idDB";
import listLocations from './listLocations.json';
import listComplexes from './listComplexes.json';
import listApartments from './listApartment.json'; 
import listUsers from './listUsers.json'; 
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";

export class FireBaseDB extends DataBase{

    constructor(name: string, path: string){
        super(name, path);
    }

    async init(): Promise<boolean>{
        return Promise.resolve(true);
    };

    async get(): Promise<tableDB>
    {
        return Promise.resolve([{}]);
    };

    async write(data: tableDB, table: dbTables): Promise<boolean>{
        return Promise.resolve(true);
    }

    async delete(): Promise<boolean> {
        return Promise.resolve(true);
      }

    async getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB>{
        
        let list: any;

        switch (table) {
            case dbTables.locations:
                list = listLocations;
                break;
            case dbTables.complexes:
                list = listComplexes;
                break;
            case dbTables.apartments:
                list = listApartments;
                break;
            default:
                return Promise.resolve([]);
        }      
        
        return fetch(list).then(response => response.json());
    };  

    async getByKeys(table: dbTables, fieldName: string, foreignKeys: tableFieldValue[]): Promise<tableDB>{

    let list: any;

    switch (table) {
        case dbTables.locations:
            list = listLocations;
            break;
        case dbTables.complexes:
            list = listComplexes;
            break;
        case dbTables.apartments:
            list = listApartments;
            break;
        case dbTables.users:
            list = listUsers;
            break;
        default:
            return Promise.resolve([]);
    }
    
    return fetch(list)
        .then(response => response.json())
        .then(mass => mass.filter((el: {[id: idDB]: tableFieldValue}) => {
            return foreignKeys.includes(el[fieldName])
        }));
        // return Promise.resolve(fetch(listLocations).then(response => response.json()));
    };

}