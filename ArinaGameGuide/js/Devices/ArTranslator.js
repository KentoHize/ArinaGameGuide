import { Aritiafel } from "../Aritiafel.js"

export class ArTranslator {
    #resourceFileObj;
    State = 0;
    
    constructor() {
        this.State = 1;        
    }   

    async LoadResourceFile(resourceFile) {
        this.#resourceFileObj = (await import(resourceFile, { assert: { type: `json` } })).default;
        this.State = 2;
    }

    GetString(key) {
        return this.#resourceFileObj.find(m => m.Key == key).Value;
    }
}

if (Aritiafel.Devices == null)
    Aritiafel.Devices = {};
Aritiafel.Devices.ArTranslator = ArTranslator;
