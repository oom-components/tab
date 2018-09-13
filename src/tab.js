export default class Tab extends HTMLElement {
    static get observedAttributes() {
        return ['index'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.tablist = this.querySelector(':scope > [role="tablist"]');
        this.tabs = this.tablist.querySelectorAll('a[role="tab"]');
        this.panels = this.querySelectorAll(':scope [role="tabpanel"]');

        this.tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                e.preventDefault();
                const currentTab = tablist.querySelector('[aria-selected]');
                if (e.currentTarget !== currentTab) {
                    switchTab(currentTab, e.currentTarget);
                }
            });
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.index = parseInt(newValue);
        }
    }

    get index() {
    }

    set index(index) {
    }
}

function switchTab (oldTab, newTab, panels) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    const id = newTab.getAttribute('href').substr(1);

    panels.forEach(panel => panel.hidden = id !== panel.id);
}