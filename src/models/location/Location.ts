import { Coordinates } from "../interfacesAndTypes/Coordinates";
import { ObjectDB } from "../abstracts/ObjectDB";
import { idDB } from "../interfacesAndTypes/idDB";
import { dbTables } from "../listsAndEnums/dbTables";
import { tableRecord } from "../interfacesAndTypes/tableRecord";

export class Location extends ObjectDB {
  private _coordinates: Coordinates;
  static tableName = dbTables.locations;

  constructor(id: idDB, name?: string, description: string = '', imgMain: string = '',) {
    super(id, name, description, imgMain);
    this._coordinates = { latitude: "", longitude: "" };
  }

  async fillFromDB(): Promise<boolean> {
    return Promise.resolve(true);
  }

  fillFromData(record: tableRecord): void {

    super.fillFromData(record);

    this._coordinates.latitude = record.latitude as string;
    this._coordinates.longitude = record.longitude as string;
  }

  get coordinates(): Coordinates {
    return this._coordinates;
  }

  // constructor(coordinates: Coordinates, name: string, description: string, id: idDB, tableName: dbTables){
  //     super(tableName, id);
  //     this._coordinates = coordinates;
  //     this._name = name;
  //     this._description = description;
  // }

  // async updateFromDB(): Promise<boolean>{
  //     await this._dBObject.get(this._id);

  //     this._coordinates.latitude = this._dBObject.properties['latitude'] as string;
  //     this._coordinates.longitude = this._dBObject.properties['longitude'] as string;
  //     this._name = this._dBObject.properties['name'] as string;
  //     this._description = this._dBObject.properties['description'] as string;
  //     this._id = this._dBObject.properties['id'] as idDB;

  //     return Promise.resolve(true);
  // }
}
