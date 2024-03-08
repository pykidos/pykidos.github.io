import { DEFAULT_CODE } from "./constants.js";
import { LOCALE } from "./i18.js";

export { Model, };



/*************************************************************************************************/
/* Model class                                                                                      */
/*************************************************************************************************/

class Model {
    constructor() {

        // // Open the local cache.
        // caches.open('localCache').then((c) => {
        //     this.localCache = c;
        // });

        this.editor = null;
    }

    /* Internal                                                                                  */
    /*********************************************************************************************/

    async init() {
        this.editor = ace.edit("code-editor");
        this.editor.session.setMode("ace/mode/python");
        this.setCode(DEFAULT_CODE(LOCALE));
        // this.editor.setTheme("ace/theme/monokai");
    }

    setCode(code) {
        this.editor.setValue(code);
    }

    getCode() {
        return this.editor.getValue();
    }
}
