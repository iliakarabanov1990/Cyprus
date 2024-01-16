import { UserCredential } from "firebase/auth";
import { currDB } from "../../dataBase/serviceDB";
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

  constructor(phone: idDB = '', email: string = '', password: string = '', name: string = '', description: string = '', imgMain: string = '') {
    
    super(phone, name, description, imgMain);

    this._phone = phone;
    this._email = email;
    this._password = password;
    this._authorized = false;
  }

  async authorize(): Promise<boolean> {
    
    this._authorized = false;
   
    if(!this.id){  
        return Promise.resolve(false);
    }

    // return currDB.getByKeys(dbTables.users, "id", [String(this._phone)])
    return currDB.signIn(this.id, this._password)
        .catch(answ => 
            currDB.logIn(this.id, this._password))
        .then((userCredential) => this.handleAuth(userCredential))   
        .then(answ => answ)
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false;
        });
    }

    async addAnswerQuiz(quiz: string, phone: string, month: string, payment: string){

        let today = new Date().toLocaleString();

        currDB.write([{'id': phone, 'quiz': quiz, 'month': month, 'payment': payment, 'date': today}], dbTables.quizzes);

    }

    async addLead(leadPhone: string, userPhone: string){

        let today = new Date().toLocaleString();

        currDB.write([{'id': leadPhone, 'userPhone': userPhone, 'date': today}], dbTables.leads);

    }    

    handleAuth(credential: UserCredential) {
        const serverData = credential.user;
        if(serverData)
            this._authorized = true;
        return this._authorized}

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
