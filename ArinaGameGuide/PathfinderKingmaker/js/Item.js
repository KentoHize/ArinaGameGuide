﻿import { Unity } from "./Unity.js";

export async function Initialize(div, id1, id2) {
    Unity.Data = [];
    Unity.DataMain = {};
    if (Unity.BrowsingHistoryPage == 0)
        Unity.RecordHistoryPage(`Item`, id1, id2);
    else
        Unity.BrowsingHistoryPage = 0;

    let it = (await import(`../Data/Item.json${Unity.DebugString}`, { assert: { type: `json` } })).default;
    let ii = it.find(m => m.Name == id1);

    document.getElementById(`itemName`).textContent = ii.Name;
}
