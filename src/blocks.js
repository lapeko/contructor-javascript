class Block {
  constructor(type, value, options) {
    this.type = type;
    this.value = value;
    this.options = options;
  }
  toHtml() {
    throw new Error('toHtml method should be implemented');
  }
}

export class Header extends Block {
  constructor(value, options) {
    super("Header", value, options);
  }
  toHtml() {
    const { tag = "h2" } = this.options || {};
    return `
      <div className="row">
        <div className="col-sm">
          <${tag}>${this.value}</${tag}>
        </div>
      </div>
    `;
  }
}