import { Unity } from "./Unity.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.RecordHistoryPage(`Place`, id1, id2);

    function findPosition(position) {
        if (position == null)
            position = `None`;
        let target = Unity.Data.find(m => m.key == position);
        if (target == undefined) {
            target = { key: position, value: [] };
            Unity.Data.push(target);
        }
        return target;
    }

    //Creature Group
    let sdata = [];
    let stages = [0];
    let cg = (await import(`../Data/CreatureGroup.json`, { assert: { type: `json` } })).default;
    
    for (let i = 0; i < cg.length; i++) {
        if (cg[i].Place == id1) {
            sdata.push({ cg: cg[i], cgc: [] });
            if (cg[i].Stage != 0)
                if (!stages.includes(cg[i].Stage))
                    stages.push(cg[i].Stage);
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

    
    Unity.Data.sort((a, b) => Unity.SortPosition(a.key, b.key));
    stages.sort();
    ///Display
    DisplayDetail(`mainDiv`, id1, stages);
    
    

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

export function DisplayDetail(divID, id1, stages, stage = 0) {
    let parent;
    let child;
    let div = document.getElementById(divID);    
    div.innerHTML = ``;
    
    let t;    
    for (let i = 0; i < Unity.Data.length; i++) {
        if (Unity.Data[i].key == `None`)
            continue;
        t = document.createTextNode(Unity.Data[i].key);
        div.appendChild(t);
        for (let j = 0; j < Unity.Data[i].value.length; j++) {
            parent = document.createElement(`div`);
            if (Unity.Data[i].value[j].type == `CG` && Unity.Data[i].value[j].data.cg.Stage == stage) {
                parent.setAttribute(`class`, `divGroup1`);
                for (let k = 0; k < Unity.Data[i].value[j].data.cgc.length; k++) {
                    child = document.createElement(`div`);
                    child.textContent = Unity.Data[i].value[j].data.cgc[k].Creature;
                    parent.appendChild(child);
                }
            }
            else if (Unity.Data[i].value[j].type == `TS`) {
                parent.setAttribute(`class`, `divGroup1`);
                for (let k = 0; k < Unity.Data[i].value[j].data.isi.length; k++) {
                    child = document.createElement(`div`);
                    child.textContent = 'T ' + Unity.Data[i].value[j].data.isi[k].Item;
                    parent.appendChild(child);
                }
            }
            else if (Unity.Data[i].value[j].type == `TR`) {
                parent.textContent = Unity.Data[i].value[j].data.Type + `  DC:` + Unity.Data[i].value[j].data.DisarmDC;
            }
            div.appendChild(parent);
        }
    }

    let stageDiv = document.getElementById(`stageDiv`);
    stageDiv.innerHTML = ``;

    t = document.createTextNode(id1 + `  `);    
    stageDiv.appendChild(t);
    //StagePanel
    for (let i = 0; i < stages.length; i++) {
        let aDiv = document.createElement(`a`);
        aDiv.href = `javascript:;`;
        //aDiv.href = `javascript:DisplayDetail(\'${divID}\', \'${id1}\', [${stages}], ${i});`;        
        aDiv.textContent = i == 0 ? `S` : i;
        aDiv.setAttribute(`style`, `margin-right:5px`);
        aDiv.addEventListener(`click`, () => { DisplayDetail(divID, id1, stages, i) });
        stageDiv.appendChild(aDiv);
    }
}