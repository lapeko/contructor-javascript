import { HeaderForm, LastForm } from "./forms";

const forms = [
  new HeaderForm(),
];
const lastForm = new LastForm();

export const inputs = [...forms, lastForm];
