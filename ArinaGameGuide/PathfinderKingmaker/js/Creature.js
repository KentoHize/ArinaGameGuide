import { Unity } from "./Unity.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.DataMain = {};
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Creature`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;

    let ct = (await import(`../Data/Creature.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let c = ct.find(m => m.Name == id1);

    let classString = ``;
    if (c.Class1 != null)
        classString += c.Class1 + ` ` + c.Class1Level;
    if (c.Class2 != null)
        classString += `<br />` + c.Class2 + ` ` + c.Class2Level;
    if (c.Class3 != null)
        classString += `<br />` + c.Class3 + ` ` + c.Class3Level;
    if (c.Class4 != null)
        classString += `<br />` + c.Class4 + ` ` + c.Class4Level;
    if (c == null)
        return;//to do
    

    document.getElementById(`creatureName`).textContent = c.Name;    
    document.getElementById(`displayName`).textContent = c.DisplayName;
    document.getElementById(`race`).textContent = c.Race;
    document.getElementById(`alignment`).textContent = Unity.GetAlginmentAcronym(c.Alignment);
    document.getElementById(`size`).textContent = c.Size;
    document.getElementById(`speed`).textContent = c.Speed;
    document.getElementById(`initiative`).textContent = c.Initiative;
    document.getElementById(`class`).innerHTML = classString;
    document.getElementById(`str`).textContent = c.Strength;
    document.getElementById(`dex`).textContent = c.Dexterity;
    document.getElementById(`con`).textContent = c.Constitution;
    document.getElementById(`int`).textContent = c.Intelligence;
    document.getElementById(`wis`).textContent = c.Wisdom;
    document.getElementById(`cha`).textContent = c.Charisma;
    document.getElementById(`hp`).textContent = c.Hitpoint;
    document.getElementById(`exp`).textContent = c.Exp;
    document.getElementById(`ac`).textContent = c.AC;
    document.getElementById(`ffac`).textContent = c[`Flat-FootedAC`];
    document.getElementById(`touchAC`).textContent = c.TouchAC;
    document.getElementById(`fortitude`).textContent = c.Fortitude;
    document.getElementById(`reflex`).textContent = c.Reflex;
    document.getElementById(`will`).textContent = c.Will;
    document.getElementById(`bab`).textContent = c.BaseAttackBonus;
    document.getElementById(`cmb`).textContent = c.CombatManeuverBonus;
    document.getElementById(`cmd`).textContent = c.CombatManeuverDefense;
    document.getElementById(`sr`).textContent = c.SpellResistance == null ? `-` : c.SpellResistance;


    let ctab = (await import(`../Data/CreatureAbilities.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let cta = (await import(`../Data/CreatureAttacks.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let ctda = (await import(`../Data/CreatureDamageAdjustment.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let ctec = (await import(`../Data/CreatureEffectorCondition.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let ctim = (await import(`../Data/CreatureImmunities.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let cts = (await import(`../Data/CreatureSkills.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let is = (await import(`../Data/ItemStack.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let isi = (await import(`../Data/ItemStackItem.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    
    let eocsc = (await import(`../Data/EffectOrConditionSetEffectOrCondition.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    

    let ed = document.getElementById(`abilityDiv`);
    let s = ``;
    for (let i = 0; i < ctab.length; i++) {
        if (ctab[i].Creature == id1)
            writeBlock(ed, `${ctab[i].Ability} ${ctab[i].Amount != null ? ctab[i].Amount : ``}`);
    }
    if (ed.textContent == ``)
        document.getElementById(`abilityTbl`).remove();

    ed = document.getElementById(`conditionDiv`)
    for (let i = 0; i < ctec.length; i++) {
        if (ctec[i].Creature == id1)
            writeBlock(ed, `${ctec[i].EffectOrCondition} ${ctec[i].Amount != null ? ctec[i].Amount : ``}`);
    }
    if (ed.textContent == ``)
        document.getElementById(`conditionTbl`).remove();

    ed = document.getElementById(`skillDiv`);
    for (let i = 0; i < cts.length; i++) {
        if (cts[i].Creature == id1) {
            writeBlock(ed, `${cts[i].Skill} ${cts[i].Bonus}`);
        }
    }

    let data = [];
    ed = document.getElementById(`dmgAdjustDiv`);
    for (let i = 0; i < ctda.length; i++) {
        if (ctda[i].Creature == id1) {
            data.push(ctda[i]);
        }
    }
    data.sort(compareDamageAdjustment);

    for (let i = 0; i < data.length; i++) {
        if (data[i].Type == `DamageReduction`)
            writeBlock(ed, `${data[i].Amount}/${data[i].DamageType}`);
        else if (data[i].Type == `Resistance`)
            writeBlock(ed, `${data[i].DamageType} ${data[i].Amount}`);
        else if (data[i].Type == `Immunity`)
            writeBlock(ed, `${data[i].DamageType}`);
        else if (data[i].Type == `Vulnerability`)
            writeBlock(ed, `Vulnerable to ${data[i].DamageType}`);
    }

    ed = document.getElementById(`immunityDiv`);
    for (let i = 0; i < ctim.length; i++) {
        if (ctim[i].Creature == id1) {
            if (ctim[i].Condition != null) {
                writeBlock(ed, `${ctim[i].Condition}`);
            }
            else {                

                for (let j = 0; j < eocsc.length; j++) {
                    if (ctim[i].ConditionGroup == eocsc[j].EffectOrConditionSet)
                        writeBlock(ed, `${eocsc[j].EffectOrCondition}`);
                }
            }   
        }
    }
    if (ed.textContent == ``)
        document.getElementById(`immunityTbl`).remove();
    //let tr = document.createElement(`tr`);
    //document.getElementById(`lSR`).parentElement.insertAdjacentElement(`afterend`, tr);
    ed = document.getElementById(`attackDiv`);
    for (let i = 0; i < cta.length; i++) {
        if (cta[i].Creature == id1) {
            if (cta[i].Weapon != null)
                writeBlock(ed, `${cta[i].Weapon}  ${cta[i].Range} ft. +${cta[i].AttackBonus}  ${cta[i].BasicDamage}${cta[i].DamageAdditiveBonus != null ? `+${cta[i].DamageAdditiveBonus}` : ''} ${cta[i].OtherDamageBonus != null ? cta[i].OtherDamageBonus : ''} ${cta[i].SneakDamage != null ? cta[i].SneakDamage : ``}`, 400);
            else
                writeBlock(ed, `${cta[i].Form}  ${cta[i].Range} ft. +${cta[i].AttackBonus}  ${cta[i].BasicDamage}${cta[i].DamageAdditiveBonus != null ? `+${cta[i].DamageAdditiveBonus}` : ''} ${cta[i].OtherDamageBonus != null ? cta[i].OtherDamageBonus : ''} ${cta[i].SneakDamage != null ? cta[i].SneakDamage : ``}`, 400);
        }
    }

    //belongingsDiv    
    if (c.RemainItems != null) {
        ed = document.getElementById(`itemsDiv`);
        let ri = is.find(m => m.Name == c.RemainItems);
        if (ri != null) {
            for (let i = 0; i < isi.length; i++) {
                if (isi[i].ItemStack == ri.Name) {
                    s = ``;
                    if (isi[i].Item != null)
                        s += isi[i].Item;
                    else
                        s += isi[i].RandomItem;

                    s += `  `;

                    if (isi[i].Quantity != null) {
                        if (isi[i].Quantity != 1) {
                            s += `x${isi[i].Quantity}`;
                        }
                    }
                    else
                        s += `x${isi[i].RandomQuantity}`;

                    writeBlock(ed, s, 400);
                }
            }
        }
    }
    else {
        document.getElementById(`itemsTbl`).remove();
    }
    //if (ed.textContent == ``)
        



    //document.getElementById(`will`).textContent = c.Will;
    document.getElementById(`memoDiv`).textContent = c.Memo;
    if (c.Memo == ``)
        document.getElementById(`memoTbl`).remove();
    //document.getElementById(`descriptionDiv`).textContent = c.Memo;

    //document.get
}

function writeBlock(ed, s, width = 200) {
    //document.documentElement.childElementCount
    let div = document.createElement(`div`);
    div.setAttribute(`style`, `width:${width}px; float:left`);
    div.textContent = s;
    ed.appendChild(div);
}

function compareDamageAdjustment(a, b) {
    if (a == b)
        return 0;
    if (a.Type == `DamageReduction`)
        return 1;
    else if (b.Type == `DamageReduction`)
        return -1;
    else if (a.Type == `Resistance`)
        return 1;
    else if (b.Type == `Resistance`)
        return -1;
    else if (a.Type == `Immunity`)
        return 1;
    else if (b.Type == `Immunity`)
        return -1;
    else if (a.Type == `Vulnerability`)
        return 1;
    else if (b.Type == `Vulnerability`)
        return -1;
    throw `Unkown Damage Adjustment Type`;
}

//function compareDamageType(a, b) {

//}