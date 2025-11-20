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
| 🇪🇬 **Arabic** \| *العربية* | `"ar"`, `"ar-EG"`| 94% |
| 🇧🇬 **Bulgarian** \| *български* | `"bg"`, `"bg-BG"`| 96% |
| 🇪🇸 **Catalan** \| *Català* | `"ca"`, `"ca-ES"`| 94% |
| 🇨🇳 **Chinese (simplified)** \| *汉语* | `"zh"`, `"zh-CN"`, `"zh-Hans"`| 94% |
| 🇹🇼 **Chinese (traditional)** \| *漢語* |`"zh-TW"`, `"zh-Hant"`| 94% |
| 🇨🇿 **Czech** \| *Čeština* | `"cs"`, `"cs-CZ"`| 92% |
| 🇩🇰 **Danish** \| *Dansk* | `"da"`, `"da-DK"`| 92% |
| 🇳🇱 **Dutch** \| *Nederlands* | `"nl"`, `"nl-NL"`| 96% |
| 🇺🇸 **English** | `"en"`, `"en-US"`| 100% |
| 🇬🇧 **English (UK)** |`"en-GB"`| 100% |
| 🇫🇮 **Finnish** \| *Suomi* | `"fi"`, `"fi-FI"`| 92% |
| 🇫🇷 **French** \| *Français* | `"fr"`, `"fr-FR"`| 92% |
| 🇩🇪 **German** \| *Deutsch* | `"de"`, `"de-DE"`| 96% |
| 🇮🇳 **Hindi** \| *हिंदी* | `"hi"`, `"hi-IN"`| 94% |
| 🇭🇺 **Hungarian** \| *Magyar* | `"hu"`, `"hu-HU"`| 58% |
| 🇮🇩 **Indonesian** \| *Indonesia* | `"id"`, `"id-ID"`| 94% |
| 🇮🇹 **Italian** \| *Italiano* | `"it"`, `"it-IT"`| 92% |
| 🇯🇵 **Japanese** \| *日本語* | `"ja"`, `"ja-JP"`| 96% |
| 🇳🇴 **Norwegian Bokmål** \| *Norsk Bokmål* | `"nb"`, `"nb-NO"`| 96% |
| 🇵🇱 **Polish** \| *Polski* | `"pl"`, `"pl-PL"`| 92% |
| 🇵🇹 **Portuguese** \| *Português* | `"pt"`, `"pt-PT"`, `"pt-BR"`| 92% |
| 🇷🇴 **Romanian** \| *Romana* | `"ro"`, `"ro-RO"`| 100% |
| 🇷🇺 **Russian** \| *Русский* | `"ru"`, `"ru-RU"`| 94% |
| 🇸🇰 **Slovak** \| *Slovenčina* | `"sk"`, `"sk-SK"`| 94% |
| 🇸🇮 **Slovenian** \| *Slovenščina* | `"sl"`, `"sl-SI"`| 100% |
| 🇪🇸 **Spanish** \| *Español* | `"es"`, `"es-ES"`| 92% |
| 🇸🇪 **Swedish** \| *Svenska* | `"sv"`, `"sv-SE"`| 94% |
| 🇹🇭 **Thai** \| *ไทย* | `"th"`, `"th-TH"`| 94% |
| 🇹🇷 **Turkish** \| *Türkçe* | `"tr"`, `"tr-TR"`| 92% |
| 🇻🇳 **Vietnamese** \| *Tiếng Việt* | `"vi"`, `"vi-VN"`| 94% |

> This table was last updated 2025-11-20.



::::tip Language not supported?

Is your preferred language not in the table above? Please help by [**contributing translations**](https://poeditor.com/join/project/lrdZQ5Uk6D).

::::
