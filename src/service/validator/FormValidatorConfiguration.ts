import { ValidatorFunction } from "./ValidatorFunction";

export type FormValidatorConfiguration<Data extends object> = {
    [Property in keyof Data]?: ValidatorFunction<Data[Property]>[];
}