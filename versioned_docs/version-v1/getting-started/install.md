# Install the widget

## Load the widget script

The **friendly-challenge** library contains the code for CAPTCHA widget. You have two options on how to add this to your website, either you can use a script tag to load the widget from any CDN that hosts NPM packages, or you can import the code into your own Javascript bundle.

### Option A: Using a script tag

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.18/widget.module.min.js"
  async
  defer
></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.18/widget.min.js" async defer></script>
```

> Make sure to always import a specific version (e.g. `friendly-challenge@0.9.18`), then you can be sure that the script you import and integrate with your website doesn't change unexpectedly.

It is recommended that you include the `async` and `defer` attributes like in the examples above, they make sure that the browser does not wait to load these scripts to show your website. The size of the scripts is 18KB (8.5KB compressed) for modern browsers, and 24KB (10KB compressed) for old browsers.

> If you want to support old browsers, you can instead use a polyfill build, see the [**browser support**](../guides/browser-support#polyfills) page.

#### Download and self-host the widget library (recommended for GDPR)

Using `cdn.jsdelivr.net` is optional. If preferred (e.g. for GDPR reasons), you can self-host the scripts. [Download the latest release files](https://cdn.jsdelivr.net/npm/friendly-challenge/) and serve them from your own server:

- The module `widget.module.min.js`: https://cdn.jsdelivr.net/npm/friendly-challenge/widget.module.min.js
- The nomodule `widget.min.js`: https://cdn.jsdelivr.net/npm/friendly-challenge/widget.min.js

`cdn.jsdelivr.net` is blocked in some jurisdictions, like some parts of China. If your website needs to be reachable from these jurisdictions, we recommend that you self-host the scripts.

**Please remember to update to the latest release from time to time.**

### Option B: Import the library into your Javascript code

Alternatively, you can install the **friendly-challenge** library using a package manager such as npm:

```bash
npm install --save friendly-challenge
```

You can then import it into your app:

```javascript
import "friendly-challenge/widget";
```

> It is also possible to create and interact with the widget using the JavaScript API. In this tutorial we will consider the simple case in which you want to secure a simple HTML form. If you are making a single page application (using e.g. React) you will probably want to use the SDK instead. See the [SDK documentation page](../sdk).

## Add the widget itself

The friendly-challenge code you added won't do anything unless there is a special HTML element present that tells it where to create the widget. It will check for this widget once when it gets loaded, you can programmatically make it check for the element again.

Where you want to add a Friendly Captcha widget, add

```html
<div class="frc-captcha" data-sitekey="<your sitekey>"></div>
```

Replace `<your sitekey>` with the sitekey that you created in step 1. The widget will be rendered where you include this element, this should be inside the `<form>` you want to protect.

A hidden input field with the CAPTCHA solution will be added automatically, this will be included in the form data sent to your server when the user submits the form.
