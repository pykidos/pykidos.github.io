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
        // this.editor.setTheme("ace/theme/monokai");
    }

    getCode() {
        return this.editor.getValue();
    }
}
