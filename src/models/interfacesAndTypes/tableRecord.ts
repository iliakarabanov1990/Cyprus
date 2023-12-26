import { idDB } from "./idDB";
import { tableFieldValue } from "./tableFieldValue";

export type tableRecord = {
    [key: idDB]: tableFieldValue;
};