import { Apartment } from "./Apartment";
import { ObjectList } from "../abstracts/ObjectList";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { idDB } from "../interfacesAndTypes/idDB";
import { currDB, favPropStorage } from "../../dataBase/serviceDB";
import { dbTables } from "../listsAndEnums/dbTables";
import { User } from "../user/User";

export class ApartmentList extends ObjectList<Apartment>{

    private _favoriteList: Set<idDB>; 

    constructor(){
        super();
        this._favoriteList = new Set<idDB>();
    }

    createNewItems(newItemsDB: tableDB): void{

        newItemsDB.forEach(element => {
            this.getItem(element.id as idDB, element as tableRecord);         
        });    
    }

    // getItem(id: idDB, tableRecord?: tableRecord): Apartment{

    //     let obj = this.findItem(id);
        
    //     if(!obj)
    //         obj = this.createNewItem(id, tableRecord);

    //     return obj;    
    // }

    createNewItem(id: idDB, newItemDB?: tableRecord): Apartment{
        const apartment = new Apartment(id);
        if(newItemDB)
            apartment.fillFromData(newItemDB);
        else
            apartment.fillFromDB();

        this.objectList.set(id, apartment);   

        return apartment;
    }

    async updateByComplexId(id: idDB): Promise<boolean>{

        return currDB.getByForeignKeys(dbTables.apartments, "complexId", [Number(id)])
            .then((dataRows) => this.createNewItems(dataRows))
            .then(() => true)
            .catch(() => false);
    }

    async updateFavoriteFromDB(user: User): Promise<boolean>{
        if(user.authorized)
            return this.updateFavoriteFromServerDB(user);
        else
            return this.updateFavoriteFromLocalStorage(user);
    }

    async updateFavoriteFromServerDB(user: User): Promise<boolean>{

        return currDB.getByForeignKeys(dbTables.userFavorites, "userId", [String(user.id)])
            .then((dataRows) => {
                const idArr = dataRows.map(el => el.apartmentId as number);
                return currDB.getByForeignKeys(dbTables.apartments, "id", idArr);
            })
            .then((dataRows) => {
                this.createNewItems(dataRows);
                return dataRows;
            })
            .then((dataRows) => {          
                dataRows.forEach(el => {
                    this._favoriteList.add(el.id as idDB);                 
                });    
            })
            .then(() => true)
            .catch(() => false);
    }

    async updateFavoriteFromLocalStorage(user: User): Promise<boolean>{

        this._favoriteList.clear();
        
        if(!user.authorized) return Promise.resolve(true);

        return favPropStorage.getArray()
            .then((dataRows) => {
                const idArr = dataRows.map(id => id as number);
                return currDB.getByForeignKeys(dbTables.apartments, "id", idArr);
            })
            .then((dataRows) => {
                this.createNewItems(dataRows);
                return dataRows;
            })
            .then((dataRows) => {          
                dataRows.forEach(el => {
                    this._favoriteList.add(el.id as idDB);                 
                });    
            })
            .then(() => true)
            .catch(() => false);
    }

    async setRemoveApartmentAsFavorite(user: User, idApartment: idDB, favorite: boolean){
        if(favorite)
            this._favoriteList.add(idApartment);
        else
            this._favoriteList.delete(idApartment);

        // if(user.authorized)
        //     //пишем на сервер
        // else
            favPropStorage.writeArray(Array.from(this._favoriteList));
    }

    get favoriteList(): Set<idDB>{
        return this._favoriteList;
    }

}