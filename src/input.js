import { blockMap, ColumnsForm, HeaderForm, ImageForm, LastForm, TextForm } from "./forms";

class Inputs {
  constructor() {
    this.forms = [new LastForm()];
  }
  add = (formType) => {
    let form;
    switch (formType) {
      case blockMap.header: form = new HeaderForm(); break;
      case blockMap.text: form = new TextForm(); break;
      case blockMap.columns: form = new ColumnsForm(); break;
      case blockMap.image: form = new ImageForm(); break;
    }
    this.forms.splice(-1, 0, form);
  }
  delete = () => {
    if (this.forms.length <= 1) return;
    this.forms.splice(-2, 1);
  }
  get = () => this.forms
}

const inputs = new Inputs();
export { inputs };