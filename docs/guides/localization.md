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
| 🇪🇬 **Arabic** \| *العربية* | `"ar"`, `"ar-EG"`| 88% |
| 🇪🇸 **Basque** \| *Euskera* | `"eu"`, `"eu-ES"`| 96% |
| 🇧🇦 **Bosnian** \| *Bosanski* | `"bs"`, `"bs-BA"`| 93% |
| 🇧🇬 **Bulgarian** \| *български* | `"bg"`, `"bg-BG"`| 89% |
| 🇪🇸 **Catalan** \| *Català* | `"ca"`, `"ca-ES"`| 93% |
| 🇨🇳 **Chinese (simplified)** \| *汉语* | `"zh"`, `"zh-CN"`, `"zh-Hans"`| 88% |
| 🇹🇼 **Chinese (traditional)** \| *漢語* |`"zh-TW"`, `"zh-Hant"`| 88% |
| 🇭🇷 **Croatian** \| *Hrvatski* | `"hr"`, `"hr-HR"`| 93% |
| 🇨🇿 **Czech** \| *Čeština* | `"cs"`, `"cs-CZ"`| 86% |
| 🇩🇰 **Danish** \| *Dansk* | `"da"`, `"da-DK"`| 91% |
| 🇳🇱 **Dutch** \| *Nederlands* | `"nl"`, `"nl-NL"`| 100% |
| 🇺🇸 **English** | `"en"`, `"en-US"`| 100% |
| 🇬🇧 **English (UK)** |`"en-GB"`| 100% |
| 🇪🇪 **Estonian** \| *Eesti keel* | `"et"`, `"et-EE"`| 95% |
| 🇫🇮 **Finnish** \| *Suomi* | `"fi"`, `"fi-FI"`| 88% |
| 🇫🇷 **French** \| *Français* | `"fr"`, `"fr-FR"`| 91% |
| 🇩🇪 **German** \| *Deutsch* | `"de"`, `"de-DE"`| 96% |
| 🇬🇷 **Greek** \| *Ελληνικά* | `"el"`, `"el-GR"`| 93% |
| 🇮🇳 **Hindi** \| *हिंदी* | `"hi"`, `"hi-IN"`| 88% |
| 🇭🇺 **Hungarian** \| *Magyar* | `"hu"`, `"hu-HU"`| 100% |
| 🇮🇩 **Indonesian** \| *Indonesia* | `"id"`, `"id-ID"`| 88% |
| 🇮🇹 **Italian** \| *Italiano* | `"it"`, `"it-IT"`| 91% |
| 🇯🇵 **Japanese** \| *日本語* | `"ja"`, `"ja-JP"`| 89% |
| 🇰🇷 **Korean** \| *한국어* | `"ko"`, `"ko-KR"`| 100% |
| 🇱🇻 **Latvian** \| *Latviešu valoda* | `"lv"`, `"lv-LV"`| 100% |
| 🇱🇹 **Lithuanian** \| *Lietuvių kalba* | `"lt"`, `"lt-LT"`| 100% |
| 🇳🇴 **Norwegian Bokmål** \| *Norsk Bokmål* | `"nb"`, `"nb-NO"`| 89% |
| 🇵🇱 **Polish** \| *Polski* | `"pl"`, `"pl-PL"`| 89% |
| 🇵🇹 **Portuguese** \| *Português* | `"pt"`, `"pt-PT"`, `"pt-BR"`| 91% |
| 🇷🇴 **Romanian** \| *Romana* | `"ro"`, `"ro-RO"`| 93% |
| 🇷🇺 **Russian** \| *Русский* | `"ru"`, `"ru-RU"`| 88% |
| 🇷🇸 **Serbian** \| *Srpski* | `"sr"`, `"sr-RS"`| 93% |
| 🇸🇰 **Slovak** \| *Slovenčina* | `"sk"`, `"sk-SK"`| 88% |
| 🇸🇮 **Slovenian** \| *Slovenščina* | `"sl"`, `"sl-SI"`| 93% |
| 🇪🇸 **Spanish** \| *Español* | `"es"`, `"es-ES"`| 91% |
| 🇸🇪 **Swedish** \| *Svenska* | `"sv"`, `"sv-SE"`| 88% |
| 🇹🇭 **Thai** \| *ไทย* | `"th"`, `"th-TH"`| 88% |
| 🇹🇷 **Turkish** \| *Türkçe* | `"tr"`, `"tr-TR"`| 86% |
| 🇺🇦 **Ukrainian** \| *Українська* | `"uk"`, `"uk-UA"`| 93% |
| 🇻🇳 **Vietnamese** \| *Tiếng Việt* | `"vi"`, `"vi-VN"`| 88% |

> This table was last updated 2026-11-23.



::::tip Language not supported?

Is your preferred language not in the table above? Please help by [**contributing translations**](https://poeditor.com/join/project/lrdZQ5Uk6D).

::::
