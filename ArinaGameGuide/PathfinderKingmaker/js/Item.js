import { Unity } from "./Unity.js";


export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.DataMain = {};
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Item`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;
    let it = (await fetch(`Data/Item.json${Unity.GetRandomString()}`).then(m => m.json()));
    let ii = it.find(m => m.Name == id1);

    document.getElementById(`itemName`).textContent = ii.Name;
    document.getElementById(`displayName`).textContent = ii.DisplayName;
    document.getElementById(`baseItem`).textContent = ii.BaseItem;
    document.getElementById(`sm`).textContent = ii.SpecialMaterial;
    document.getElementById(`sellPrice`).textContent = ii.SellPrice;
    document.getElementById(`weight`).textContent = ii.Weight;
    document.getElementById(`memo`).textContent = ii.Description;    
}
