import { DBObject } from "./DBObject";
import { DataBase } from "./DataBase";
import { dbTables } from "./dbTables";
import { idDB } from "./idDB";

export class ComplexDB extends DBObject{

    constructor(dataBase: DataBase, tableName: dbTables, id = ''){
        super(dataBase, tableName, id);
    }

    async get(id: idDB): Promise<boolean>{

        // this._properties = await this.dataBase.getByQuery(`SELECT * FROM Complex LEFT JOIN Location on Complex.id = Location.ComplexId WHERE Complex.id= ${this.id}`);
          
        this._properties = {'name': 'testName', 'description': 'TestDescription', 'id': 'testId'};

        return Promise.resolve(true);
     }




    // abstract set(_properties: tableRecord):Promise<boolean>;
    // abstract update(_properties: tableRecord):Promise<boolean>;
    // abstract delete(id: idDB):Promise<boolean>;
}