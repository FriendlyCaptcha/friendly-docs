# Install the widget

## Option A: HTML Scripts

The easiest way to integrate Friendly Captcha into your website is by using the *`site`* script.

This script automatically loads a widget for every element on your website with the `frc-captcha` class.

::::info

To create widgets from Javascript code, [see **Option B** below](#option-b-programmatically-javascript-sdk).

::::

### Adding the scripts

Add the following to your website's HTML:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.16/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.16/site.compat.min.js" async defer></script>
```

::::tip
#### Using the scripts without a CDN

You can [download the latest release files](https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.16/) and serve them from your own server.
Remember to update these scripts regularly.
::::


### Adding the widget

Insert a HTML element with the `frc-captcha` class in the form you want to protect. Use the sitekey you created in the previous step.

```html
<div class="frc-captcha" data-sitekey="<your sitekey>"></div>
```
::::info
You can customize the widget's behavior by using [HTML attributes](../sdk/configuration.md).
::::
### Next steps

The next step is to [**verify the captcha response**](./verify.md) in your backend server code.


## Option B: Programmatically (Javascript SDK)

### Install the library

You can install our NPM package to create widgets programmatically.

```shell
# using npm
npm install @friendlycaptcha/sdk

# using yarn
yan add @friendlycaptcha/sdk
```


### Create widgets from your code


```javascript
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk"

// Re-use this SDK if you are creating multiple widgets.
const sdk = new FriendlyCaptchaSDK();
```

```javascript
// HTML element that you want to mount the widget to.
const mount = document.querySelector("#my-widget");

// Create the widget
const widget = sdk.createWidget({
    element: mount,
    sitekey: "<your sitekey>"
});
```

::::info
You can customize the widget's behavior and integrate with it using the SDK. See the [Widget SDK reference](../sdk).
::::

### Next steps

The next step is to [**verify the captcha response**](./verify.md) embedded in the request to your backend server.
