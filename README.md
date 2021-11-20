# @oom/tab

Tab panel component with the following features:

- No dependencies
- Light: Aprox 200 lines of code (including comments and spaces)
- Follows the **progressive enhancement strategy:**
  - Works with just `html`
  - Works better with `html` and `css`
  - Works much better with `html`, `css` and `js`
  - Works much much better when `js` polyfills are not needed
- No styles or themes are provided with this package. You decide how the tabs
  must look.
- Support for touch devices
- Support for keyboard
- Fully accessible
- Build with modern javascript, using ES6 modules and custom elements

## Install

Requirements:

- NPM or Yarn to install [the package](https://www.npmjs.com/package/@oom/tab)
- For browsers
  [not supporting custom elements](https://caniuse.com/#feat=custom-elementsv1),
  [you can use this polyfill](https://github.com/webcomponents/custom-elements)

```sh
npm install @oom/tab
npm install @webcomponents/custom-elements
```

## Usage

### HTML

Let's start with the following html code:

```html
<my-tabs role="region">
     <ul role="tablist">
        <li role="presentation">
            <a href="#section1" role="tab" id="tab1" aria-selected="true">
                Section 1
            </a>
        </li>
        <li role="presentation">
            <a href="#section2" role="tab" id="tab2">
                Section 2
            </a>
        </li>
        <li role="presentation">
            <a href="#section3" role="tab" id="tab3">
                Section 3
            </a>
        </li>
    </ul>

    <section id="section1" aria-labelledby="tab1" role="tabpanel">
        Content section 1
    </section>

    <section id="section2" aria-labelledby="tab2" role="tabpanel">
        Content section 2
    </section>

    <section id="section3" aria-labelledby="tab3" role="tabpanel">
        Content section 3
    </section>
</my-tabs>
```

### CSS

Use css to define the tab panel appearance:

```css
/* This makes the tabs works without javascript */
section:not(:target) {
    display: none;
}

[role="tablist"] {
    display: flex;
    list-style: none;
    padding: 0;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Tab from "./tab/tab.js";

//Register the custom element
customElements.define("my-tabs", Tab);
```

## API

This is a custom element that extends `HtmlElement`, so it innerit the same api
of a standard html element with the following additions:

```js
//Select the element
const element = document.querySelector("my-tabs");

//Change the tab state
element.setState("#section2");

//Get the currently selected tabpanel element
console.log(element.panel);

//Get the currently selected tab element
console.log(element.tab);
```

## Demo and tests

- Demo: https://oom-components.github.io/tab/demo/
- Tests: https://oom-components.github.io/tab/tests/

To run the demo locally, just clone this repository, enter in the directory and
execute:

```sh
npm install
npm start
```

You should see something in the following urls:

- Demo: `http://localhost:8080/demo`
- Test: `http://localhost:8080/tests`
