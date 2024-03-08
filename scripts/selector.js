export { Selector };


/*************************************************************************************************/
/* Selector                                                                                      */
/*************************************************************************************************/

class Selector {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.el = document.getElementById("selector");
        this.newButton = document.getElementById("new-item");

        this.setupDispatcher();
        this.setupNewButton();
    }

    init() {
        this.select(this.state.name);
    }

    setupDispatcher() {
        this.dispatcher.on("setNames", (e) => {
            this.setNames(e.names);
            this.select(e.name);
        });
    }

    setupNewButton() {
        this.newButton.addEventListener('click', (e) => {
            this.dispatcher.new(this);
        });
    }

    setNames(names) {
        this.el.innerHTML = '';

        names.forEach(name => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.textContent = name;
            item.addEventListener('click', () => this.select(name));
            this.el.appendChild(item);
        });
    }

    select(name) {
        console.log(`Select code listing "${name}".`);
        this.dispatcher.select(this, name);
    }
};
