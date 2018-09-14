export default class Tab extends HTMLElement {
    static get observedAttributes() {
        return ['index'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.tablist = this.querySelector('[role="tablist"]');
        this.tabs = this.tablist.querySelectorAll('a[role="tab"]');
        this.panels = this.querySelectorAll('[role="tabpanel"]');

        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', e => {
                e.preventDefault();
                switchTab(
                    tab,
                    this.tabs,
                    this.panels
                );
            });

            tab.addEventListener('keydown', e => {
                switch (e.which) {
                    case 37: //left
                        if (this.tabs[index - 1]) {
                            e.preventDefault();
                            switchTab(
                                this.tabs[index - 1],
                                this.tabs,
                                this.panels
                            );
                        }
                        break;

                    case 39: //right
                        if (this.tabs[index + 1]) {
                            e.preventDefault();
                            switchTab(
                                this.tabs[index + 1],
                                this.tabs,
                                this.panels
                            );
                        }
                        break;

                    case 40: //down
                        e.preventDefault();
                        const id = tab.getAttribute('href').substr(1);

                        this.panels.forEach(panel => {
                            if (panel.id === id) {
                                panel.focus();
                            }
                        });
                        break;
                }
            });

            if (tab.getAttribute('aria-selected') === 'true') {
                switchTab(
                    tab,
                    this.tabs,
                    this.panels
                );
            }
        });

        this.panels.forEach(panel => {
            panel.setAttribute('tabindex', '-1');

            panel.addEventListener('keydown', e => {
                if (e.which == 38) { //top
                    e.preventDefault();
                    const hash = `#${panel.id}`;

                    this.tabs.forEach(tab => {
                        if (tab.getAttribute('href') === hash) {
                            tab.focus();
                        }
                    });
                }
            });

            if (panel.matches(':target')) {
                const hash = `#${panel.id}`;
                this.tabs.forEach(tab => {
                    if (tab.getAttribute('href') === hash) {
                        switchTab(
                            tab,
                            this.tabs,
                            this.panels
                        );
                    }
                });

            }
        });

        window.addEventListener('popstate', e => {
            const hash = document.location.hash;

            this.tabs.forEach(tab => {
                if (tab.getAttribute('href') === hash) {
                    switchTab(
                        tab,
                        this.tabs,
                        this.panels
                    );
                }
            });
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.index = parseInt(newValue);
        }
    }

    get tabId() {

    }

    set tabId(id) {
    }
}

function switchTab(newTab, tabs, panels) {
    tabs.forEach(tab => {
        if (tab === newTab) {
            tab.focus();
            tab.removeAttribute('tabindex');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.removeAttribute('aria-selected');
            tab.setAttribute('tabindex', '-1');
        }
    });

    const hash = newTab.getAttribute('href');
    const id = hash.substr(1);

    panels.forEach(panel => panel.style.display = (id === panel.id) ? 'block' : 'none');

    history.replaceState({}, '', hash);
}