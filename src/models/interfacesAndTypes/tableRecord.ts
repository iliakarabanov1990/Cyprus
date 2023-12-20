import { idDB } from "./idDB";
import { tableFieldValue } from "./tableFieldValue";

export type tableRecord = {
    [id: idDB]: tableFieldValue;
};