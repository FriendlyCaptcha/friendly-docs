# Dedicated EU Endpoint

By default the FriendlyCaptcha widget talks to our global service served from all over the world to retrieve CAPTCHA challenges. Depending on your user's geography, this request may be served from outside the EU.

As a premium feature we offer a dedicated forwarding endpoint hosted in Germany as an additional guarantee that the personal information (i.e. visitor IP addresses) never leave the EU.

:::info

Using this service requires a **Friendly Captcha Advanced** or **Enterprise** plan.

:::

## Enabling the EU endpoint

Open your [Applications page](https://app.friendlycaptcha.eu/dashboard/accounts/-/apps) and click **Manage** on the app you want to enable the EU endpoint for.

In the **API Endpoint** section you can enable and disable the endpoints that your widget can use to fetch CAPTCHA challenges.

:::info

We advise you to enable both for now. Later when you confirm everything is working you can disable the global endpoint.

:::

## Configuring the widget

The widget uses the global endpoint by default, so you will need to configure it to use the EU endpoint instead.

You can use the `data-api-endpoint` HTML attribute:

```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-api-endpoint="eu"></div>
```

Or if you are using the [JavaScript widget API](../sdk/configuration#javascript-sdk) you can specify it in the options passed in the constructor:

```javascript
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk"

const sdk = new FriendlyCaptchaSDK();
const mount = document.querySelector("#my-widget");

const widget = sdk.createWidget({
    element: mount,
    sitekey: "<your sitekey>",
    apiEndpoint: "eu",
});
```

With this change, the widget will only ever make requests to our EU endpoint. No changes are required for the verification of submitted solutions.

## Fallback to global service

Although we work hard to make sure it never happens, disaster may one day strike (e.g. a meteor strike to our German data center). In case our EU endpoint service goes down you can instruct your widget to use the global service as a fallback.

You can do this by specifying both endpoints separated with a comma (`,`) in order of preference:

```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-api-endpoint="eu,global"></div>
```

## EU Verification Endpoint

Your servers can also use our EU endpoint for the verification of submitted challenge solutions.

Instead of the [usual verification endpoint](../api/siteverify) your server makes the POST request to `https://eu.frcapi.com/api/v2/captcha/siteverify`.

## Reference

For reference, here are the two `siteverify` endpoints for your back-end integration.

### 🌍 Global

```
https://global.frcapi.com/api/v2/captcha/siteverify
```

### 🇪🇺 EU

```
https://eu.frcapi.com/api/v2/captcha/siteverify
```

When configuring the widget in your front-end, can you can just specify `eu` or `global`.

## Troubleshooting

If your widget or the browser console shows **Endpoint not allowed** or **403 Forbidden**, double-check that the you enabled the configured endpoint for the given sitekey.

If you run into any other issues you can of course always reach out.
