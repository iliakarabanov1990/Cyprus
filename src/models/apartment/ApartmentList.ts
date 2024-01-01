import { Apartment } from "./Apartment";
import { ObjectList } from "../abstracts/ObjectList";
import { tableDB } from "../interfacesAndTypes/tableDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { idDB } from "../interfacesAndTypes/idDB";
import { currDB, favPropStorage } from "../../dataBase/serviceDB";
import { dbTables } from "../listsAndEnums/dbTables";
import { User } from "../user/User";
import { tableFieldValue } from "../interfacesAndTypes/tableFieldValue";

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

    createNewItem(id: idDB, newItemDB: tableRecord): Apartment{
        const apartment = new Apartment(id);
        apartment.fillFromData(newItemDB);
        this.objectList.set(id, apartment);   
        return apartment;
    }

    async updateByComplexId(id: idDB): Promise<boolean>{

        return currDB.getByKeys(dbTables.apartments, "complexId", [id])
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

        return currDB.get(dbTables.userFavorites, user.id).then((dataTable) => {
            
            if(dataTable && dataTable.length && dataTable[0])
                this._favoriteList = new Set(dataTable[0].favorites.toString().split(' '));
            else
                this._favoriteList = new Set();

            return Promise.resolve(true); 
        });
    }

    async updateFavoriteFromLocalStorage(user: User): Promise<boolean>{

        this._favoriteList.clear();
        
        if(!user.authorized) return Promise.resolve(true);

        return favPropStorage.get()
            .then((dataRows) => {
                const idArr = dataRows.map(el => el.id as number);
                return currDB.getByKeys(dbTables.apartments, "id", idArr);
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

        currDB.write([{id: user.id, favorites: Array.from(this._favoriteList.values()).join(' ')}], 
                        dbTables.userFavorites);
    }

    get favoriteList(): Set<idDB>{
        return this._favoriteList;
    }

}