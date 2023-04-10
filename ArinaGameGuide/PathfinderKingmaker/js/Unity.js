export class Unity {
    static HistoryPages = [];
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
}