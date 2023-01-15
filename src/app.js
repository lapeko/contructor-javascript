import { inputs } from './input';

export class App {
  constructor(htmlElement) {
    this.root = htmlElement;
  }
  init = () => this.refresh(true);
  refresh = (isFirst = false) => {
    if (!isFirst) reset(this);

    render(this.root);

    inputs.get().forEach(input => input.subscribe());
  }
}

function reset(context) {
  const $body = context.root.parentNode;
  $body.removeChild(context.root);
  $body.insertAdjacentHTML("afterbegin", '<div id="root"></div>');
  const $root = document.getElementById("root");
  context.root = $root;
}

function render(root) {
  renderAside(root);
  renderSite(root);
}

function renderAside(root) {
  const inputHtml = `<aside id="aside" class="bg-light pt-3">${inputs.get().map(toHtml).join("")}</aside>`;
  root.insertAdjacentHTML("beforeend", inputHtml);
}
function renderSite(root) {
  const contentHtml = `<main id="site">${inputs.get().slice(0, -1).map(toRenderBlock).join("")}</main>`;
  root.insertAdjacentHTML("beforeend", contentHtml);
}

function toHtml(obj) {
  return obj.toHtml();
}

function toRenderBlock(obj) {
  return obj.renderBlock().toHtml();
}