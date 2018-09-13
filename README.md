# @oom/tab

Tab panel component with the following features:

* No dependencies
* Light: Aprox 200 lines of code (including comments and spaces)
* Follows the **progressive enhancement strategy:**
  * Works with just `html`
  * Works better with `html` and `css`
  * Works much better with `html`, `css` and `js`
  * Works much much better when `js` polyfills are not needed
* No styles or themes are provided with this package. You decide how the tabs must look.
* Support for touch devices
* Support for keyboard
* Build with modern javascript, using ES6 modules and custom elements

## Install

Requirements:

* NPM or Yarn to install [the package](https://www.npmjs.com/package/@oom/tab)
* For browsers [not supporting custom elements](https://caniuse.com/#feat=custom-elementsv1), [you can use this polyfill](https://github.com/webcomponents/custom-elements)

```sh
npm install @oom/tab
npm install @webcomponents/custom-elements
```

## Usage

### HTML

Let's start with the following html code:

```html
<my-tabs role="region" aria-label="Gallery" tabindex="0">
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
</my-tabs>

<button class="carousel-next">Previous</button>
<button class="carousel-prev">Next</button>
```

### CSS

Use css to define the carousel appearance:

```css
my-carousel {
    overflow-x: scroll;
    display: flex;
    scroll-snap-type: mandatory;
}
my-carousel > div {
    flex: 0 0 auto;
    scroll-snap-align: center;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Carousel from './carousel/carousel.js';

//Register the custom element
customElements.define('my-carousel', Carousel);

//Select the carousel
const carousel = document.querySelector('my-carousel');

//Navigate
document.querySelector('.carousel-next').addEventListener('click', event => carousel.index += 1);
document.querySelector('.carousel-prev').addEventListener('click', event => carousel.index -= 1);
```

## Player

Use the module `player` to create a player and init a slideshow. Example:

```js
import Player from './carousel/player.js';

const player = new Player(carousel);

//Start the slideshow
player.play();

//Start the slideshow with 10 seconds to wait between slides
player.play(10000);

//Stop
player.stop();
```

## API

This is a custom element that extends `HtmlElement`, so it innerit the same api of a standard html element with the following additions:

```js
//Get/set the slide index
carousel.index = 3; //move to the slide 3
const currIndex = carousel.index; //get the current slide index
carousel += 1; //move to the next slide
carousel -= 1; //move to the previous slide


//Move the slide using scroll

let atBeginning = carousel.scrollFromLeft === 0; //Determine whether the scroll is at begining
let atTheEnd = carousel.scrollFromRight === 0; //Determine whether the scroll is at the end

carousel.scrollFromLeft = 0; //Performs a scroll to the beginning
carousel.scrollFromRight = 0; //Performs a scroll to the end
carousel.scrollFromLeft += carousel.clientWidth; //Move the scroll the equivalent of the width of the carousel
```

## Demo and tests

- Demo: https://oom-components.github.io/carousel/demo
- Tests: https://oom-components.github.io/carousel/tests

To run the demo locally, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in the following urls:

- Demo: `http://localhost:8080/demo`
- Test: `http://localhost:8080/tests`