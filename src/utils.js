export function row(content) {
  return `<div class="row">${content}</div>`;
};

export function col(content) {
  return `<div class="col">${content}</div>`;
};

export function container(content) {
  return `<div class="container">${content}</div>`;
}

export function containerFluid(content) {
  return `<div class="container-fluid">${content}</div>`;
}

export function inputBlock(header, content, footer) {
  let html = '<div class="card p-1 mb-2">';
  html += `<header>${header}</header>`;
  html += content;
  if (footer) html += `<footer>${footer}</footer>`;
  html += '</div>';
  return html;
}

export function inputGroup(content) {
  return `<div class="input-group mb-1">${content}</div>`;
}

export function inputText(placeholder, id) {
  return `<input type="text" class="form-control" id="${id}" placeholder="${placeholder}" />`;
}

export function select(optionsObject, id) {
  const getHtmlOption = ([key, value]) => `<option value="${value}">${key}</option>`;
  const options = Object.entries(optionsObject).map(getHtmlOption).join('');
  return `<select class="form-select" id="${id}">${options}</select>`;
}

export function button(value, classes, id) {
  let html = "<button ";
  if (id) html += `id="${id}" `;
  html += `type="button" class="${classes}">${value}</button>`;
  return html;
};