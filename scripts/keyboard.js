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
        let that = this;
        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && (event.key === 'Enter' || event.keyCode === 13)) {
                event.preventDefault();

                // Emit the run event.
                that.dispatcher.run(that, that.model.editor.getCode());
            }
        });

    }
};
