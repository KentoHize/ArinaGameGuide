class Rule {

    Attribute;
    Value;

    constructor(attribute, value) {
        this.Attribute = attribute;
        this.Value = value;
    }

    print() { return `${this.Attribute}:${this.Value};` };
}

export { Rule };