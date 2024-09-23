# Browser support

All modern browsers are supported, on both mobile and desktop, all releases up to at least 8 years old.

Supported browsers include Safari, Edge, Chrome, Firefox, and Opera. Internet Explorer 11 also works, with some sidenotes (see the [section below](#internet-explorer)).


## Polyfills
:::note
**The `compat.min.js` script includes polyfills, so you generally don't have to do add any polyfills manually.**
:::

If you want to manually include polyfills or are using our Javascript SDK, these are the relevant polyfills to add:

* To support [Internet Explorer 11 and browsers from around 2014](https://caniuse.com/?search=promise), you will need a polyfill for [**Promise**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
* To support even older browsers (Chrome 9 through 37, Safari 5.1 through 7.1), you should also include a polyfill for [**Map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), such as [this one](https://github.com/anonyco/Javascript-Fast-Light-Map-WeakMap-Set-And-WeakSet-JS-Polyfill).

## Internet Explorer

Internet Explorer 11 is supported out of the box, but **the Javascript engine is very slow in Internet Explorer leading to a poor user experience**. The captcha challenge will likely take more than a minute to solve.

Consider displaying a message to IE users that they should use a different browser. You can use this Javascript snippet to display a note after the widget in Internet Explorer only:

```javascript
if (!!document.documentMode) { // Only true in Internet Explorer
  Array.prototype.slice.call(document.querySelectorAll(".frc-captcha")).forEach(function (element) {
    var messageElement = document.createElement("p");
    messageElement.innerHTML =
      "The anti-robot check works better and faster in modern browsers such as Edge, Firefox, or Chrome. Please update your browser";
    element.parentNode.insertBefore(messageElement, element.nextSibling);
  });
}
```

## NoScript

Users need to have Javascript enabled to solve the captcha.

We recommend you add a note for users that have Javascript disabled:

```html
<noscript>You need to enable Javascript for anti-robot verification to submit this form.</noscript>
```

This will only be visible to users without Javascript enabled.