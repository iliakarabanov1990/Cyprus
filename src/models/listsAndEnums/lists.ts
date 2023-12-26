import { ApartmentList } from "../apartment/ApartmentList";
import { ComplexList } from "../complex/ComplexList"
import { LocationList } from "../location/LocationList";

export const complexes = new ComplexList();
export const locations = new LocationList();
export const apartments = new ApartmentList();

// export const dataMap = new Map<dbTables, ObjectList<ObjectDB>>();

// dataMap.set(dbTables.complexes, complexes);
// dataMap.set(dbTables.locations, locations);
// dataMap.set(dbTables.apartments, apartments);