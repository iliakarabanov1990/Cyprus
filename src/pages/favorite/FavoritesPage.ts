import { Apartment } from "../../models/apartment/Apartment";
import { ComplexList } from "../../models/complex/ComplexList";
import { apartments, complexes } from "../../models/listsAndEnums/lists";
import { dbTables } from "../../models/listsAndEnums/dbTables";
import { propertyOptionsDescription } from "../../models/listsAndEnums/propertyOptions";
import { roomsNumberDescription } from "../../models/listsAndEnums/roomsNumberTypes";
import {AbstractPage} from "../../router";
import template from './favoritesPage.html';
import templateItem from './apartmentItem.html';
import { ApartmentList } from "../../models/apartment/ApartmentList";
import { User } from "../../models/user/User";

const templateEl = document.createElement('template');
const templateItemEl = document.createElement('template');
templateEl.innerHTML = template;
templateItemEl.innerHTML = templateItem;

export class FavoritesPage extends AbstractPage {
  render(): HTMLElement | DocumentFragment {

    const nameOfComplex = complexes.objectList.get(Number(this.routeState.params.complexId))?.name;

    if(!this.routeState.resolvedData || !this.routeState.resolvedData.apartList){
      return templateEl.content.cloneNode(true) as DocumentFragment;                                                           
    }

    // const apartments = (dataMap.get(dbTables.apartments) as ApartmentList)?.objectList.values();
    // if(!apartments)
    //   return templateEl.content.cloneNode(true) as DocumentFragment;

    const complexSections: DocumentFragment[] = (this.routeState.resolvedData.apartList as Apartment[]).map((el) => {
      const cloneTemplateItemEl = templateItemEl.content.cloneNode(true) as DocumentFragment;

      const buttonLike = cloneTemplateItemEl.querySelector('.apartment-box__like')! as HTMLElement;
      buttonLike.dataset.apartId = el.id as string;

      buttonLike.textContent = apartments.favoriteList.has(el.id) ? "Снять отметку" : "Отметить";

      buttonLike.addEventListener('click', (event) => {
        const apartId = Number((event.target as HTMLElement).dataset.apartId);
        const isFavorite = apartments.favoriteList.has(el.id);
        buttonLike.textContent = isFavorite ? "Отметить" : "Снять отметку";
        apartments.setRemoveApartmentAsFavorite(this.routeState!.resolvedData!.user as User, apartId, !isFavorite)
      });

      const roomsNumberEl = cloneTemplateItemEl.querySelector('.apartment-box__roomsNumber')!;
      const propertySquare = cloneTemplateItemEl.querySelector('.apartment-box__propertySquare')!;
      const priceEl = cloneTemplateItemEl.querySelector('.apartment-box__price')!;
      const floorEl = cloneTemplateItemEl.querySelector('.apartment-box__floor')!;
      const commissioningDateEl = cloneTemplateItemEl.querySelector('.apartment-box__commissioningDate')!;

      
      const descriptionEl = cloneTemplateItemEl.querySelector('.apartment-box__description')!;
      const propertyOptionsEl = cloneTemplateItemEl.querySelector('.apartment-box__propertyOptions')!;
      

      // imgEl.setAttribute('src', el.imgMain);
      // nameEl.textContent = el.name;
      if (el.roomsNumber)
        roomsNumberEl.textContent = roomsNumberDescription.get(el.roomsNumber) ?? null;
      propertySquare.textContent = `${el.square} м2` ?? null;
      priceEl.textContent = `цена: ${el.price}$`;
      commissioningDateEl.textContent = `дата сдачи: ${el.commissioningDate?.toString()}` ?? null;
      floorEl.textContent = `этаж: ${el.floor}`;
      if(el.propertyOptions.length){
        const options = el.propertyOptions.map(opt => propertyOptionsDescription.get(opt));
        propertyOptionsEl.innerHTML = `<span>${options.join('</span><span>')}</span>`;
    }

      descriptionEl.textContent = el.description;
      
      
      
      return cloneTemplateItemEl; 
    });

    // templateEl.content.querySelector('.wrapper-complexes')!.innerHTML = complexSections.join("\n");
    const cloneTemplateEl = templateEl.content.cloneNode(true) as DocumentFragment;
    const templEl = cloneTemplateEl.querySelector('.wrapper-complex')!;
    const templHeader = document.createElement("h1");
    templHeader.textContent = 'Отмеченные объекты недвижимости'!;
    templEl.appendChild(templHeader);
    templEl.append(...complexSections);
    return cloneTemplateEl as DocumentFragment;
  }
}