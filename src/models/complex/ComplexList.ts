import { Complex } from "./Complex";
import { ObjectList } from "../abstracts/ObjectList";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { idDB } from "../interfacesAndTypes/idDB";

export class ComplexList extends ObjectList<Complex>{

    constructor(){
        super();
    }

    createNewItems(newItemsDB: tableDB): void{

        newItemsDB.forEach(element => {
            this.getItem(element.id as idDB, element as tableRecord);         
        });    
    }

    // getItem(id: idDB, tableRecord?: tableRecord): Complex{

    //     let obj = this.findItem(id);
        
    //     if(!obj)
    //         obj = this.createNewItem(id, tableRecord);

    //     return obj;    
    // }

    createNewItem(id: idDB, newItemDB?: tableRecord): Complex{
        const complex = new Complex(id);
        if(newItemDB)
            complex.fillFromData(newItemDB);
        else
            complex.fillFromDB();

        this.objectList.set(id, complex);   

        return complex;
    }

}