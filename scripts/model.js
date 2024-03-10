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
        this.emojiButton = document.getElementById("emoji-button");
        this.emojiPicker = document.getElementById("emoji-picker");
        this.emojiButton.addEventListener("click", (e) => {
            this.emojiPicker.classList.toggle("visible");
        });

        this.emojiPicker.addEventListener('emoji-click', (e) => {
            this.editor.insert(e.detail.unicode);
            this.emojiPicker.classList.remove("visible");
            this.editor.focus();
        });
        this.emojiPicker.addEventListener('focusout', (e) => {
            this.emojiPicker.classList.remove("visible");
        });


        Coloris({
            alpha: false,
            closeButton: true,
            closeLabel: 'Insert',
            format: 'rgb',
            themeMode: 'light',
        })
        this.colorButton = document.getElementById("color-button");
        this.colorButton.addEventListener('change', (e) => {
            const color = e.target.value.substring(3);
            this.editor.insert(color);
        });
    }

    /* Internal                                                                                  */
    /*********************************************************************************************/

    async init() {
        this.editor = ace.edit("code-editor");
        this.editor.session.setMode("ace/mode/python");

        // this.setCode(DEFAULT_CODE(LOCALE));
        // this.editor.setTheme("ace/theme/monokai");
    }

    setCode(code) {
        this.editor.setValue(code);
        this.editor.clearSelection();
    }

    getCode() {
        return this.editor.getValue();
    }
}
