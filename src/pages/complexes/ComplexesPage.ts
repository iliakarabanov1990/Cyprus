import { ComplexList } from "../../models/complex/ComplexList";
import { dataMap } from "../../models/listsAndEnums/dataMap";
import { dbTables } from "../../models/listsAndEnums/dbTables";
import {AbstractPage} from "../../router";
import template from './complexesPage.html';
import templateItem from './complexesItemPage.html';

const templateEl = document.createElement('template');
const templateItemEl = document.createElement('template');
templateEl.innerHTML = template;
templateItemEl.innerHTML = templateItem;


interface ProductInfo {
  id: number;
  price: number;
  title: string;
}

export class ComplexesPage extends AbstractPage {
  render(): HTMLElement | DocumentFragment {

    if(!this.routeState.resolvedData || !this.routeState.resolvedData.complexList){
      return templateEl.content.cloneNode(true) as DocumentFragment; 
    }
    
    const complexes = (dataMap.get(dbTables.complexes) as ComplexList)?.objectList.values();
    if(!complexes)
      return templateEl.content.cloneNode(true) as DocumentFragment;

    const complexSections: DocumentFragment[] = Array.from(complexes).map((el) => {

      const clone = templateItemEl.content.cloneNode(true) as DocumentFragment;
      const imgEl = clone.querySelector('.complex-box__img')!;
      const complexEl = clone.querySelector('.complex')!;
      const nameEl = clone.querySelector('.complex-box__name')!;
      const locationEl = clone.querySelector('.complex-box__location')!;
      const pricesEl = clone.querySelector('.complex-box__prices')!;
      complexEl.setAttribute('href', `complexes/${el.id}`);
      nameEl.textContent = el.name;
      locationEl.textContent = el.location?.name ?? null;
      pricesEl.textContent = `цены: ${el.minPrice}$ - ${el.maxPrice}$`;
      imgEl.setAttribute('src', el.imgMain);
      // return templateItemEl.innerHTML;
       return clone; 
    });

    // templateEl.content.querySelector('.wrapper-complexes')!.innerHTML = complexSections.join("\n");
    const clone = templateEl.content.cloneNode(true) as DocumentFragment;
    clone.querySelector('.wrapper-complexes')!.append(...complexSections);
    return clone as DocumentFragment;
  }
}
