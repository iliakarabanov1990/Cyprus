import { ValidatorFunction } from "./ValidatorFunction";
import { ValidatorResult } from "./ValidatorResult";

export function composeValidators<T>(...validators: ValidatorFunction<T>[]): ValidatorFunction<T>{
    return (value: T): ValidatorResult => {
        for(const validator of validators){
            const result = validator(value);

            if (result){
                return result;
            }

        }

        return null;
    }
}