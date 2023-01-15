import { v4 } from "uuid";
import { Block, Columns, Header, Image, Text } from "./blocks";
import { button, containerFluid, inputBlock, inputGroup, inputText, select } from "./utils";
import { app } from '.';
import { inputs } from "./input";

export const blockMap = { header: "Header", text: "Text", columns: "Columns", image: "Image" };
const tagMap = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6" };

class Form extends Block {
  constructor(value, options) {
    super(value ?? "", options);
    this.id = v4();
  }
  toHtml() {
    throw new Error("Form.toHtml was not implemented");
  }
  subscribe() {
    throw new Error("BlockForm.subscribe was not implemented");
  }
}

export class LastForm extends Form {
  constructor() {
    super();
  }
  toHtml() {
    const inputs = inputGroup([select(blockMap, `select-${this.id}`, this.value), button("Add", "btn btn-success", "add-block-btn")].join(""));
    return containerFluid(inputBlock(
      `<div class="d-flex justify-content-between mb-1">
        <h4 class="mb-0 mt-1">Block</h4>
        ${button("Delete last", "btn btn-danger", `delete-block-btn`)}
      </div>`,
      inputs,
    ));
  }
  subscribe = () => {
    const ids = ["delete-block-btn", "add-block-btn"];
    const deleteBlock = () => {
      inputs.delete();
      app.refresh();
    };
    const addBlock = () => {
      const select = document.getElementById(`select-${this.id}`);
      inputs.add(select.value);
      app.refresh();
    };
    const handlers = [deleteBlock, addBlock];
    handlers.map((handler, index) => {
      const $button = document.getElementById(ids[index]);
      $button.addEventListener('click', handler);
    });
    const select = document.getElementById(`select-${this.id}`);
    select.addEventListener("change", ({ target }) => {
      this.value = target.value;
    });
  }
}

class BlockForm extends Form {
  renderBlock() {
    throw new Error("BlockForm.renderBlock was not implemented");
  }
}

export class HeaderForm extends BlockForm {
  constructor() {
    super("");
  }

  toHtml() {
    const inputs = [
      inputGroup(select(tagMap, `tag-${this.id}`, this.options?.tag)),
      inputGroup(inputText("Add your content", `content-${this.id}`, this.value)),
      inputGroup(inputText("Add you styles", `styles-${this.id}`, this.options?.styles)),
    ].join("");

    return containerFluid(inputBlock(`<h4>${blockMap.header}</h4>`, inputs));
  }

  subscribe() {
    if (!this.options) this.options = {};
    if (!this.options.tag) this.options.tag = tagMap.h1;

    const tagSelect = document.getElementById(`tag-${this.id}`);
    tagSelect.addEventListener("change", ({ target }) => {
      this.options.tag = target.value;
      app.refresh();
    });

    const contentInput = document.getElementById(`content-${this.id}`);
    contentInput.addEventListener("change", ({ target }) => {
      this.value = target.value;
      app.refresh();
    });

    const stylesInput = document.getElementById(`styles-${this.id}`);
    stylesInput.addEventListener("change", ({ target }) => {
      this.options.styles = target.value;
      app.refresh();
    });
  }

  renderBlock() {
    return new Header(this.value, { tag: this.options?.tag, styles: this.options?.styles });
  }
}

export class TextForm extends BlockForm {
  constructor() {
    super();
  }

  toHtml() {
    const inputs = [
      inputGroup(inputText("Add your content", `content-${this.id}`, this.value)),
      inputGroup(inputText("Add you styles", `styles-${this.id}`)),
    ].join("");

    return containerFluid(inputBlock(`<h4>${blockMap.text}</h4>`, inputs));
  }

  subscribe() {
    if (!this.options) this.options = {};

    const contentInput = document.getElementById(`content-${this.id}`);
    contentInput.addEventListener("change", ({ target }) => {
      this.value = target.value;
      app.refresh();
    });

    const stylesInput = document.getElementById(`styles-${this.id}`);
    stylesInput.addEventListener("change", ({ target }) => {
      this.options.styles = target.value;
      app.refresh();
    });
  }

  renderBlock() {
    return new Text(this.value, { styles: this.options?.styles });
  }
}

export class ColumnsForm extends BlockForm {
  constructor() {
    super([""]);
  }
  toHtml() {
    const inputs = [
      this.value.map((column, index) => inputGroup(inputText(`Add column-${index + 1} content`, `content-${this.id}-${index}`, column))).join(""),
      inputGroup(inputText("Add you styles", `styles-${this.id}`)),
      inputGroup(`<div class="d-flex justify-content-between flex-grow-1">${[
        button("Add", "btn btn-success", `add-column-${this.id}`),
        button("Delete", "btn btn-danger", `delete-column-${this.id}`),
      ].join("")}</div>`),
    ].join("");

    return containerFluid(inputBlock(`<h4>${blockMap.columns}</h4>`, inputs));
  }

  subscribe() {
    if (!this.options) this.options = {};

    const addButton = document.getElementById(`add-column-${this.id}`);
    addButton.addEventListener("click", () => {
      this.value.push("");
      app.refresh();
    });

    const deleteButton = document.getElementById(`delete-column-${this.id}`);
    deleteButton.addEventListener("click", () => {
      this.value.pop();
      app.refresh();
    });

    this.value.forEach((_, index) => {
      const $column = document.getElementById(`content-${this.id}-${index}`);
      $column.addEventListener("change", ({ target }) => {
        this.value[index] = target.value;
        app.refresh();
      })
    })

    const stylesInput = document.getElementById(`styles-${this.id}`);
    stylesInput.addEventListener("change", ({ target }) => {
      this.options.styles = target.value;
      app.refresh();
    });
  }

  renderBlock() {
    return new Columns(this.value, { styles: this.options?.styles });
  }
}

export class ImageForm extends BlockForm {
  constructor() {
    super();
  }
  toHtml() {
    const inputs = [
      inputGroup(inputText("Name of your image: eg. some-image.jpeg", `image-name-${this.id}`, this.value.split("/")[2])),
      inputGroup(inputText("Add you styles", `styles-${this.id}`)),
    ].join("");

    return containerFluid(inputBlock(`<h4>${blockMap.image}</h4>`, inputs));
  }

  subscribe() {
    if (!this.options) this.options = {};

    const imageNameInput = document.getElementById(`image-name-${this.id}`);
    imageNameInput.addEventListener("change", ({ target }) => {
      this.value = `/assets/${target.value}`;
      app.refresh();
    });

    const stylesInput = document.getElementById(`styles-${this.id}`);
    stylesInput.addEventListener("change", ({ target }) => {
      this.options.styles = target.value;
      app.refresh();
    });
  }

  renderBlock() {
    return new Image(this.value, { styles: this.options?.styles });
  }
}