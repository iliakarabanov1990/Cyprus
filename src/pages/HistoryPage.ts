import {AbstractPage} from "../router";

export class HistoryPage extends AbstractPage {

  render(): HTMLElement | DocumentFragment {
    const content = document.createElement('div');

    content.textContent = 'History';

    return content;
  }

}
