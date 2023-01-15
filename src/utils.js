export function row(content) {
  return `<div class="row">${content}</div>`;
};

export function col(content, classes) {
  const allClasses = `col${classes ? ` ${classes}` : ""}`
  return `<div class="${allClasses}">${content}</div>`;
};

export function container(content) {
  return `<div class="container">${content}</div>`;
}

export function containerFluid(content) {
  return `<div class="container-fluid">${content}</div>`;
}

export function inputBlock(header, content) {
  return `<div class="card p-1 pb-0 mb-2"><header>${header}</header>${content}</div>`;
}

export function inputGroup(content) {
  return `<div class="input-group mb-1">${content}</div>`;
}

export function inputText(placeholder, id, lastValue = "") {
  return `<input type="text" class="form-control" id="${id}" placeholder="${placeholder}" value="${lastValue}" />`;
}

export function select(optionsObject, id, lastValue) {
  const getHtmlOption = ([key, value]) => {
    let html = "<option ";
    if (lastValue === value) html += "selected "
    html += `value="${value}">${key}</option>`;
    return html;
  }

  const options = Object.entries(optionsObject).map(getHtmlOption).join('');
  return `<select class="form-select" id="${id}">${options}</select>`;
}

export function button(value, classes, id) {
  let html = "<button ";
  if (id) html += `id="${id}" `;
  html += `type="button" class="${classes}">${value}</button>`;
  return html;
};