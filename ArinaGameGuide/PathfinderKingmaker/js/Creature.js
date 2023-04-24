import { Unity } from "./Unity.js";
import { loadDataContent } from "../../js/ArinaGameGuide.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.DataMain = {};
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Creature`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;

    let ct = (await import(`../Data/Creature.json${Unity.GetRandomString()}`, { assert: { type: `json` } })).default;
    let c = ct.find(m => m.Name == id1);

    if (c == null)
        alert(`No Creature Found`);
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
    document.getElementById(`skinItem`).textContent = c.SkinItem == null ? `-` : c.SkinItem;
    document.getElementById(`skinDC`).textContent = c.SkinDC == null ? `-` : c.SkinDC;


    let ctab = (await import(`../Data/CreatureAbilities.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let cta = (await import(`../Data/CreatureAttacks.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let ctda = (await import(`../Data/CreatureDamageAdjustment.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let ctec = (await import(`../Data/CreatureEffectorCondition.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let ctim = (await import(`../Data/CreatureImmunities.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let cts = (await import(`../Data/CreatureSkills.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let is = (await import(`../Data/ItemStack.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let isi = (await import(`../Data/ItemStackItem.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;

    let eocsc = (await import(`../Data/EffectOrConditionSetEffectOrCondition.json${Unity.GetRandomString() }`, { assert: { type: `json` } })).default;
    let s = ``;
    let additionalAttack = 0;

    let ed = document.getElementById(`abilityDiv`);
    for (let i = 0; i < ctab.length; i++) {
        if (ctab[i].Creature == id1) {
            writeBlock(ed, `${ctab[i].Ability} ${ctab[i].Amount != null ? ctab[i].Amount : ``}`);
            if (ctab[i].Ability == `Rapid Shot` || ctab[i].Ability == `Flurry of Blows`
                || ctab[i].Ability == `Ki Power: Extra Attack`)
                additionalAttack += 1;
        }
    }
    if (ed.textContent == ``)
        document.getElementById(`abilityTbl`).remove();

    ed = document.getElementById(`conditionDiv`)
    for (let i = 0; i < ctec.length; i++) {
        if (ctec[i].Creature == id1)
            writeBlock(ed, `${ctec[i].EffectOrCondition} ${ctec[i].Amount != null ? ctec[i].Amount : ``}${ctec[i].Period != null ? `(${ctec[i].Period} rounds)` : ``}`);        
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
    if (ed.innerHTML == `` && document.getElementById(`dmgAdjustDiv`).innerHTML == ``)
        document.getElementById(`immunityTbl`).remove();
    //let tr = document.createElement(`tr`);
    //document.getElementById(`lSR`).parentElement.insertAdjacentElement(`afterend`, tr);
    ed = document.getElementById(`attackDiv`);
    
    for (let i = 0; i < cta.length; i++) {
        if (cta[i].Creature == id1) {
            s = ``;
            if (cta[i].Weapon != null)
                s += cta[i].Weapon;
            else
                s += cta[i].Form;

            s += ` ${cta[i].Range} ft. `;

            for (let j = 0; j <= cta[i].AdditionalAttack; j++) {
                let ab;                
                if (cta[i].Type != `Other`) {
                    if (additionalAttack <= j)
                        ab = cta[i].AttackBonus - (j - additionalAttack) * 5;
                    else
                        ab = cta[i].AttackBonus;
                }
                else {
                    ab = cta[i].AttackBonus;
                }
                if (ab >= 0)
                    s += `+${ab}/`;
                else
                    s += `${ab}/`;
            }
        
            
            s = s.substring(0, s.length - 1);

            s += ` ${cta[i].BasicDamage}`;
            if (cta[i].DamageAdditiveBonus != null)
                if (cta[i].DamageAdditiveBonus > 0)
                    s += `+${cta[i].DamageAdditiveBonus}`;
                else if (cta[i].DamageAdditiveBonus < 0)
                    s += cta[i].DamageAdditiveBonus;

            if (cta[i].OtherDamageBonus != null)
                s += `+${cta[i].OtherDamageBonus}`;
            if (cta[i].SneakDamage != null)
                s += `+${cta[i].SneakDamage}`; 
            writeBlock(ed, s, 400);
        }
    }

    //itemsDiv
    if (c.RemainItems != null) {
        ed = document.getElementById(`itemsDiv`);
      
        let ri = is.find(m => m.Name == c.RemainItems);
        if (ri != null) {
            for (let i = 0; i < isi.length; i++) {
                if (isi[i].ItemStack == ri.Name) {
                    s = ``;
                    let newDiv = document.createElement(`div`);
                    if (isi[i].Item != null) {
                        let a = document.createElement(`a`);
                        a.href = `javascript:;`;
                        a.addEventListener(`click`, () => loadDataContent(div, Unity.PageName, `Item`, isi[i].Item));
                        a.textContent = isi[i].Item;
                        newDiv.appendChild(a);
                    }
                    else {
                        s += isi[i].RandomItem;
                    }

                    if (isi[i].Quantity != null) {
                        if (isi[i].Quantity != 1) {
                            s += `  x${isi[i].Quantity}`;
                        }
                    }
                    else {
                        s += `  x${isi[i].RandomQuantity}`;
                    }
                    newDiv.appendChild(document.createTextNode(s));
                    ed.appendChild(newDiv);
                }
            }
        }
        else {
            document.getElementById(`itemsTbl`).remove();
        }       
    }
    if (c.Memo != ``)
        document.getElementById(`memoDiv`).textContent = c.Memo;
    else
        document.getElementById(`memoTbl`).remove();
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
