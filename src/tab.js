export default class Tab extends HTMLElement {
    static get observedAttributes() {
        return ['index'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.tabs = Array.from(this.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));

        this.tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                e.preventDefault();
                this.tab = tab;
            });

            tab.addEventListener('keydown', e => {
                switch (e.which) {
                    case 37: //left
                        this.index -= 1;
                        break;

                    case 39: //right
                        this.index += 1;
                        break;

                    case 40: //down
                        e.preventDefault();
                        this.panel.focus();
                        break;
                }
            });

            if (tab.getAttribute('aria-selected') === 'true') {
                this.tab = tab;
            }
        });

        this.panels.forEach(panel => {
            panel.setAttribute('tabindex', '-1');

            panel.addEventListener('keydown', e => {
                if (e.which == 38) { //top
                    e.preventDefault();
                    this.tab.focus();
                }
            });

            if (panel.matches(':target')) {
                this.panel = panel;
            }
        });

        window.addEventListener('popstate', e => {
            const hash = document.location.hash;
            const tab = this.tabs.find(tab => tab.getAttribute('href') === hash);

            if (tab) {
                this.tab = tab;
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.index = parseInt(newValue);
        }
    }

    get index() {
        return this.tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    }

    set index(index) {
        if (this.tabs[index]) {
            this.tab = this.tabs[index];
        }
    }

    get tab() {
        return this.tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
    }

    set tab(tab) {
        const oldTab = this.tab;

        if (oldTab) {
            oldTab.removeAttribute('aria-selected');
            oldTab.setAttribute('tabindex', '-1');
        }

        tab.focus();
        tab.removeAttribute('tabindex');
        tab.setAttribute('aria-selected', 'true');

        const hash = tab.getAttribute('href');
        const id = hash.substr(1);

        this.panels.forEach(panel => panel.style.display = (id === panel.id) ? 'block' : 'none');

        history.replaceState({}, '', hash);
    }

    get panel() {
        const tab = this.tab;

        if (tab) {
            const id = tab.getAttribute('href').substr(1);

            return this.panels.find(panel => panel.id === id);
        }
    }

    set panel(panel) {
        const href = `#${panel.id}`;
        const tab = this.tabs.find(tab => tab.getAttribute('href') === href);

        if (tab) {
            this.tab = tab;
        }
    }
}
