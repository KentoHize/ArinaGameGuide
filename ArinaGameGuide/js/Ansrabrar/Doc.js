import { Style } from "./Style.js"
import { Element } from "./Element.js"
import { Text } from "./Text.js"

class Doc {

    Elements;
    Styles;

    constructor(elements = [], styles = []) {
        this.Elements = elements;
        this.Styles = styles;
    }

    loadJSON(styles, elements) {

        this.Elements = [];
        this.Styles = [];

        for (let i = 0; i < styles.length; i++) {
            let newStyle = new Style(styles[i].name);
            for (let j = 0; j < styles[i].rules.length; j++)
                newStyle.addRule(styles[i].rules[j].attr, styles[i].rules[j].val);            
            this.Styles.push(newStyle);
        }

        const loadElements = function(elements, styles) {
            let result = []

            if (elements.length == 1 && typeof elements[0] == `string`) {                
                result.push(new Text(elements[0]));
                return result;
            }
                
            for (let i = 0; i < elements.length; i++) {

                let newElement = new Element(elements[i].type, null, [], [], null, null);

                if (elements[i].className != null && elements[i].className != ``) {
                    let classes = elements[i].className.split(` `);
                    let style = null;
                    for (let j = 0; j < classes.length; j++) {
                        style = styles.find(m => m.Name == classes[j]);
                        if (style != null)
                            newElement.Styles.push(style);
                    }
                }

                if (elements[i].id != null)
                    newElement.ID = elements[i].id;
                if (elements[i].height != null)
                    newElement.Height = elements[i].height;
                if (elements[i].width != null)
                    newElement.Width = elements[i].width;
                if (elements[i].content != null)
                    newElement.Elements = loadElements(elements[i].content, styles);
                result.push(newElement);
            }
            return result;
        }

        this.Elements = loadElements(elements, this.Styles);
    }

    createStyle(name) {
        var style = new Style(name);
        this.Styles.push(style);
        return style;
    }

    removeStyle(name) {
        this.Styles = this.Styles.filter(item => item.Name !== name);
    }

    printTo(document, root = null) {
        if (this.Styles != null && this.Styles.length != 0) {
            let styleSheet = document.getElementsByTagName(`style`);
            if (styleSheet.length == 0) {
                styleSheet = document.createElement(`style`);
                styleSheet.type = `text/css`;
                document.getElementsByTagName(`head`)[0].appendChild(styleSheet);
            }
            for (let i = 0; i < this.Styles.length; i++)
                document.styleSheets[0].insertRule(this.Styles[i].printAsClassSelector(), 0);
        }
        if (this.Elements.length != 0) {
            if (root == null)
                root = document.getElementsByTagName(`body`)[0];
            for (let i = 0; i < this.Elements.length; i++)
                root.appendChild(this.Elements[i].getObject(document));
        }   
    }
}

export { Doc };