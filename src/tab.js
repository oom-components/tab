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

        this.tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                e.preventDefault();
                switchTab(
                    tab.getAttribute('href').substr(1),
                    this.tabs,
                    this.panels
                );
            });
        });
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

function switchTab(id, tabs, panels) {
    const hash = `#${id}`;

    tabs.forEach(tab => {
        if (tab.getAttribute('href') === hash) {
            tab.focus();
            tab.removeAttribute('tabindex');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.removeAttribute('aria-selected');
            tab.setAttribute('tabindex', '-1');
        }
    });

    panels.forEach(panel => {
        panel.hidden = (id !== panel.id);
    });

    history.replaceState({}, '', hash);
}