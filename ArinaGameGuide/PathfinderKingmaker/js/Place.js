import { Unity } from "./Unity.js";

//export async function Test() {
//    let a = await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } });
//    let b = await import(`../Data/Trap.json`, { assert: { type: `json` } });
//    alert(b.default);
//}

export async function Initialize(div, id1, id2) {

    Unity.RecordHistoryPage(`Place`, id1, id2);
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
    let cg = (await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } })).default;
    
    for (let i = 0; i < cg.length; i++) {
        if (cg[i].Place == id1) {
            sdata.push({ cg: cg[i], cgc: [] });
        }
    }

    let cgc = (await import(`../Data/CreatureGroupCreature.json`, { assert: { type: `json` } })).default;
    for (let i = 0; i < cgc.length; i++) {
        let a = sdata.find(m => m.cg.Name == cgc[i].CreatureGroup);
        if (a != undefined)
            a.cgc.push(cgc[i]);
    }

    for (let i = 0; i < sdata.length; i++) {
        findPosition(sdata[i].cg.Position).value.push({ type: `CG`, data: sdata[i] });
    }

    //Treasure
    sdata = []
    let ts = (await import(`../Data/Treasure.json`, { assert: { type: `json` } })).default;
    for (let i = 0; i < ts.length; i++)
        if (ts[i].Place == id1)
            sdata.push({ ts: ts[i], is: {}, isi: []});

    let is = (await import(`../Data/ItemStack.json`, { assert: { type: `json` } })).default;
    let isi = (await import(`../Data/ItemStackItem.json`, { assert: { type: `json` } })).default;
    for (let i = 0; i < is.length; i++) {
        let a = sdata.find(m => m.ts.ItemStack == is[i].Name);
        if (a != undefined)
            a.is = is[i];
    }

    for (let i = 0; i < isi.length; i++) {
        let a = sdata.find(m => m.is.Name == isi[i].ItemStack)
        if (a != undefined)
            a.isi.push(isi[i]);
    }

    for (let i = 0; i < sdata.length; i++) {
        console.log(sdata[i].ts.Name + ' ' + sdata[i].is.Name);
        findPosition(sdata[i].ts.Position).value.push({ type: `TS`, data: sdata[i] });
    }     

    //Trap    
    let tr = (await import(`../Data/Trap.json`, { assert: { type: `json` } })).default;
    for (let i = 0; i < tr.length; i++)
        if (tr[i].Place == id1)
            findPosition(tr[i].Position).value.push({ type: `TR`, data: tr[i] });

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
            if (data[i].value[j].type == `CG`) {
                parent.setAttribute(`class`, `divGroup1`);
                for (let k = 0; k < data[i].value[j].data.cgc.length; k++) {
                    child = document.createElement(`div`);
                    child.textContent = data[i].value[j].data.cgc[k].Creature;
                    parent.appendChild(child);
                }
            }
            else if (data[i].value[j].type == `TS`) {
                parent.setAttribute(`class`, `divGroup1`);
                for (let k = 0; k < data[i].value[j].data.isi.length; k++) {
                    child = document.createElement(`div`);
                    child.textContent = 'T ' + data[i].value[j].data.isi[k].Item;                    
                    parent.appendChild(child);
                }
            }
            else {
                parent.textContent = data[i].value[j].data.Type + `  DC:` + data[i].value[j].data.DisarmDC;
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