import { Style } from "./Style.js"

class Element {

    ID;
    #Type;
    Width;
    Height;
    Styles;
    Elements;

    constructor(type, id = null, elements = [], styles = [], width = null, height = null) {
        this.#Type = type;
        this.ID = id;
        this.Elements = elements;
        this.Styles = styles;
        this.Width = width;
        this.Height = height;
    }

    getObject(document) {      
            
        const element = document.createElement(this.#Type);
        let styleStr = ``;
        if (this.ID != null && this.ID != ``)
            element.id = this.ID;
        if (this.Styles != null && this.Styles.length != 0)
            element.className = Style.printClassName(this.Styles);

        //確認有沒有需要調整的Width和Height
        //let bw = Style.getRuleByNameFromStyles(this.Styles, `border-width`);        
        //if (bw != null) {
        //    let w = Style.getRuleByNameFromStyles(this.Styles, `width`);
        //    let h = Style.getRuleByNameFromStyles(this.Styles, `height`);

        //    //To Do
        //    //px em等單位處理
        //    //border-left-width等特殊處理
        //    if (bw.Value.includes(`px`)) {
        //        if (this.Width == null)
        //            this.Width = w.Value.split(`px`)[0] - bw.Value.split(`px`)[0] * 2 + `px`;
        //        if (this.Height == null)
        //            this.Height = h.Value.split(`px`)[0] - bw.Value.split(`px`)[0] * 2 + `px`;
        //    }
        //}
        if (this.Width != null)
            styleStr += ` width:${this.Width};`;
        if (this.Height != null)
            styleStr += ` height:${this.Height};`;
        if (styleStr != ``)
            element.style = styleStr;        
        if (this.Elements.length != 0) 
            for (let i = 0; i < this.Elements.length; i++)
                element.appendChild(this.Elements[i].getObject(document));            
        return element;
    }

}

export { Element };