import { currDB, userStorage } from "../../dataBase/serviceDB";
import { ObjectDB } from "../abstracts/ObjectDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { tableRecord } from "../interfacesAndTypes/tableRecord";
import { dbTables } from "../listsAndEnums/dbTables";

export class User extends ObjectDB {
  private _phone: idDB;
  private _email: string;
  private _password: string;
  private _authorized: boolean;
  static tableName = dbTables.users;

  constructor(phone: idDB, email: string = '', password: string = '', name: string = '', description: string = '', imgMain: string = '') {
    
    super(phone, name, description, imgMain);

    this._phone = phone;
    this._email = email;
    this._password = password;
    this._authorized = false;
  }

  async authorize(): Promise<boolean> {
    if(!this._phone){
        this._authorized = false;
        return Promise.resolve(false);
    }

    return currDB.getByKeys(dbTables.users, "id", [String(this._phone)])
        .then(dataRows => {

            // let dataRow: tableRecord;
            //if(!dataRows.length){
                // dataRow = {
                //     'id': this._phone,
                //     'email': this._email,
                //     'name': this._name,
                //     'password': this._password,
                // };
                // currDB.write([dataRow], dbTables.users);
                
            // }
            // else  
            
            if(!dataRows.length){
                this._authorized = false;
                return false;
            }
            const dataRow: tableRecord = dataRows[0];
   
            this._authorized = dataRow.password === this._password; // заменить на хэширование и проверку на сервере
            if(this._authorized){  
                if(!this._email)
                    this._email = dataRow.email as string;
                if(!this._name)
                    this._name = dataRow.name as string;
                
                userStorage.write([{
                        'id': this._phone,
                        'email': this._email,
                        'name': this._name,
                        // 'password': this._password,
                        'authorized': this._authorized,
                    }]);
            }

            return this._authorized;

        })
        .then(answ => answ)
        .catch(answ => false)
    }

    get phone(): idDB{
        return this._phone;
    }

    get email(): string{
        return this._email;
    }

    get authorized(): boolean{
        return this._authorized;
    }

    set authorized(value: boolean){
        this._authorized = value;
    }

}
