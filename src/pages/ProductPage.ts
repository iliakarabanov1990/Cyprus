import {AbstractPage} from "../router";

export class ProductPage extends AbstractPage {

  render(): HTMLElement | DocumentFragment {
    const content = document.createElement('div');

    content.textContent = `Product: ${this.routeState.params.productId}`;

    return content;
  }

}
