import { DEFAULT_CODE } from "./constants.js";
import { LOCALE } from "./locale.js";
import { Storage } from "./storage.js";
import { Editor } from "./editor.js";

export { Model };



/*************************************************************************************************/
/* Model class                                                                                      */
/*************************************************************************************************/

class Model {
    constructor() {
        this.storage = new Storage();
        this.editor = new Editor();
    }

    async init() {
        await this.storage.init();
        await this.editor.init();
    }
}
