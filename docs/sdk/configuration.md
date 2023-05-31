---
sidebar_position: 1
---

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

### `data-response-field-name`
By default a hidden form field with name `frc-captcha-response` is created. You can change the name of this field by setting this attribute, which can be useful for integrations with certain frameworks and content management systems.

Example:
```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-solution-field-name="my-captcha-solution-field"></div>
```

### `data-api-endpoint`
*Only relevant if you are using our [dedicated EU endpoint service](TODO)*.
By default the widget fetches puzzles from `https://global.frcapi.com/api/v1/puzzle`, which serves puzzles globally. As a premium service we offer an alternative endpoint that serves requests from datacenters in Germany only.

Example:
```html
<!-- Use the dedicated EU endpoint -->
<div class="frc-captcha" data-sitekey="<my sitekey>" data-api-endpoint="eu"></div>
```

### `lang` attribute
You can use this to force a specific language.

We recommend you **only use this if you have to**. The widget [automatically detects and matches the language](./advanced/localization.md) of your website.

Example:
```html
<!-- This will force a widget with German text -->
<div class="frc-captcha" data-sitekey="<my sitekey>" lang="de"></div>
```

## Javascript SDK