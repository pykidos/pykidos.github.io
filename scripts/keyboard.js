export { Keyboard };


/*************************************************************************************************/
/* Panel                                                                                         */
/*************************************************************************************************/

class Keyboard {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.setupDispatcher();
        this.setupKeyboard();
    }

    setupDispatcher() {
    }

    setupKeyboard() {
        document.addEventListener('keydown', (event) => {
            const code = this.model.editor.getCode();

            // Control+Enter: run.
            if (event.ctrlKey && (event.key === 'Enter' || event.keyCode === 13)) {
                event.preventDefault();

                // Emit the run event.
                this.dispatcher.run(this, code);
            }

            // Control+S: save.
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();

                // Save the code in the storage.
                this.model.save(this.state.name);
            }
        });
    }
};
