import { ValidatorFunction } from "./ValidatorFunction";

export const requiredText: ValidatorFunction<string> = (value) =>{
    return value.trim().length ? null : {requiredText: "поле обязательно для заполнения."};
}

export const validEmail: ValidatorFunction<string> = (value) =>{
    return !value.trim().length  || /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(value) ? null : {requiredText: "неверно заполнен e-mail"};
}

export const validPhone: ValidatorFunction<string> = (value) =>{
    return /^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value) ? null : {requiredText: "неверно заполнен телефон"};
} 
















