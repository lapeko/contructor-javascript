import { col, row, container } from './utils';

export class Block {
  constructor(value, options) {
    this.value = value;
    this.options = options;
  }
  toHtml() {
    throw new Error('toHtml method should be implemented');
  }
}

export class Header extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHtml() {
    const { tag = "h2" } = this.options || {};
    return container(row(col(`<${tag}>${this.value}</${tag}>`)), this.options?.styles);
  }
}

export class Text extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHtml() {
    return container(row(col(this.value)), this.options?.styles);
  }
}

export class Columns extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHtml() {
    const wrap = (value) => col(value, "text-center");
    return container(row(this.value.map(wrap).join("")), this.options?.styles);
  }
}

export class Image extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHtml() {
    const { alt = "", styles = "" } = this.options || {};
    return row(`<img src="${this.value}" style="${styles}" alt="${alt}" />`);
  }
}