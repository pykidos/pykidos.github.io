import { DEFAULT_CODE } from "./constants.js";
import { LOCALE, LANG } from "./locale.js";
import { Storage } from "./storage.js";
import { Editor } from "./editor.js";
import { Grid } from "./grid.js";

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
        const code = this.editor.getCode();
        const lang = LANG;
        const data = this.grid.dump();
        this.storage.save(name, code, lang, data);
    }
}
