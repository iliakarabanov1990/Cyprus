import {ValidatorResult} from './ValidatorResult'


export interface ValidatorFunction<value>{
    (value: value): ValidatorResult;
} 




