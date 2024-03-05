export { Editor };


/*************************************************************************************************/
/* Editor                                                                                        */
/*************************************************************************************************/

class Editor {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.setupDispatcher();
    }

    init() {
        this.editor = ace.edit("code-editor");
        // this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/python");

    }

    setupDispatcher() {
    }
};
