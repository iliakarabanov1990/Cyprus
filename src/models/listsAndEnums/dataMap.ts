import { ObjectDB } from "../abstracts/ObjectDB";
import { ObjectList } from "../abstracts/ObjectList";
import { ApartmentList } from "../apartment/ApartmentList";
import { ComplexList } from "../complex/ComplexList"
import { LocationList } from "../location/LocationList";
import { dbTables } from "./dbTables";

const complexes = new ComplexList();
const locations = new LocationList();
const apartments = new ApartmentList();

export const dataMap = new Map<dbTables, ObjectList<ObjectDB>>();

dataMap.set(dbTables.complexes, complexes);
dataMap.set(dbTables.locations, locations);
dataMap.set(dbTables.apartments, apartments);