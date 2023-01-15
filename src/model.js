import SomeImage from "./assets/some-image.jpeg";
import { Columns, Header, Image, Text } from './blocks';

export const content = [
  new Header("Javascript Constructor"),
  new Text("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas mollitia ratione, a nobis facere dolorem corporis earum repellat repellendus voluptatem."),
  new Columns([
    "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    "Est voluptate nulla commodi recusandae maxime modi.",
    "Tempora expedita aliquid maxime temporibus culpa atque.",
  ]),
  new Image(SomeImage),
];