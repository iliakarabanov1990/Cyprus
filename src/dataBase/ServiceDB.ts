import { FireBaseDB } from "./FireBaseDB";
import { BrowserLocalStorage } from './BrowserLocalStorage';

export const currDB = new FireBaseDB('test', 'testPath');
export const userStorage = new BrowserLocalStorage('user', 'cyprus');
export const favPropStorage = new BrowserLocalStorage('favProp', 'cyprus');

// export abstract class ServiceDB{

//     private static _currDB: DataBase = new FireBaseDB('test', 'testPath');

//     static async openConnection(){
//         ServiceDB._currDB.open();
//     }

//     static get currDB(): DataBase{
//         return ServiceDB._currDB;
//     }
// }