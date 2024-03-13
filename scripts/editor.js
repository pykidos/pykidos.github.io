export { Editor };


/*************************************************************************************************/
/* Editor                                                                                        */
/*************************************************************************************************/

class Editor {
    constructor() {
        this.emojiButton = document.getElementById("emoji-button");
        this.emojiPicker = document.getElementById("emoji-picker");
        this.colorButton = document.getElementById("color-button");
        this.increaseFontSizeButton = document.getElementById("increase-font-size-button");
        this.decreaseFontSizeButton = document.getElementById("decrease-font-size-button");

        this.setupEmojiButton();
        this.setupEmojiPicker();
        this.setupColorButton();
        this.setupFontSizeButtons();

        this.editor = null;
    }

    init() {
        this.editor = ace.edit("code-editor");
        // this.editor.setOptions({
        //     // fontSize: "12pt"
        // });
        this.editor.session.setMode("ace/mode/python");
    }

    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupEmojiButton() {
        // Show/hide the emoji picker.
        this.emojiButton.addEventListener("click", (e) => {
            this.emojiPicker.classList.toggle("visible");

            // Automatically focus the emoji picker search text box.
            const input = app.model.editor.emojiPicker.shadowRoot.getElementById("search");
            if (input)
                input.focus();
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

        // Hide the picker when pressing Escape.
        this.emojiPicker.addEventListener('keydown', (e) => {
            if (e.key == "Escape")
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

    setupFontSizeButtons() {
        this.increaseFontSizeButton.addEventListener("click", (e) => {
            if (this.editor.getFontSize() >= 2)
                this.editor.setFontSize(this.editor.getFontSize() + 1);
        });

        this.decreaseFontSizeButton.addEventListener("click", (e) => {
            if (this.editor.getFontSize() >= 2)
                this.editor.setFontSize(this.editor.getFontSize() - 1);
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
