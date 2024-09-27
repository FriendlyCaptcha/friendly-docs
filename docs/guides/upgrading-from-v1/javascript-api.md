# Client (JavaScript API)

## 1. Install the new SDK 
1. Install the `@friendlycaptcha/sdk` NPM package

```shell
# uninstall the package for Friendly Captcha v1
npm remove friendly-challenge
# install the new SDK
npm install @friendlycaptcha/sdk
```

2. Update your imports

```javascript
import { WidgetInstance } from "friendly-challenge";
```

becomes

```javascript
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";
```

## 2. Change how you create widgets

In version one you would create widgets by creating a `WidgetInstance`:

```javascript
const element = document.querySelector("#my-widget");

const myWidget = new WidgetInstance(element, {
    sitekey: "<my sitekey>",
    language: "de", // German widget
    doneCallback: function(response) {
        console.log("Widget completed, the response: ", response)
    },
    errorCallback: function(error) {
        console.err("Something went wrong in solving the captcha: ", error)
    },
    puzzleEndpoint: "https://eu-api.friendlycaptcha.eu/api/v1/puzzle",
    startMode: "auto",
});
```

With version two there are some changes. Here are the most important ones
* You first create an instance of the SDK (`FriendlyCaptchaSDK`)
* You use that SDK to create widgets (`sdk.createWidget(options)`).
* You use [DOM events](../../sdk/events.md) instead of callbacks (`addEventListener`).
* If you are using a custom endpoint, the URL has changed.

```javascript
// Create a SDK instance, you should only create one and re-use it.
const sdk = new FriendlyCaptchaSDK({
    // Optional, if you want to specify a custom endpoint.
    apiEndpoint: "https://eu.frcapi.com/api/v2/captcha"
});

// ...

const element = document.querySelector("#my-widget");

const myWidget = sdk.createWidget({
    element: element,
    sitekey: "<my sitekey>",
    startMode: "auto",
    // If you want to you can still force a specific language using `language: "de"`
    // but it should not be necessary. It will automatically match the lanugage of the webpage.
});

myWidget.addEventListener("frc:widget.complete", (event) => {
    const detail = event.detail;
    console.log("Widget completed, the response: ", detail.response)
})

myWidget.addEventListener("frc:widget.error", (event) => {
    const detail = event.detail;
    console.error("Something went wrong in solving the captcha: ", detail.error)
})

myWidget.addEventListener("frc:widget.expire", (event) => {
    console.warn("The captcha solution is no longer valid, the user waited too long.")
})
```

For details on the Javascript SDK API, see the [documentation](../../sdk).