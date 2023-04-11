import { Unity } from "./Unity.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];    
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Creature`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;

    let ct = (await import(`../Data/Creature.json`, { assert: { type: `json` } })).default;
    let c = ct.find(m => m.Name == id1);
    
    let classString = c.Class1 + ` ` + c.Class1Level;
    if (c.Class2 != null)
        classString += `<br />` + c.Class2 + ` ` + c.Class2Level;
    if (c.Class3 != null)
        classString += `<br />` + c.Class3 + ` ` + c.Class3Level;
    if (c.Class4 != null)
        classString += `<br />` + c.Class4 + ` ` + c.Class4Level;
    if (c == null)
        return;//to do
    //creatureName
    
    document.getElementById(`creatureName`).textContent = c.Name;
/*    document.getElementById(`creatureName`).setAttribute(`style`, `width:300px`);*/
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
}