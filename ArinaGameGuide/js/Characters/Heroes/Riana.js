import { Aritiafel } from "../../Aritiafel.js"
import { Doc, Div, Style, Rule, Text } from "../../Ansrabrar.js"
class Riana {

    static FloatStyle = new Style(`Float`, [new Rule(`float`, `left`)]);
    static BorderStyle = new Style(`Border`, [new Rule(`border-style`, `solid`),
        new Rule(`border-width`, `1px`), new Rule(`box-sizing`, `border-box`)]);

    static CreateDiv(doc, id, width, height, border = false, float = false, parent = null, ...styles) {
        const result = new Div(id);
        let style = doc.createStyle(id);
        style.addRule(`width`, `${width}px`);
        style.addRule(`height`, `${height}px`);        
        if (float)
            result.Styles.push(this.FloatStyle);
        if (border)
            result.Styles.push(this.BorderStyle);        
        if (parent != null)
            parent.Elements.push(result);
        for (let i = 0; i < styles.length; i++)
            result.Styles.push(styles[i]);
        result.Styles.push(style);
        return result;
    }

    static CreateText(value, parent = null) {
        const result = new Text(value);
        if (parent != null)
            parent.Elements.push(result);        
        return result;
    }
}

if (Aritiafel.Characters == null)
    Aritiafel.Characters = {};
if (Aritiafel.Characters.Heroes == null)
    Aritiafel.Characters.Heroes = {};
Aritiafel.Characters.Heroes.Riana = Riana;

export { Riana };