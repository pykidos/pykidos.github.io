import { DEFAULT_CODE } from "./constants.js";
import { LOCALE } from "./locale.js";

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
        localStorage.setItem(newName, DEFAULT_CODE(LOCALE));
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

    save(name, code) {
        localStorage.setItem(name, code);
    }

    first() {
        const names = Object.keys(localStorage);
        if (names.length > 0) {
            return names[0];
        }
    }

    retrieve(name) {
        const listing = localStorage.getItem(name);
        if (listing !== null) {
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
