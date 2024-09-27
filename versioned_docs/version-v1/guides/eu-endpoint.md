# Dedicated EU Endpoint

By default the FriendlyCaptcha widget talks to our global service served from all over the world to retrieve CAPTCHA puzzles. Depending on your user's geography, this request may be served from outside the EU.

As a premium feature we offer a dedicated forwarding endpoint hosted in Germany as an additional guarantee that the personal information (i.e. visitor IP addresses) never leave the EU.

:::info

Using this service requires a **Friendly Captcha Advanced** or **Enterprise** plan.

:::

## Enabling the EU endpoint

Open your [Applications page](https://app.friendlycaptcha.eu/dashboard/accounts/-/apps) and click **Manage** on the app you want to enable the EU endpoint for.

In the **Puzzle Endpoint** section you can enable and disable the endpoints that your widget can use to fetch CAPTCHA challenges.

:::info

We advise you to enable both for now. Later when you confirm everything is working you can disable the global endpoint.

:::

## Configuring the widget

The widget uses the global endpoint by default, so you will need to configure it to use the EU endpoint instead.

You can use the `data-puzzle-endpoint` HTML attribute:

```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-puzzle-endpoint="https://eu-api.friendlycaptcha.eu/api/v1/puzzle"></div>
```

Or if you are using the [JavaScript widget SDK](../sdk/#javascript-api) you can specify it in the options passed in the constructor:

```javascript
import { WidgetInstance } from "friendly-challenge";

const element = document.querySelector("#my-widget");
const options = {
    puzzleEndpoint: "https://eu-api.friendlycaptcha.eu/api/v1/puzzle",
    /* ... other options */
}
const widget = new WidgetInstance(element, options);
```

With this change, the widget will only ever make requests to our EU endpoint. No changes are required for the verification of submitted solutions.

## Fallback to global service

Although we work hard to make sure it never happens, disaster may one day strike (e.g. a meteor strike to our German data center). In case our EU endpoint service goes down you can instruct your widget to use the global service as a fallback.

You can do this by specifying both endpoints separated with a comma (`,`) in order of preference:

```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-puzzle-endpoint="https://eu-api.friendlycaptcha.eu/api/v1/puzzle,https://api.friendlycaptcha.com/api/v1/puzzle"></div>
```

## EU Verification Endpoint

Your servers can also use our EU endpoint for the verification of submitted puzzles.

Instead of the [usual verification endpoint](../api) your server makes the POST request to `https://eu-api.friendlycaptcha.eu/api/v1/siteverify`.

## Reference

For reference, these are the puzzle and siteverify endpoints.

### Puzzle (used in the widget configuration)

| Endpoint Name   | URL |
|----------------|----------|
| 🌍 Global       | https://api.friendlycaptcha.com/api/v1/puzzle
| 🇪🇺 EU       | https://eu-api.friendlycaptcha.eu/api/v1/puzzle

### Siteverify (used in your backend server)

| Endpoint Name   | URL |
|----------------|----------|
| 🌍 Global       | https://api.friendlycaptcha.com/api/v1/siteverify
| 🇪🇺 EU       | https://eu-api.friendlycaptcha.eu/api/v1/siteverify


## Troubleshooting

If your widget or the browser console shows **Endpoint not allowed** or **403 Forbidden**, double-check that the you enabled the configured endpoint for the given sitekey.

If you run into any other issues you can of course always reach out.
