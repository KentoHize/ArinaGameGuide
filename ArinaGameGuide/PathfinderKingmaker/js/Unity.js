import { loadDataContent } from "../../js/ArinaGameGuide.js";

export class Unity {
    static PageName = `PathfinderKingmaker`; //const
    static HistoryPages = [];
    static HistoryPagesPointer = 0;
    static BrowsingHistoryPage = 0;
    static DataMain = {};
    static Data = [];
    static DebugMode = 1;
    
    static GetRandomString() {
        if (Unity.DebugMode == 1)
            return `?v=${Math.random()}`;
        return ``;
    }

    static SortPosition(a, b)
    {
        const order = [null, `None`, `Center`, `East`, `South East`, `South`, `South West`, `West`, `North West`,
            `North`, `North East`, `Deep Floor 1`, `Deep Floor 1 Center`, `Deep Floor 1 East`,
            `Deep Floor 1 South`, `Deep Floor 1 West`, `Deep Floor 1 North`, `Deep Floor 2`,
            `Deep Floor 3`];

        if (a == b)
            return 0;
        for (let i = 0; i < order.length; i++) {
            if (a == order[i])
                return -1;
            else if (b == order[i])
                return 1;
        }
        throw `Sort Position Error`;
    }

    static RecordHistoryPage(page, id1 = null, id2 = null, params = null)
    {   
        while (Unity.HistoryPagesPointer != 0) {
            Unity.HistoryPagesPointer--;
            Unity.HistoryPages.pop();
        }        
        Unity.HistoryPages.push({ page: page, id1: id1, id2: id2, params: params });
    }

    static GoBackPage(div)
    {   
        if (Unity.HistoryPages.length == 1)
            return false;
        Unity.BrowsingHistoryPage = 1;
        Unity.HistoryPagesPointer++;
        let target = Unity.HistoryPages[Unity.HistoryPages.length - Unity.HistoryPagesPointer - 1];        
        loadDataContent(div, Unity.PageName, target.page, target.id1, target.id2);
    }

    static GoForwardPage(div)
    {
        if (Unity.HistoryPagesPointer == 0)        
            return false;
        Unity.BrowsingHistoryPage = 1;
        Unity.HistoryPagesPointer--;
        let target = Unity.HistoryPages[Unity.HistoryPages.length - Unity.HistoryPagesPointer - 1];
        loadDataContent(div, Unity.PageName, target.page, target.id1, target.id2);
    }

    //static RefreshBackForwardState()
    //{

    //}

    static GetAlginmentAcronym(alignment) {
        if (alignment == `Lawful Good`)
            return `LG`;
        else if (alignment == `Neutral Good`)
            return `NG`;
        else if (alignment == `Chaotic Good`)
            return `CG`;
        else if (alignment == `Lawful Neutral`)
            return `LN`;
        else if (alignment == `Neutral`)
            return `N`;
        else if (alignment == `Chaotic Neutral`)
            return `CN`;
        else if (alignment == `Lawful Evil`)
            return `LE`;
        else if (alignment == `Neutral Evil`)
            return `NE`;
        else if (alignment == `Chaotic Evil`)
            return `CE`;
        return null;
    }
}