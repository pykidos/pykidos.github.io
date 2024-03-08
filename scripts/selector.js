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

        this.names = [];
        this.setupDispatcher();
        this.setupNewButton();
    }

    init() {
        // if (this.state.name != undefined && this.names.includes(this.state.name)) {
        //     console.log("a");
        //     this.select(this.state.name);
        // }
        // else if (this.names.length > 0) {
        //     console.log("b");
        //     this.select(this.names[0]);
        // }
    }

    setupDispatcher() {
        this.dispatcher.on("setNames", (e) => {
            this.setNames(e.names, e.name);
        });
    }

    setupNewButton() {
        this.newButton.addEventListener('click', (e) => {
            this.dispatcher.new(this);
        });
    }

    _createItem(name, selected) {
        const item = document.createElement('div');
        item.classList.add('item');
        if (selected)
            item.classList.add('selected');

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
            if (window.confirm(`delete ${name}?`))
                this.delete(name);
        });
        item.appendChild(deleteButton);

        return item;
    }

    setNames(names, selectedName) {
        this.el.innerHTML = '';
        this.names = names;

        names.forEach(name => {
            const item = this._createItem(name, name == selectedName);
            item.addEventListener('click', () => this.select(name));
            this.el.appendChild(item);
        });

        if (selectedName)
            this.select(selectedName);
    }

    select(name) {
        if (!name) return;
        console.log(`Select code listing "${name}".`);

        for (let child of this.el.childNodes) {
            if (child.childNodes[0].innerHTML != name)
                child.classList.remove('selected');
            else
                child.classList.add('selected');
        }

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
