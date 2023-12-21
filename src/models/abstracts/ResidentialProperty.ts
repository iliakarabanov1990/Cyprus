import { idDB } from "../interfacesAndTypes/idDB";
import { Location } from "../location/Location";
import { Property } from "./Property";
import { roomsNumberTypes } from "../listsAndEnums/roomsNumberTypes";

export abstract class ResidentialProperty extends Property{
    
    protected _location: Location | undefined;
    
    protected _roomsNumber: roomsNumberTypes | undefined;  
    
    protected _commissioningDate: Date | undefined;

    constructor(id: idDB){
        super(id);      
    }

    get roomsNumber(): roomsNumberTypes | undefined{
        return this._roomsNumber;
    }

    get commissioningDate(): Date | undefined{
        return this._commissioningDate;
    }
    
}