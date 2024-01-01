import { dbTables } from "../models/listsAndEnums/dbTables";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { idDB } from "../models/interfacesAndTypes/idDB";
import listLocations from './listLocations.json';
import listComplexes from './listComplexes.json';
import listApartments from './listApartment.json'; 
import listUsers from './listUsers.json'; 
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set, get } from "firebase/database";
import { Auth, UserCredential, getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword, signOut} from "firebase/auth";
import { AbstractDataBase } from "./AbstractDataBase";
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";

export class FireBaseDB extends AbstractDataBase{

    firebaseConfig = {
        apiKey: "AIzaSyAM6GzPw9DmQ8gG3fBFM1vhFKuGDVAfskU",
        authDomain: "cyprus-real-estate-for-belarus.firebaseapp.com",
        databaseURL: "https://cyprus-real-estate-for-belarus-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "cyprus-real-estate-for-belarus",
        storageBucket: "cyprus-real-estate-for-belarus.appspot.com",
        messagingSenderId: "780889226514",
        appId: "1:780889226514:web:7a2c7fe0fa79247391c7cb",
        measurementId: "G-G8FX47DED9"
      }

      #database: Database;
      #app: FirebaseApp;
      auth: Auth;

    constructor(name: string, path: string){
        super(name, path);

        this.#app = initializeApp(this.firebaseConfig);
        this.#database = getDatabase(this.#app);
        this.auth = getAuth();
    }

    async init(): Promise<boolean>{
        return Promise.resolve(true);
    };

    async get(table: dbTables, id?: idDB): Promise<tableDB>
    {
        const query = ref(this.#database, `${dbTables[table]}/${id}`);
        //const query = ref(this.#database, `${dbTables[table]}`);
        return Promise.resolve(get(query))
        .then(data => [data.val()])
        .catch((err)=>[]);
    };

    async write(data: tableDB, table: dbTables): Promise<boolean>{        
        data.forEach(row => {
            set(ref(this.#database, `${dbTables[table]}/` + row.id), row);        
        });
        return Promise.resolve(true);
    }

    async delete(): Promise<boolean> {
        return Promise.resolve(true);
      }

      async signIn(userName: idDB, password: string): Promise<UserCredential>{
        return createUserWithEmailAndPassword(this.auth, `${userName}@mail.com`, password)
      }


    
    async logIn(userName: idDB, password: string): Promise<UserCredential>{

        return signInWithEmailAndPassword(this.auth, `${userName}@mail.com`, password);
    }

    async signOut(){
        signOut(this.auth).then(() => {
            // Sign-out successful.
        }).catch((err) => {
            // An error happened.
        });
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

    getCurrUser(){
        return  this.auth.currentUser;
    }
}