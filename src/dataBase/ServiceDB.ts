import { DataBase } from "./DataBase";
import { FireBaseDB } from "./FireBaseDB";

export abstract class ServiceDB{

    private static _currDB: DataBase = new FireBaseDB('test', 'testPath');

    static async openConnection(){
        ServiceDB._currDB.open();
    }

    static get currDB(): DataBase{
        return ServiceDB._currDB;
    }
}