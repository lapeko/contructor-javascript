import { v4 } from "uuid";
import { Block } from "./src/blocks";
import { button, containerFluid, inputBlock, inputGroup, inputText, select } from "./src/utils";

const blockMap = { header: "Header", text: "Text", columns: "Columns", image: "Image" };
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
    const inputs = inputGroup([select(blockMap, `${this.id}-select`), button("Add", "btn btn-success", "add-new-block-btn")].join(""));
    return containerFluid(inputBlock(
      `<div class="d-flex justify-content-between mb-1">
        <h4 class="mb-0 mt-1">Block</h4>
        ${button("Delete last", "btn btn-danger", `${this.id}-delete`)}
      </div>`,
      inputs,
      `<div class="d-grid"/>
        ${button("Refresh site view", "btn btn-primary", `${this.id}-refresh`)}
      </div>`
    ));
  }
  subscribe() {
    console.log("LastForm Subscription");
  }
  reset() {
    this.options = undefined;
    this.value = undefined;
  }
}

class BlockForm extends Form {
  unsubscribe() {
    throw new Error("BlockForm.unsubscribe was not implemented");
  }
}

export class HeaderForm extends BlockForm {
  constructor() {
    super();
  }
  toHtml() {
    const inputs = [
      inputGroup(select(tagMap, `tag-${this.id}`)),
      inputGroup(inputText("Add your content", `content-${this.id}`)),
      inputGroup(inputText("Add you styles", `styles-${this.id}`)),
    ].join("");

    return containerFluid(inputBlock(`<h4>${blockMap.header}</h4>`, inputs));
  }
  subscribe() {
    const tagSelect = document.getElementById(`tag-${this.id}`);
    tagSelect.addEventListener("change", event => {
      event.preventDefault();
      console.log(event.target.value);
    })
  }
  unsubscribe() {

  }
  renderBlock() {

  }
}