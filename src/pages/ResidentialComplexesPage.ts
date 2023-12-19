import {AbstractPage} from "../router";
import template from './residentialComplexes.html';

const templEl = document.createElement('template');
templEl.innerHTML = template;

interface ProductInfo {
  id: number;
  price: number;
  title: string;
}

export class ResidentialComplexesPage extends AbstractPage {
  render(): HTMLElement | DocumentFragment {
    console.log(this.routeState.resolvedData);
    return templEl.content.cloneNode(true) as DocumentFragment;
  }
}
