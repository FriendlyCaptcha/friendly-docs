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

If you are creating widgets programmatically you can use the `language` field in the [configuration object](../sdk/reference/sdk.createwidgetoptions.md).

## Language Codes

| Language | Code  | % Complete              |
|----------|-------|-------------------------|
| :flag-cs: **Czech** \| *Čeština* | `"cs"`, `"cs-CZ"`| 100% |
| :flag-dk: **Danish** \| *Dansk* | `"da"`, `"da-DK"`| 100% |
| :flag-nl: **Dutch** \| *Nederlands* | `"nl"`, `"nl-NL"`| 100% |
| :flag-us: **English** | `"en"`, `"en-US"`| 100% |
| :flag-gb: **English (UK)** |`"en-GB"`| 100% |
| :flag-fr: **French** \| *Français* | `"fr"`, `"fr-FR"`| 100% |
| :flag-de: **German** \| *Deutsch* | `"de"`, `"de-DE"`| 100% |
| :flag-hu: **Hungarian** \| *Magyar* | `"hu"`, `"hu-HU"`| 52% |
| :flag-it: **Italian** \| *Italiano* | `"it"`, `"it-IT"`| 100% |
| :flag-pt: **Portuguese** \| *Português* | `"pt"`, `"pt-PT"`, `"pt-BR"`| 100% |
| :flag-es: **Spanish** \| *Español* | `"es"`, `"es-ES"`| 100% |
| :flag-es: **Swedish** \| *Svenska* | `"sv"`, `"sv-SE"`| 100% |
| :flag-tr: **Turkish** \| *Türkçe* | `"tr"`, `"tr-TR"`| 100% |

> This table was last updated 2025-02-27.

::::tip Language not supported?

Is your preferred language not in the table above? Please help by [**contributing translations**](https://poeditor.com/join/project/lrdZQ5Uk6D).

::::

