export default class Tab extends HTMLElement {
  static changeHistory = true;

  connectedCallback() {
    checkA11y(this);

    this.tabs = Array.from(this.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        setTab(this, tab, Tab.changeHistory);
      });

      tab.addEventListener("keydown", (e) => {
        switch (e.which) {
          case 37: //left
            moveIndex(this, -1, Tab.changeHistory);
            break;

          case 39: //right
            moveIndex(this, 1, Tab.changeHistory);
            break;

          case 40: //down
            e.preventDefault();
            this.panel.focus();
            break;
        }
      });
    });

    this.panels.forEach((panel) => {
      panel.setAttribute("tabindex", "-1");

      panel.addEventListener("keydown", (e) => {
        if (e.which == 38) {
          //top
          e.preventDefault();
          this.tab.focus();
        }
      });
    });

    addEventListener(
      "popstate",
      () => setByHash(this, document.location.hash, Tab.changeHistory),
    );

    if (!setByHash(this, document.location.hash)) {
      setTab(this, this.tab, false, false);
    }
  }

  get tab() {
    return this.tabs.find(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );
  }

  get panel() {
    const tab = this.tab;

    if (tab) {
      const id = tab.getAttribute("href").substr(1);
      return this.panels.find((panel) => panel.id === id);
    }

    return null;
  }

  setState(hash) {
    return setByHash(this, hash) || false;
  }
}

function moveIndex(el, increment, changeHistory = true) {
  const index = el.tabs.indexOf(el.tab) + increment;

  if (el.tabs[index]) {
    setTab(el, el.tabs[index], changeHistory);
  }
}

function setTab(el, tab, changeHistory = true, autofocus = true) {
  const oldTab = el.tab;

  if (oldTab) {
    oldTab.removeAttribute("aria-selected");
    oldTab.setAttribute("tabindex", "-1");
  }

  if (!tab) {
    return;
  }

  if (autofocus) {
    tab.focus();
  }
  tab.removeAttribute("tabindex");
  tab.setAttribute("aria-selected", "true");

  const hash = tab.getAttribute("href");
  const id = hash.substr(1);

  el.panels.forEach(
    (panel) => (panel.style.display = id === panel.id ? null : "none"),
  );

  if (changeHistory) {
    history.replaceState({}, "", hash);
  }
}

function setByHash(el, hash) {
  const tab = el.tabs.find((tab) => tab.getAttribute("href") === hash);

  if (tab) {
    setTab(el, tab, false);
    return true;
  }
}

function checkA11y(element) {
  if (element.getAttribute("role") !== "region") {
    console.info(
      "@oom/carusel [accesibility]:",
      'Missing role="region" attribute in the tab element',
    );
  }

  const tablist = element.querySelector('ul[role="tablist"]');

  if (!tablist) {
    console.info(
      "@oom/tab [accesibility]:",
      'Missing ul element with [role="tablist"] attribute',
    );
  } else {
    tablist.querySelectorAll("li").forEach((li) => {
      if (li.getAttribute("role") !== "presentation") {
        console.info(
          "@oom/tab [accesibility]:",
          'The li elements in ul[role="tablist"] should have the role="presentation" attribute',
        );
      }
    });

    tablist.querySelectorAll("a").forEach((a) => {
      if (a.getAttribute("role") !== "tab") {
        console.info(
          "@oom/tab [accesibility]:",
          'The a elements in ul[role="tablist"] must have the role="tab" attribute',
        );
      }
    });
  }

  const panels = element.querySelectorAll('[role="tabpanel"]');

  if (!panels.length) {
    console.info(
      "@oom/tab [accesibility]:",
      'Missing role="tabpanel" elements',
    );
  }

  panels.forEach((panel) => {
    if (!panel.hasAttribute("aria-labelledby")) {
      console.info(
        "@oom/tab [accesibility]:",
        `Missing aria-labelledby attribute in tabpanel "${panel.id}"`,
      );
    }
  });
}
