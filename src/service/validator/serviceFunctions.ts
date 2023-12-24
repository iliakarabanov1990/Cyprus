import { FormValidateResult } from "./FormValidator";
import { userDataValidating } from "./userDataValidating";

export function setFormErrors(document: Document, errors: FormValidateResult<userDataValidating> | null) : void{

    if (!errors)
        return; 

    for (const key in errors) {
        setFormError(document, errors, key);          
    }
}

export function clearMessages(document: Document): void{

    const errorsLists = document.querySelectorAll('.error-list');

    for (const err of errorsLists) {
        err.innerHTML = '';  
    }

}

export function setFormError(document: Document, errors: FormValidateResult<userDataValidating> | null, errName: string) : void{

    const errEl = document.getElementById(errName + "Error");
    if(!errEl) return;  

    if (!errors) return; 
    
    for (const property in errors[errName as keyof userDataValidating]) { 
        const err = errors[errName as keyof userDataValidating];

        if (!err || !err[property]) continue;

        const errLiOfEl = createElementByErr(err[property]);
        errEl.appendChild(errLiOfEl);
    }  
}

export function createElementByErr(err: string): HTMLElement{

    const el = document.createElement('li');
    el.textContent = err;
    el.style.color = "red";
    return el;
}