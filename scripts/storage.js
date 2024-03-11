import { DEFAULT_CODE, DEFAULT_VISUAL, DEFAULT_VERSION } from "./constants.js";
import { LANG, LOCALE } from "./locale.js";
import { encode, decode } from "./utils.js";

export { Storage };


/*************************************************************************************************/
/* Storage                                                                                       */
/*************************************************************************************************/

class Storage {
    constructor() {
    }

    init() {
        if (this.count() == 0) {
            this.new();
        }
    }

    /* Internal functions                                                                        */
    /*********************************************************************************************/

    _makeListing(code, lang, data) {
        return {
            "visual": DEFAULT_VISUAL,
            "version": DEFAULT_VERSION,
            "code": code,
            "lang": lang,
            "data": data,
        };
    }

    /* Public functions                                                                          */
    /*********************************************************************************************/

    count() {
        return localStorage.length;
    }

    new() {
        let index = 0;
        let newName;
        do {
            newName = `untitled ${index}`;
            index++;
        } while (localStorage.getItem(newName) !== null);
        this.save(newName, DEFAULT_CODE(LOCALE));
        return newName;
    }

    rename(oldName, newName) {
        const listing = localStorage.getItem(oldName);
        if (listing !== null) {
            localStorage.setItem(newName, listing);
            localStorage.removeItem(oldName);
        } else {
            throw new Error(`Listing "${oldName}" not found.`);
        }
    }

    save(name, code, lang = LANG, data = null) {
        let listing = this._makeListing(code, lang, data);
        let s = encode(listing);
        localStorage.setItem(name, s);
    }

    first() {
        const names = Object.keys(localStorage);
        if (names.length > 0) {
            return names[0];
        }
    }

    retrieve(name) {
        const s = localStorage.getItem(name);
        if (s !== null) {
            let listing = decode(s);
            return listing;
        }
        else {
            throw new Error(`Listing "${name}" not found.`);
        }
    }

    list(order) {
        const names = Object.keys(localStorage);
        if (order === 'desc') {
            return names.sort().reverse();
        } else {
            return names.sort();
        }
    }

    delete(name) {
        localStorage.removeItem(name);
    }
};
