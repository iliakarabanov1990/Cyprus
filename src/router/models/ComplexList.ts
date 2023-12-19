import { Complex } from "./Complex";
import { ComplexDB } from "./ComplexDB";
import { FireBaseDB } from "./FireBaseDB";
import { ObjectList } from "./ObjectList";
import { dbTables } from "./dbTables";
import { propertyOptions } from "./propertyOptions";

export class ComplexList extends ObjectList<Complex>{

    constructor(){
        super();
    }

    updateFromDB(): Promise<boolean>{

        const location: Location = new Location();
        const dbFire = new FireBaseDB('test', 'testPath');

        const complexDB = new ComplexDB(dbFire, dbTables.complexes);
        const complexDB2 = new ComplexDB(dbFire, dbTables.complexes);

        this.objectList.set('1', new Complex(location, 'test1', 'descr1', [propertyOptions.bar], '1', complexDB));
        this.objectList.set('2', new Complex(location, 'test2', 'descr2', [propertyOptions.bar], '2', complexDB2));

        return Promise.resolve(true);
    }

}