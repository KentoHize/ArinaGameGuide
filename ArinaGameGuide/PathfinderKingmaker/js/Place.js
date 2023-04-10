import { Unity } from "./Unity.js";

//export async function Test() {
//    let a = await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } });
//    let b = await import(`../Data/Trap.json`, { assert: { type: `json` } });
//    alert(b.default);
//}

export async function Initialize(div, id1, id2) {
    Unity.HistoryPages.push({ page: `Place`, id1: id1, id2: id2 })

    let data = [];
    //Creature Group
    let m = await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } });
    let cg = m.default;
    for (let i = 0; i < cg.length; i++)
        if (cg[i].Place == id1)
            data.push(cg[i]);

    //Treasure
    m = await import(`../Data/Treasure.json`, { assert: { type: `json` } });
    let ts = m.default;
    for (let i = 0; i < ts.length; i++)
        if (ts[i].Place == id1)
            data.push(ts[i]);
    //Trap
    m = await import(`../Data/Trap.json`, { assert: { type: `json` } });
    let tr = m.default;
    for (let i = 0; i < tr.length; i++)
        if (tr[i].Place == id1)
            data.push(tr[i]);

    ///Display
    data.sort((a, b) => { return Unity.SortPosition(a.Position, b.Position); });
    let parent;
    for (let i = 0; i < data.length; i++) {
        if (i == 0 || data[i].Position != data[i - 1].Position) {
            if (data[i].Position != null && data[i].Position != `None`) {
                let t = document.createTextNode(data[i].Position);
                div.appendChild(t);
            }
            parent = document.createElement(`div`);
            div.appendChild(parent);
        }
        let child = document.createElement(`div`);
        let a = document.createElement(`a`);
        a.href = `#`;
        a.textContent = data[i].Name;
        //if (id2)
        //    a.addEventListener("click",
        //        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1], d[i][id2]));
        //else
        //    a.addEventListener("click",
        //        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1]));            
        child.appendChild(a);
        parent.appendChild(child);
    }
    ///Encounter
}