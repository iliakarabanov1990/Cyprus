import { idDB } from "../interfacesAndTypes/idDB";
import { Location } from "../location/Location";
import { Property } from "./Property";
import { roomsNumberTypes } from "../listsAndEnums/roomsNumberTypes";

export abstract class ResidentialProperty extends Property{
    
    protected _location: Location | undefined;
    
    protected _roomsNumber: roomsNumberTypes | undefined;  
    
    protected _commissioningDate: string;

    protected _square: number;

    constructor(id: idDB){
        super(id);      
        this._commissioningDate = '';
        this._square = 0;
    }

    get roomsNumber(): roomsNumberTypes | undefined{
        return this._roomsNumber;
    }

    get commissioningDate(): string{
        return this._commissioningDate;
    }

    get square(): number{
        return this._square;
    }
}