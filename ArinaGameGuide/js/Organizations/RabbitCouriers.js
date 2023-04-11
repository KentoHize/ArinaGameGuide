import { Aritiafel } from "../Aritiafel.js"
import { ArTranslator } from "../Devices/ArTranslator.js"

export class RabbitCouriers {

    static #resourceFileFolder
    static Translators = [];
    static DefaultCultureInfo = ``;

    static async RegisterResourcesFilesFolderAndCultureInfo(resourceFilesFolder, cultureInfo) {
        RabbitCouriers.Translators = [];
        RabbitCouriers.DefaultCultureInfo = cultureInfo;
        RabbitCouriers.#resourceFileFolder = resourceFilesFolder;        
        RabbitCouriers.Translators[RabbitCouriers.DefaultCultureInfo] = new ArTranslator();
        await RabbitCouriers.Translators[RabbitCouriers.DefaultCultureInfo].LoadResourceFile(`../../${RabbitCouriers.#resourceFileFolder}/${RabbitCouriers.DefaultCultureInfo}.json`);
    }

    static async RegisterNewCultureInfo(cultureInfo) {
        RabbitCouriers.Translators[cultureInfo] = new ArTranslator();
        await RabbitCouriers.Translators[cultureInfo].LoadResourceFile(`../../${RabbitCouriers.#resourceFileFolder}/${cultureInfo}.json`)
    }

    //Check
    static UnregisterAll() {
        delete RabbitCouriers.Translators;
        RabbitCouriers.Translators = [];
    }

    static GetMessage(key, cultureInfo = null) {        
        if (cultureInfo)
            return RabbitCouriers.Translators[cultureInfo].GetString(key);
        else
            return RabbitCouriers.Translators[RabbitCouriers.DefaultCultureInfo].GetString(key);
    }   
}

if (Aritiafel.Organizations == null)
    Aritiafel.Organizations = {};
Aritiafel.Organizations.RabbitCouriers = RabbitCouriers;
