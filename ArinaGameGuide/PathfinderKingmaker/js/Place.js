import { Unity } from "./Unity.js";
import { loadDataContent } from "../../js/ArinaGameGuide.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.DataMain = {};
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Place`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;

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

    //Debug Script    
    let pl = (await fetch(`Data/Place.json${Unity.GetRandomString()}`).then(m => m.json()));
    let cg = (await fetch(`Data/CreatureGroup.json${Unity.GetRandomString()}`).then(m => m.json()));
    let cgc = (await fetch(`Data/CreatureGroupCreature.json${Unity.GetRandomString()}`).then(m => m.json()));
    let ts = (await fetch(`Data/Treasure.json${Unity.GetRandomString()}`).then(m => m.json()));
    let is = (await fetch(`Data/ItemStack.json${Unity.GetRandomString()}`).then(m => m.json()));
    let isi = (await fetch(`Data/ItemStackItem.json${Unity.GetRandomString()}`).then(m => m.json()));
    let tr = (await fetch(`Data/Trap.json${Unity.GetRandomString()}`).then(m => m.json()));
    let eocsc = (await fetch(`Data/EffectOrConditionSetEffectOrCondition.json${Unity.GetRandomString()}`).then(m => m.json()));
    Unity.DataMain = pl.find(m => m.Name == id1);

    //Creature Group
    let sdata = [];
    let stages = [0];
    
    
    for (let i = 0; i < cg.length; i++) {
        if (cg[i].Place == id1) {
            sdata.push({ cg: cg[i], cgc: [] });
            if (cg[i].Stage != 0)
                if (!stages.includes(cg[i].Stage))
                    stages.push(cg[i].Stage);
        }
    }

    
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
    
    for (let i = 0; i < ts.length; i++)
        if (ts[i].Place == id1)
            sdata.push({ ts: ts[i], is: {}, isi: []});

    
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

    for (let i = 0; i < sdata.length; i++)         
        findPosition(sdata[i].ts.Position).value.push({ type: `TS`, data: sdata[i] });

    //Trap    
    
    for (let i = 0; i < tr.length; i++)
        if (tr[i].Place == id1)
            findPosition(tr[i].Position).value.push({ type: `TR`, data: tr[i] });

    
    Unity.Data.sort((a, b) => Unity.SortPosition(a.key, b.key));
    stages.sort();
    Unity.Data2 = eocsc;
    //Display
    DisplayDetail(div, `mainDiv`, id1, stages);
}

export function DisplayDetail(mdiv, divID, id1, stages, stage = 0) {
    let parent, child, child2, t, t2;
    
    let div = document.getElementById(divID);    
    let s = ``;
    div.innerHTML = ``;

    for (let i = 0; i < Unity.Data.length; i++) {
        let haveStuff = 0;
        if (Unity.Data[i].key == `None`)
            continue;        
        t = document.createTextNode(Unity.Data[i].key);
        div.appendChild(t);
        
        for (let j = 0; j < Unity.Data[i].value.length; j++) {
            parent = document.createElement(`div`);
            if (Unity.Data[i].value[j].type == `CG` && Unity.Data[i].value[j].data.cg.Stage == stage) {
                haveStuff = 1;
                parent.setAttribute(`class`, `divGroup1`);
                for (let k = 0; k < Unity.Data[i].value[j].data.cgc.length; k++) {
                    child = document.createElement(`div`);
                    if (Unity.Data[i].value[j].data.cgc[k].Team == `Ally`)
                        child.appendChild(document.createTextNode(`Ally `));
                    child2 = document.createElement(`a`);
                    child2.href = `javascript:;`;
                    child2.addEventListener(`click`, () => { loadDataContent(mdiv, Unity.PageName, 'Creature', Unity.Data[i].value[j].data.cgc[k].Creature); });
                    if (Unity.Data[i].value[j].data.cgc[k].DisplayName == null)
                        child2.textContent = `${Unity.Data[i].value[j].data.cgc[k].Creature}`
                    else
                        child2.textContent = `${Unity.Data[i].value[j].data.cgc[k].Creature}(${ Unity.Data[i].value[j].data.cgc[k].DisplayName })`;
                    child.appendChild(child2);
                    if (Unity.Data[i].value[j].data.cgc[k].AdditionalEffectOrConditions != null) {
                        for (let l = 0; l < Unity.Data2.length; l++) {
                            if (Unity.Data[i].value[j].data.cgc[k].AdditionalEffectOrConditions == Unity.Data2[l].EffectOrConditionSet) {
                                child.appendChild(document.createTextNode(`(${Unity.Data2[l].EffectOrCondition})`));
                            }
                        }
                    }
                    if (Unity.Data[i].value[j].data.cgc[k].Quantity != 1) {
                        t2 = document.createTextNode(` x${Unity.Data[i].value[j].data.cgc[k].Quantity}`);
                        child.appendChild(t2);
                    }
                    parent.appendChild(child);
                }
            }
            else if (Unity.Data[i].value[j].type == `TS`) {
                haveStuff = 1;
                parent.setAttribute(`class`, `divGroup1`);
                s = ``;
                if (Unity.Data[i].value[j].data.ts.Importance != null)
                    s += `Quality:${Unity.Data[i].value[j].data.ts.Importance} `;
                if (Unity.Data[i].value[j].data.ts.PerceptionDC != null)
                    s += `Perception:${Unity.Data[i].value[j].data.ts.PerceptionDC} `;
                if (Unity.Data[i].value[j].data.ts.TrapDC != null)
                    s += `Disarm Trap:${Unity.Data[i].value[j].data.ts.TrapDC} `;
                if (Unity.Data[i].value[j].data.ts.LockDC != null)
                    s += `Lock:${Unity.Data[i].value[j].data.ts.LockDC} `;
                if(s == ``)
                    parent.appendChild(document.createTextNode(`${Unity.Data[i].value[j].data.ts.Type} Treasure`));
                else
                    parent.appendChild(document.createTextNode(`${Unity.Data[i].value[j].data.ts.Type} Treasure (${s})`));
                parent.appendChild(document.createElement(`br`));
                for (let k = 0; k < Unity.Data[i].value[j].data.isi.length; k++) {
                    child = document.createElement(`div`);
                    
                    //child.appendChild(document.createTextNode('T '));
                    let a = document.createElement(`a`);
                    a.href = `javascript:;`;
                    a.addEventListener(`click`, () => loadDataContent(mdiv, Unity.PageName, `Item`, Unity.Data[i].value[j].data.isi[k].Item));
                    a.textContent = Unity.Data[i].value[j].data.isi[k].Item;                    
                    child.appendChild(a);
                    if (Unity.Data[i].value[j].data.isi[k].Quantity != 1)
                        child.appendChild(document.createTextNode(` x${Unity.Data[i].value[j].data.isi[k].Quantity}`));
                    
                    parent.appendChild(child);
                }
            }
            else if (Unity.Data[i].value[j].type == `TR`) {
                parent.appendChild(document.createTextNode('Trap'));
                parent.appendChild(document.createElement(`br`));
                haveStuff = 1;
                if (Unity.Data[i].value[j].data.DisarmDC == null)
                    parent.textContent = Unity.Data[i].value[j].data.Type;
                else
                    parent.textContent = Unity.Data[i].value[j].data.Type + `  DC:` + Unity.Data[i].value[j].data.DisarmDC;
            }            
            div.appendChild(parent);
        }
        if (haveStuff == 0)
            t.remove();
    }
    //Memo
    if (Unity.DataMain.Memo != ``) {
        div.appendChild(document.createTextNode(`Memo`));
        parent = document.createElement(`div`);
        parent.innerHTML = Unity.DataMain.Memo.replace(`\n`, `<br />`);
        div.appendChild(parent);
    }
    

    //StagePanel
    let stageDiv = document.getElementById(`stageDiv`);
    stageDiv.innerHTML = ``;

    t = document.createElement(`h`);
    t.textContent = id1 + ` `;    
    stageDiv.appendChild(t);
    
    for (let i = 0; i < stages.length; i++) {
        let aDiv = document.createElement(`a`);
        aDiv.href = `javascript:;`;        
        aDiv.textContent = i == 0 ? `S` : stages[i];
        aDiv.setAttribute(`style`, `margin-right:5px`);
        aDiv.addEventListener(`click`, () => { DisplayDetail(mdiv, divID, id1, stages, stages[i]) });
        stageDiv.appendChild(aDiv);
    }
}