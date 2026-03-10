# Generate a Risk Intelligence token

You can generate a token directly using [JavaScript](#javascript), or you can use an [HTML element](#html) to automatically generate a token and embed it in a `<form>` element.

---

## JavaScript

### Install the library

```console
npm install @friendlycaptcha/sdk
```

### Generate the token

```javascript
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";

// You only need to instantiate one SDK object.
const sdk = new FriendlyCaptchaSDK();

const data = await sdk.riskIntelligence({
    sitekey: "<your sitekey>",
});

// `data` is an object with `token` and `expiresAt` properties.
```

### Configuration

You can configure the call to `sdk.riskIntelligence()` with a few different parameters. For details, see the [SDK reference](../../sdk/reference/sdk.friendlycaptchasdk.riskintelligence.md).

---

## HTML

You can use the same *`site`* script that you use for installing Friendly Captcha widgets to automatically generate Risk Intelligence tokens.

The script searches for HTML elements with the `frc-risk-intelligence` class and generates tokens for each element, embedding them in a hidden `<input>` element if they are located within a `<form>` element.

### Add the scripts

Include these two scripts in your HTML.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.2.0/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.2.0/site.compat.min.js" async defer></script>
```

:::tip Using the scripts without a CDN (i.e. self-hosting)

Using `cdn.jsdelivr.net` is optional. If preferred, you can self-host the scripts. [Download the latest release files](https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.2.0) and serve them from your own server.
Remember to update these scripts regularly.

`cdn.jsdelivr.net` is blocked in some jurisdictions, like some parts of China. If your website needs to be reachable from these jurisdictions, we recommend that you self-host the scripts.

:::

### Include the elements

Insert HTML elements with a class of `frc-risk-intelligence` inside a `<form>`, and tokens will automatically be generated and embedded within hidden `<input>` elements in the form.

```html
<form>
    <!-- other form elements -->
    <div class="frc-risk-intelligence" data-sitekey="<your sitekey>"></div>
    <!-- other form elements -->
</form>
```

When the form is submitted, the request will include a Risk Intelligence token called `frc-risk-intelligence-token` (though this name can be configured).

### Configuration

You can configure the Risk Intelligence call by setting `data-*` attributes on the HTML element.

#### `data-sitekey`

**Required**. The sitekey for your Friendly Captcha application. See [the previous step](./setup.md#sitekey) for instructions on creating one. Starts with `FC`.

##### Example

```html
<div class="frc-risk-intelligence" data-sitekey="<your sitekey>"></div>
```

#### `data-api-endpoint`

_Only relevant if you are using our [dedicated EU endpoint service](../../guides/eu-endpoint.md)._

By default the API is served from `https://global.frcapi.com/api/v2/riskIntelligence`. As a premium service we offer an alternative endpoint that serves requests from datacenters in Germany only. You can specify `"eu"` or `"global"`, or a URL.

##### Example

```html
<!-- Use the dedicated EU endpoint -->
<div
  class="frc-risk-intelligence"
  data-sitekey="<my sitekey>"
  data-api-endpoint="eu"
></div>
```

#### `data-start`

You can specify when the Risk Intelligence token should be generated using the `data-start` attribute. Here are the possible values:

* `auto`: The token will be generated as soon as possible (i.e., once the element and SDK have loaded).
* `focus` (**Default**): The token will be generated as soon as the element's parent `<form>` fires the `focusin` event.

##### Example

```html
<div
  class="frc-risk-intelligence"
  data-sitekey="<my sitekey>"
  data-start="auto"
></div>
```

#### `data-form-field-name`

By default, a hidden `<input>` field is created in the element's parent `<form>` with a `name="frc-risk-intelligence-token"` attribute. You can use `data-form-field-name` to change the `name` attribute of this hidden input. This can be useful for integrations with certain frameworks and content management systems.

##### Example

```html
<div
  class="frc-risk-intelligence"
  data-sitekey="<my sitekey>"
  data-form-field-name="my-token-param"
></div>
```

### Events

If you create the Risk Intelligence token using an HTML element, the element will fire a number of JavaScript events that you can use to respond to changes in the token's lifecycle.

The examples below assume the following markup (a `<div>` with an `id` of `"risk-intelligence-el"`).

```html
<div
  id="risk-intelligence-el"
  class="frc-risk-intelligence"
  data-sitekey="<my sitekey>"
></div>
```

#### `frc:riskintelligence.complete`

Fires when the token generation is complete and the token is available.

```js
const el = document.getElementById("risk-intelligence-el");
el.addEventListener("frc:riskintelligence.complete", function (e) {
  console.info("Token generated", e.detail.token, e.detail.expiresAt);
});
```

For more information, see the SDK reference for [`frc:riskintelligence.complete`](../../sdk/reference/sdk.frcriskintelligencecompleteevent.md).

#### `frc:riskintelligence.error`

Fires if the token generation errors.

```js
const el = document.getElementById("risk-intelligence-el");
el.addEventListener("frc:riskintelligence.error", function (e) {
  console.warn("Failed to generate token", e.detail.error);
});
```

For more information, see the SDK reference for [`frc:riskintelligence.error`](../../sdk/reference/sdk.frcriskintelligenceerrorevent.md).

#### `frc:riskintelligence.expire`

Fires when the token expires.

```js
const el = document.getElementById("risk-intelligence-el");
el.addEventListener("frc:riskintelligence.expire", function () {
  console.info("Token expired.");
});
```

For more information, see the SDK reference for [`frc:riskintelligence.expire`](../../sdk/reference/sdk.frcriskintelligenceexpireevent.md).

---

## Caching

The SDK caches generated tokens to improve performance and efficiency. For example, if two `sdk.riskIntelligence()` calls get made (with the same sitekey and to the same API endpoint), they will receive the same token. Tokens are cached for approximately **15 minutes**. You can disable this behavior by setting the `bypassCache` configuration parameter.

```js
const data = await sdk.riskIntelligence({
    sitekey: "<your sitekey>",
    bypassCache: true,
});
```

You can also clear currently cached Risk Intelligence tokens using the following SDK function.

```js
await sdk.clearRiskIntelligence();
```

You can configure the cache-clearing behavior of this function. See the SDK reference for [`sdk.clearRiskIntelligence()`](../../sdk/reference/sdk.friendlycaptchasdk.clearriskintelligence.md).

---

## Using the token

Once you have a token, you can send it in a `fetch` request or embed it in a `form` to be submitted to your server.

```javascript
fetch("/api/action", {
  body: { token: data.token },
});
```

With the token sent to your server, the next step is to use it to [retrieve Risk Intelligence data](./retrieve.md).
