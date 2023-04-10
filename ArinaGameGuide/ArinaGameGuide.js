//var a = "./PathfinderKingmaker/Data/Place.json";
//import b from a assert {type: 'json'};
import { Doc, Div } from "./js/Ansrabrar.js";
import { Riana } from "./js/Characters/Heroes/Riana.js";

export function loadDataIndex(pageName, dataName, divID, document) {
    const div = document.getElementById(divID);
    let dataPath = "./" + pageName + "/Data/" + dataName + ".json";
    alert(dataPath);
    import(dataPath, { assert: { type: 'json' } }).then(
        m => {
            let d = m.default;
            let doc = new Doc();

            for (let i = 0; i < d.length; i++) {
                let a = Riana.CreateDiv(doc, null, null, null, false, false, doc);
                Riana.CreateText(d[i].Name, a);
            }
            doc.printTo(document, div);         
        }
    );
}

export function loadPage(pageName, divID) {
    var div = document.getElementById(divID);
    //var PData, BRData;
    //var divMain = document.getElementById("main");
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'html';
    xhttp.open("GET", pageName + ".html?v=" + Math.random(), true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var bodyContent = this.response.substring(this.response.indexOf("<body>") + 6);
            bodyContent = bodyContent.substring(0, bodyContent.lastIndexOf("</body>"));
            alert(bodyContent);
            div.innerHTML = bodyContent;
        }
    }
    xhttp.send();
}