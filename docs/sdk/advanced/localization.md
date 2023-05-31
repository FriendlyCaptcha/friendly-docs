---
sidebar_position: 30
---

# Language Detection

If your website is in German it makes sense to have the widget in German too.

::::tip

In most cases you don't have to do anything. The widget will match the language of your website.

::::

## Automatic language detection
The widget looks at the first HTML `lang` attribute it finds above itself to determinte the language to use.

A best practice for any HTML page is to have a `lang` set at the root level:
```html
<html lang="fr">
<!-- Any widgets here will be in French -->
</html>
```

### Fallback

If no `lang` attribute is found above the widget or an unsupported language is requested, the language is determined by the headers automatically sent by the user's browser. This is usually the user's operating system language.

If that also results only in unsupported languages, the widget will default to English.

### Forcing a specific language
To force a specific language you can set the `lang` attribute on the HTML element the widget is mounted to.

```html
<!-- Example for a German widget-->
<div class="frc-captcha" lang="de" data-sitekey="<my sitekey>"></div>
```

If you are creating widgets programmatically you can use the `language` field in the [configuration object](./reference/friendly-captcha-sdk.createwidgetoptions).

## Language Codes
| Language       | Code  |
|------------|----------------|
| 🇺🇸 English | `"en"`         |
| 🇳🇱 Dutch   | `"nl"`         |



Is your preferred language not in the list above? You can contribute translations [here](TODO).
