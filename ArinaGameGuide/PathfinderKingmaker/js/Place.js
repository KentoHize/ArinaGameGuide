import { Unity } from "./Unity.js";

//export async function Test() {
//    let a = await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } });
//    let b = await import(`../Data/Trap.json`, { assert: { type: `json` } });
//    alert(b.default);
//}

export async function Initialize(div, id1, id2) {
    
    Unity.RecordHistoryPage(`Place`, id1, id2);
    alert(Unity.HistoryPages.length);
    let data = [];

    function findPosition(position) {
        if (position == null)
            position = `None`;
        let target = data.find(m => m.key == position);
        if (target == undefined) {
            target = { key: position, value: [] };
            data.push(target);
        }
        return target;
    }

    //Creature Group
    let sdata = [];
    let m = await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } });
    let cg = m.default;
    for (let i = 0; i < cg.length; i++) {
        if (cg[i].Place == id1) {
            sdata.push({ cg: cg[i], cgc: [] });
        }
    }

    let n = await import(`../Data/CreatureGroupCreature.json`, { assert: { type: `json` } });
    let cgc = n.default;

    for (let i = 0; i < cgc.length; i++) {
        let a = sdata.find(m => m.cg.Name == cgc[i].CreatureGroup);
        if (a != undefined)
            a.cgc.push(cgc[i]);
    }
    
    for (let i = 0; i < sdata.length; i++) {          
        findPosition(sdata[i].cg.Position).value.push({ type: `CG`, data: sdata[i] });
    }

    //Treasure
    //m = await import(`../Data/Treasure.json`, { assert: { type: `json` } });
    //let ts = m.default;
    //for (let i = 0; i < ts.length; i++)
    //    if (ts[i].Place == id1)
    //        data.push(ts[i]);
    //Trap
    //m = await import(`../Data/Trap.json`, { assert: { type: `json` } });
    //let tr = m.default;
    //for (let i = 0; i < tr.length; i++)
    //    if (tr[i].Place == id1)
    //        data.push(tr[i]);

    ///Display
    data.sort((a, b) => Unity.SortPosition(a.key, b.key));
    let parent;
    let child;
    let child2;
    let t;
    //alert(data.length);
    for (let i = 0; i < data.length; i++) {
        if (data[i].key == `None`)
            continue;
        t = document.createTextNode(data[i].key);
        div.appendChild(t);
        for (let j = 0; j < data[i].value.length; j++) {
            parent = document.createElement(`div`);            
            parent.setAttribute(`class`, `divGroup1`);
            if (data[i].value[j].type == `CG`) {
                for (let k = 0; k < data[i].value[j].data.cgc.length; k++) {
                    child = document.createElement(`div`);
                    child.textContent = data[i].value[j].data.cgc[k].Creature;                    
                    //parent.textContent += data[i].value[j].data.cgc[k].Creature;
                    parent.appendChild(child);
                }
            }
            div.appendChild(parent);
        }
    }
    //    if (i == 0 || data[i].Position != data[i - 1].Position) {
    //        if (data[i].Position != null && data[i].Position != `None`) {
    //            let t = document.createTextNode(data[i].Position);
    //            div.appendChild(t);
    //        }
    //        parent = document.createElement(`div`);
    //        div.appendChild(parent);
    //    }
    //    let child = document.createElement(`div`);
    //    let a = document.createElement(`a`);
    //    a.href = `#`;
    //    a.textContent = data[i].Name;
    //    //if (id2)
    //    //    a.addEventListener("click",
    //    //        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1], d[i][id2]));
    //    //else
    //    //    a.addEventListener("click",
    //    //        () => loadDataContent(contentDiv, pageName, dataName, d[i][id1]));            
    //    child.appendChild(a);
    //    parent.appendChild(child);
    //}
    ///Encounter
}