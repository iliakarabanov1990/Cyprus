import { FormValidatorConfiguration } from "./FormValidatorConfiguration";
import { ValidatorFunction } from "./ValidatorFunction";
import { ValidatorResult } from "./ValidatorResult";
import { composeValidators } from "./composeValidators";

export type FormValidateResult<Data extends object> = Partial<{
    [P in keyof Data]: NonNullable<ValidatorResult>;
}>;

export class FormValidator<Data extends object>{
    readonly #validationMap: Map<string, ValidatorFunction<unknown>>;

    constructor(configuration: FormValidatorConfiguration<Data>){

        this.#validationMap = new Map();
        for(const [key, value] of Object.entries(configuration) ){
            this.#validationMap.set(key, composeValidators(...value as ValidatorFunction<unknown>[]));
        }
    }

    validate(data: Data): FormValidateResult<Data> | null{

        const errors: FormValidateResult<Data> [] = [];

        for (const [popertyName, value] of Object.entries(data)){
            const validator = this.#validationMap.get(popertyName);

            if(validator){
                const result = validator(value);
                if (result){
                    errors.push({[popertyName]: result} as FormValidateResult<Data> );
                }
            }
        }

        return errors.length ? Object.assign({}, ...errors) : null;
    }
}