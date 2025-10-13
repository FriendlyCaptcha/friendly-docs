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
| 🇪🇬 **Arabic** \| *العربية* | `"ar"`, `"ar-EG"`| 98% |
| 🇧🇬 **Bulgarian** \| *български* | `"bg"`, `"bg-BG"`| 100% |
| 🇪🇸 **Catalan** \| *Català* | `"ca"`, `"ca-ES"`| 98% |
| 🇨🇳 **Chinese (simplified)** \| *汉语* | `"zh"`, `"zh-CN"`, `"zh-Hans"`| 98% |
| 🇹🇼 **Chinese (traditional)** \| *漢語* |`"zh-TW"`, `"zh-Hant"`| 98% |
| 🇨🇿 **Czech** \| *Čeština* | `"cs"`, `"cs-CZ"`| 96% |
| 🇩🇰 **Danish** \| *Dansk* | `"da"`, `"da-DK"`| 96% |
| 🇳🇱 **Dutch** \| *Nederlands* | `"nl"`, `"nl-NL"`| 100% |
| 🇺🇸 **English** | `"en"`, `"en-US"`| 100% |
| 🇬🇧 **English (UK)** |`"en-GB"`| 100% |
| 🇫🇮 **Finnish** \| *Suomi* | `"fi"`, `"fi-FI"`| 96% |
| 🇫🇷 **French** \| *Français* | `"fr"`, `"fr-FR"`| 96% |
| 🇩🇪 **German** \| *Deutsch* | `"de"`, `"de-DE"`| 100% |
| 🇮🇳 **Hindi** \| *हिंदी* | `"hi"`, `"hi-IN"`| 98% |
| 🇭🇺 **Hungarian** \| *Magyar* | `"hu"`, `"hu-HU"`| 60% |
| 🇮🇩 **Indonesian** \| *Indonesia* | `"id"`, `"id-ID"`| 98% |
| 🇮🇹 **Italian** \| *Italiano* | `"it"`, `"it-IT"`| 96% |
| 🇯🇵 **Japanese** \| *日本語* | `"ja"`, `"ja-JP"`| 100% |
| 🇳🇴 **Norwegian Bokmål** \| *Norsk Bokmål* | `"nb"`, `"nb-NO"`| 100% |
| 🇵🇱 **Polish** \| *Polski* | `"pl"`, `"pl-PL"`| 96% |
| 🇵🇹 **Portuguese** \| *Português* | `"pt"`, `"pt-PT"`, `"pt-BR"`| 96% |
| 🇷🇺 **Russian** \| *Русский* | `"ru"`, `"ru-RU"`| 98% |
| 🇸🇰 **Slovak** \| *Slovenčina* | `"sk"`, `"sk-SK"`| 98% |
| 🇸🇮 **Slovenian** \| *Slovenščina* | `"sl"`, `"sl-SI"`| 100% |
| 🇪🇸 **Spanish** \| *Español* | `"es"`, `"es-ES"`| 96% |
| 🇸🇪 **Swedish** \| *Svenska* | `"sv"`, `"sv-SE"`| 98% |
| 🇹🇭 **Thai** \| *ไทย* | `"th"`, `"th-TH"`| 98% |
| 🇹🇷 **Turkish** \| *Türkçe* | `"tr"`, `"tr-TR"`| 96% |
| 🇻🇳 **Vietnamese** \| *Tiếng Việt* | `"vi"`, `"vi-VN"`| 98% |

> This table was last updated 2025-10-14.

::::tip Language not supported?

Is your preferred language not in the table above? Please help by [**contributing translations**](https://poeditor.com/join/project/lrdZQ5Uk6D).

::::
