export class Unity {
    static HistoryPages = [];
    static Data = [];
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
        Unity.HistoryPages.push({ page: page, id1: id1, id2: id2, params: params });
    }

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