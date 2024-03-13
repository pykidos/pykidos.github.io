import { DEFAULT_CODE } from "./constants.js";
import { LOCALE, LANG } from "./locale.js";
import { Storage } from "./storage.js";
import { Editor } from "./editor.js";
import { Grid } from "./grid.js";
import { encode, decode } from "./utils.js";

export { Model };



/*************************************************************************************************/
/* Model class                                                                                      */
/*************************************************************************************************/

class Model {
    constructor() {
        this.storage = new Storage();
        this.editor = new Editor();
        this.grid = new Grid();
    }

    async init() {
        await this.storage.init();
        await this.editor.init();
        await this.grid.init();
    }

    save(name) {
        console.log(`Saving code listing: "${name}".`);
        const code = this.editor.getCode();
        const lang = LANG;
        const data = this.grid.dump();
        return this.storage.save(name, code, lang, data);
    }

    makeURL(name) {
        let listing = this.save(name);
        let data = {};
        data[name] = listing;
        const encoded = encode(data);

        let url = new URL(window.location.href);
        url.searchParams.set('name', name);
        url.searchParams.set('data', encoded);

        return url.toString();
    }
}
