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

    _createItem(name) {
        const item = document.createElement('div');
        item.classList.add('item');

        const itemName = document.createElement('span');
        itemName.textContent = name;
        item.appendChild(itemName);

        const renameButton = document.createElement('button');
        renameButton.textContent = '✏️';
        renameButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.rename(name, window.prompt("new name?", name));
        });
        item.appendChild(renameButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.delete(name);
        });
        item.appendChild(deleteButton);

        return item;
    }

    setNames(names) {
        this.el.innerHTML = '';

        names.forEach(name => {
            const item = this._createItem(name);
            item.addEventListener('click', () => this.select(name));
            this.el.appendChild(item);
        });
    }

    select(name) {
        console.log(`Select code listing "${name}".`);
        this.dispatcher.select(this, name);
    }

    rename(oldName, newName) {
        if (!newName) return;
        console.log(`Rename code listing from "${oldName}" to "${newName}".`);
        this.dispatcher.rename(this, oldName, newName);
    }

    delete(name) {
        console.log(`Delete code listing "${name}".`);
        this.dispatcher.delete(this, name);
    }
};
