import {AbstractPage} from "../../router";
import template from './homePage.html';

const templEl = document.createElement('template');
templEl.innerHTML = template;

interface ProductInfo {
  id: number;
  price: number;
  title: string;
}

export class HomePage extends AbstractPage {
  render(): HTMLElement | DocumentFragment {
    return templEl.content.cloneNode(true) as DocumentFragment;
  }
}
