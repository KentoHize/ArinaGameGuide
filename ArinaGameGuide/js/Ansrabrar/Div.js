import { Element } from "./Element.js";

class Div extends Element {

    constructor(id = null, elements = [], styles = [], width = null, height = null) {
        super(`div`, id, elements, styles, width, height);
    }
}

export { Div };