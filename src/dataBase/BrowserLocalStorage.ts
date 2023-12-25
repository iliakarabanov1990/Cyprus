import { idDB } from "../models/interfacesAndTypes/idDB";
import { tableDB } from "../models/interfacesAndTypes/tableDB";
import { tableFieldValue } from "../models/interfacesAndTypes/tableFieldValue";
import { dbTables } from "../models/listsAndEnums/dbTables";
import { DataBase } from "./DataBase";

export class BrowserLocalStorage extends DataBase {
  constructor(name: string, path: string) {
    super(name, path);
  }

  async init(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async getAll(): Promise<tableDB> {
    await this._ready;
    const data = this.extractDataFromStorage();
    return Promise.resolve(data ?? []);
  }

  async getArray(): Promise<Array<idDB>> {
    await this._ready;
    const data = this.extractArrayFromStorage();
    return Promise.resolve(data ?? []);
  }

  async writeAll(data: tableDB): Promise<boolean> {
    await this.ready;
    // const dataStorage = this.extractDataFromStorage();

    this.saveDataToStorage(data);

    return Promise.resolve(true);
  }

  async writeArray(data: Array<idDB>): Promise<boolean> {
    await this.ready;
    // const dataStorage = this.extractArrayFromStorage();

    this.saveDataToStorage(data);

    return Promise.resolve(true);
  }

  async delete(): Promise<void> {
    await this.ready;
    localStorage.removeItem(this.path + "/" + this.name);
  }

  private extractDataFromStorage(): tableDB | null{
    const storageData = localStorage.getItem(this.path + "/" + this.name);

    return storageData ? JSON.parse(storageData) : null;
  }

  private extractArrayFromStorage(): Array<idDB> | null{
    const storageData = localStorage.getItem(this.path + "/" + this.name);

    return storageData ? JSON.parse(storageData) : null;
  }

  private saveDataToStorage(data: tableDB | Array<idDB>): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(this.path + "/" + this.name, jsonData);
  }

  get(table: dbTables): Promise<tableDB> {
    return Promise.resolve([{}]);
  }

  getByQuery(query: string): Promise<tableDB> {
    return Promise.resolve([{}]);
  }

  getNewRecords(table: dbTables, existedId: idDB[]): Promise<tableDB> {
    return Promise.resolve([{}]);
  }

  getByForeignKeys(table: dbTables, fieldName: string, foreignKeys: tableFieldValue[]): Promise<tableDB> {
    return Promise.resolve([{}]);
  }
}
