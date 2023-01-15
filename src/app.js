import { inputs } from '../input';
import { content } from './model';

export class App {
  constructor(htmlElement) {
    this.root = htmlElement;
  }
  init() {
    const toHtml = obj => obj.toHtml();
    const inputHtml = `<aside id="aside" class="bg-light pt-3">${inputs.map(toHtml).join("")}</aside>`;
    const contentHtml = `<main id="site">${content.map(toHtml).join("")}</main>`;
    this.root.insertAdjacentHTML("beforeend", inputHtml);
    this.root.insertAdjacentHTML("beforeend", contentHtml);
  }
}