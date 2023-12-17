import {AbstractPage} from "../router";

export class CartPage extends AbstractPage {

  render(): HTMLElement | DocumentFragment {
    const content = document.createElement('div');

    content.textContent = 'Cart';

    return content;
  }

}
