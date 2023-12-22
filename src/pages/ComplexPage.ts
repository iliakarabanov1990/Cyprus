import { ApartmentList } from "../models/apartment/ApartmentList";
import { ComplexList } from "../models/complex/ComplexList";
import { dataMap } from "../models/listsAndEnums/dataMap";
import { dbTables } from "../models/listsAndEnums/dbTables";
import {AbstractPage} from "../router";
import template from './ComplexPage.html';
import templateItem from './apartmentItem.html';

const templateEl = document.createElement('template');
const templateItemEl = document.createElement('template');
templateEl.innerHTML = template;
templateItemEl.innerHTML = templateItem;

export class ComplexPage extends AbstractPage {
  render(): HTMLElement | DocumentFragment {

    if(!this.routeState.resolvedData || !this.routeState.resolvedData.apartList){
      return templateEl.content.cloneNode(true) as DocumentFragment; 
    }

    const apartments = (dataMap.get(dbTables.apartments) as ApartmentList)?.objectList.values();
    if(!apartments)
      return templateEl.content.cloneNode(true) as DocumentFragment;

    const complexSections: DocumentFragment[] = Array.from(apartments).map((el) => {
      const cloneTemplateItemEl = templateItemEl.content.cloneNode(true) as DocumentFragment;
      const imgEl = cloneTemplateItemEl.querySelector('.apartment-box__img')!;
      const nameEl = cloneTemplateItemEl.querySelector('.apartment-box__name')!;
      const roomsNumberEl = cloneTemplateItemEl.querySelector('.apartment-box__roomsNumber')!;
      const commissioningDateEl = cloneTemplateItemEl.querySelector('.apartment-box__commissioningDate')!;
      const priceEl = cloneTemplateItemEl.querySelector('.apartment-box__price')!;
      const descriptionEl = cloneTemplateItemEl.querySelector('.apartment-box__description')!;
      const propertyOptionsEl = cloneTemplateItemEl.querySelector('.apartment-box__propertyOptions')!;

      imgEl.setAttribute('src', el.imgMain);
      nameEl.textContent = el.name;
      roomsNumberEl.textContent = el.roomsNumber?.toString() ?? null;
      commissioningDateEl.textContent = el.commissioningDate?.toString() ?? null;
      descriptionEl.textContent = el.description;
      propertyOptionsEl.textContent = el.propertyOptions.join(' ');
      priceEl.textContent = `${el.price}$`;
      
      return cloneTemplateItemEl; 
    });

    // templateEl.content.querySelector('.wrapper-complexes')!.innerHTML = complexSections.join("\n");
    const cloneTemplateEl = templateEl.content.cloneNode(true) as DocumentFragment;
    cloneTemplateEl.querySelector('.wrapper-complex')!.append(...complexSections);
    return cloneTemplateEl as DocumentFragment;
  }
}