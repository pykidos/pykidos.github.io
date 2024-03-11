export { Editor };


/*************************************************************************************************/
/* Editor                                                                                        */
/*************************************************************************************************/

class Editor {
    constructor() {
        this.emojiButton = document.getElementById("emoji-button");
        this.emojiPicker = document.getElementById("emoji-picker");
        this.colorButton = document.getElementById("color-button");

        this.setupEmojiButton();
        this.setupEmojiPicker();
        this.setupColorButton();

        this.editor = null;
    }

    init() {
        this.editor = ace.edit("code-editor");
        this.editor.setOptions({
            fontSize: "12pt"
        });
        this.editor.session.setMode("ace/mode/python");
    }

    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupEmojiButton() {
        // Show/hide the emoji picker.
        this.emojiButton.addEventListener("click", (e) => {
            this.emojiPicker.classList.toggle("visible");
        });
    }

    setupEmojiPicker() {
        // When an emoji is selected.
        this.emojiPicker.addEventListener('emoji-click', (e) => {
            this.editor.insert(e.detail.unicode);
            this.emojiPicker.classList.remove("visible");
            this.editor.focus();
        });

        // Hide the picker when the focus is out.
        this.emojiPicker.addEventListener('focusout', (e) => {
            this.emojiPicker.classList.remove("visible");
        });
    }

    setupColorButton() {
        Coloris({
            alpha: false,
            closeButton: true,
            closeLabel: 'Insert',
            format: 'rgb',
            themeMode: 'light',
        })

        this.colorButton.addEventListener('change', (e) => {
            const color = e.target.value.substring(3);
            this.editor.insert(color);
        });
    }

    /* Public functions                                                                          */
    /*********************************************************************************************/

    setCode(code) {
        this.editor.setValue(code);
        this.editor.clearSelection();
    }

    getCode() {
        return this.editor.getValue();
    }
};
