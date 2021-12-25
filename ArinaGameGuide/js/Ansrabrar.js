import { Aritiafel } from "./Aritiafel.js"
import { Div } from "./Ansrabrar/Div.js"
import { Style } from "./Ansrabrar/Style.js"
import { Rule } from "./Ansrabrar/Rule.js"
import { Doc } from "./Ansrabrar/Doc.js"
import { Text } from "./Ansrabrar/Text.js"

Aritiafel.Ansrabrar = {};
Aritiafel.Ansrabrar.Div = Div;
Aritiafel.Ansrabrar.Style = Style;
Aritiafel.Ansrabrar.Rule = Rule;
Aritiafel.Ansrabrar.Doc = Doc;
Aritiafel.Ansrabrar.Text = Text;

export { Aritiafel, Doc, Div, Style, Rule, Text };

//Usage Example
/*
        import { Doc, Div } from "./js/Ansrabrar.js";
        let doc = new Doc();

        let style1 = doc.createStyle(`testS`);
        style1.addRule(`background-color`, `red`);
        style1.addRule(`width`, `500px`);
        style1.addRule(`height`, `300px`);
        style1.addRule(`border-style`, `solid`);
        style1.addRule(`border-width`, `20px`);

        let d = new Div();
        d.Styles.push(style1);
        d.ID = `ab`;
        doc.Content = d;

        document.addEventListener("DOMContentLoaded", function (event) {
            doc.printTo(document);
        });
*/
/*
 
       let htmlStyles =
            [{
                name:`testS`,
                rules:[
                    { attr:`background-color`, val:`red` },
                    { attr:`width`, val:`500px` },
                    { attr:`height`, val:`300px` },
                ]
            },
                {
                    name:`testA`,
                    rules:[
                        { attr:`background-color`, val:`yellow` },
                        { attr:`width`, val:`200px` },
                        { attr:`height`, val:`200px` },
                    ]
                },
            ];

        let htmlDOMs =
            [{
                id:`ab`,
                type:`div`,
                className:`testS`,
                content:[{
                    id:'bc',
                    type:`div`,
                    className:`testA`,
                    content: [ `abc` ]
                }]
            },
                {
                    id:`ac`,
                    type: `div`,
                    className: `testS`,
                    content: [ `abcdef`]
                }
            ];

        doc.loadJSON(htmlStyles, htmlDOMs);
        document.addEventListener("DOMContentLoaded", function (event) {
            doc.printTo(document);
        });
 */