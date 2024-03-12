import { DEFAULT_CODE, DEFAULT_VISUAL, DEFAULT_VERSION } from "./constants.js";
import { LANG, LOCALE } from "./locale.js";
import { decode, downloadText, downloadJSON } from "./utils.js";

export { Storage };


/*************************************************************************************************/
/* Storage                                                                                       */
/*************************************************************************************************/

class Storage {
    constructor() {
    }

    async init() {
        // Load the data URL parameter.
        const query = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        let data = query.data; // an encoded dictionary mapping listing names to listing objects

        // Decode it.
        data = data ? decode(data) : {};
        this._importListings(data);

        // Create a new listing if there is none.
        if (this.count() == 0) {
            await this.loadInitial();
        }
    }

    async loadInitial() {
        console.log("Log initial data from local JSON file");
        const data = await downloadJSON("../data/listings.json");
        this._importListings(data);
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

    _saveListing(name, listing) {
        const code = listing.code;
        const lang = listing.lang;
        const data = listing.data;
        this.save(name, code, lang, data);
    }

    _importListings(data) {
        // Save the listings stored in the data.
        for (const name in data) {
            if (data.hasOwnProperty(name)) {
                // NOTE: skip existing names to avoid conflicts and avoid erasing local data
                if (!localStorage.getItem(name))
                    this._saveListing(name, data[name])
            }
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
        let s = JSON.stringify(listing);
        localStorage.setItem(name, s);
        return listing;
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
            let listing = JSON.parse(s);
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

    dump() {
        let dump = {};
        for (let name of this.list()) {
            dump[name] = this.retrieve(name);
        }
        let text = JSON.stringify(dump, null, 2);
        downloadText(text, "listings.json");
        return dump;
    }
};
