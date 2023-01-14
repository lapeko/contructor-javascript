import { content } from './model';

export class App {
  constructor(htmlElement) {
    this.root = htmlElement;
  }
  init() {
    const toHtml = obj => obj.toHtml();
    const html = content.map(toHtml).join("");
    this.root.insertAdjacentHTML("beforebegin", html);
  }
}