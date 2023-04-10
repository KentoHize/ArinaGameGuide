//import { Doc, Div } from "./js/Ansrabrar.js";
//import { Riana } from "./js/Characters/Heroes/Riana.js";

function getDataPath(pageName, dataName) {
    return "./" + pageName + "/Data/" + dataName + ".json";
}

export function loadDataIndex(document, indexDiv, contentDiv, pageName, dataName, id1, id2, nameId) {
    import(getDataPath(pageName, dataName), { assert: { type: 'json' } }).then(
        m => {
            let d = m.default;
            //let doc = new Doc();
            indexDiv.innerHTML = ``;
            for (let i = 0; i < d.length; i++) {
                let child = document.createElement(`div`);
                let a = document.createElement(`a`);
                a.href = `javascript:;`;
                a.textContent = d[i][nameId];
                if (id2)
                    a.addEventListener("click",
                        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1], d[i][id2]));
                else
                    a.addEventListener("click",
                        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1]));
                child.appendChild(a);
                indexDiv.appendChild(child);
                //let a = Riana.CreateDiv(doc, null, null, null, false, false, doc);
                //Riana.CreateText(d[i].Name, a);
            }

            //doc.printTo(document, div);         
        });
}

export function loadDataContent(div, pageName, dataName, id1, id2 = null) {    
    let pageParams = `id1=` + id1;
    if (id2)
        pageParams += `&id2=` + id2;
    pageParams += "$v=" + Math.random();
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'text';
    xhttp.open("GET", `./` + dataName + ".html?" + pageParams, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var bodyContent = this.response.substring(this.response.indexOf("<body>") + 6);
            bodyContent = bodyContent.substring(0, bodyContent.lastIndexOf("</body>"));
            div.innerHTML = bodyContent;
            import(`./` + pageName + `/js/` + dataName + `.js`).then(m => { m.Initialize(div, id1, id2); });
        }
    }
    xhttp.send();
}

