# Configuration

There are two ways you can configure the behavior of the widget.

* You can use **HTML attributes** (such as `data-start`). This is the method you usually use if you installed the widget to your website by adding a `<script>` tag.
* Alternatively, you can use the **Javascript SDK** and create widgets programmatically.

:::tip
To respond to changes in the widget such as the captcha being completed, please see the [**events page**](./events.md).
:::

## HTML Attributes

### `data-sitekey` attribute
This field is how you specify the sitekey for a given widget.

Example:
```html
<div class="frc-captcha" data-sitekey="<my sitekey>"></div>
```

### `data-start` attribute
You can specify when the widget should start solving a puzzle, you can specify the `data-start` attribute with one of the following values:
   * `auto`: the solver will start as soon as possible. This is recommended if the user will definitely be submitting the CAPTCHA solution (e.g. there is only one form on the page), this offers the best user experience.
   * `focus`: as soon as the form containing the widget fires the `focusin` event the solver starts, or when the user presses the start button in the widget. This is recommended for webpages where only few users will actually submit the form. **This is the default.**
   * `none`: the solver only starts when the user presses the button or it is programatically started by calling `start()`.

Example:
```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-start="auto"></div>
```

:::info[A note on clicking]

One possible source of confusion lies in the distinction between a widget solving and completing. The `data-start` attribute (or `startMode` option for the [JavaScript SDK](reference/sdk.createwidgetoptions#properties)) controls when the widget can start **solving** puzzles. With a start mode of `auto` or `focus`, the challenges start solving in the background—automatically. Whether or not a widget can reach its completed state without a click depends on the application's Widget Mode, which is [documented below](#widget-mode).

:::

### `data-form-field-name`
By default a hidden form field with name `frc-captcha-response` is created. You can change the name of this field by setting this attribute, which can be useful for integrations with certain frameworks and content management systems.

Example:
```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-form-field-name="my-captcha-solution-field"></div>
```

### `data-api-endpoint`
*Only relevant if you are using our [dedicated EU endpoint service](../guides/eu-endpoint.md)*.

By default the widget fetches puzzles from `https://global.frcapi.com/api/v2/captcha`, which serves puzzles globally. As a premium service we offer an alternative endpoint that serves requests from datacenters in Germany only. You can either specify a URL, `"eu"` or `"global"`.

Example:
```html
<!-- Use the dedicated EU endpoint -->
<div class="frc-captcha" data-sitekey="<my sitekey>" data-api-endpoint="eu"></div>
```

### `data-theme`
You can match the style of the widget to your website. By default the theme of the widget is light.

- `"light"`: A light theme (default).
- `"dark"`: A dark "night mode" theme.
- `"auto"`: Match the user's operating system or browser preference settings.

Example:
```html
<!-- Renders a dark widget -->
<div class="frc-captcha" data-sitekey="<my sitekey>" data-theme="dark"></div>
```

### `lang` attribute
You can use this to force a specific language.

We recommend you **only use this if you have to**. The widget [automatically detects and matches the language](../guides/localization.md) of your website.

Example:
```html
<!-- This will force a widget with German text -->
<div class="frc-captcha" data-sitekey="<my sitekey>" lang="de"></div>
```

## Javascript SDK
See the [**CreateWidgetOptions**](./reference/sdk.createwidgetoptions.md) for the settings you can pass when creating a widget using `sdk.createWidget()`.

## Widget Mode

The point at which a widget can *begin* solving challenges depends on its [**start mode**](#data-start-attribute). Whether or not the widget will automatically *complete* depends on a different configuration option: the **Widget Mode**.

A widget can be configured with one of 3 different Widget Modes:

- **One-click:** a user must click once on the widget in order for it to complete.
- **Zero-click:** the widget will complete automatically, with no user interaction.
- **Smart (default):** the widget intelligently decides, based on signals from the current browsing session, whether or not a click is needed to complete.

There is a trade-off between requiring a click or not. A widget that completes without user interaction presents the least friction, but requiring just a single click allows us to identify bots with much greater accuracy. For that reason, we recommend sticking with the default, which is to allow the widget to decide when to require a click.

:::tip[no traffic lights here]

There are never any tedious tasks like clicking images of traffic lights. One single click is the only required interaction.

:::

The Widget Mode is configured per *application* in the [Friendly Captcha dashboard](https://app.friendlycaptcha.eu). If it were configured on your website (the way start mode is configured), an attacker could change the setting to their advantage.
