import { Element } from "./Element.js";

class Text extends Element {

    Value;

    constructor(value = ``) {
        super(`text`);
        this.Value = value;      
    }

    getObject(document) {
        return document.createTextNode(this.Value);
    }
}

export { Text };