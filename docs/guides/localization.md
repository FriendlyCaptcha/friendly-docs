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
| 🇪🇬 **Arabic** \| *العربية* | `"ar"`, `"ar-EG"`| 89% |
| 🇪🇸 **Basque** \| *Euskera* | `"eu"`, `"eu-ES"`| 98% |
| 🇧🇦 **Bosnian** \| *Bosanski* | `"bs"`, `"bs-BA"`| 95% |
| 🇧🇬 **Bulgarian** \| *български* | `"bg"`, `"bg-BG"`| 91% |
| 🇪🇸 **Catalan** \| *Català* | `"ca"`, `"ca-ES"`| 95% |
| 🇨🇳 **Chinese (simplified)** \| *汉语* | `"zh"`, `"zh-CN"`, `"zh-Hans"`| 89% |
| 🇹🇼 **Chinese (traditional)** \| *漢語* |`"zh-TW"`, `"zh-Hant"`| 89% |
| 🇭🇷 **Croatian** \| *Hrvatski* | `"hr"`, `"hr-HR"`| 95% |
| 🇨🇿 **Czech** \| *Čeština* | `"cs"`, `"cs-CZ"`| 88% |
| 🇩🇰 **Danish** \| *Dansk* | `"da"`, `"da-DK"`| 91% |
| 🇳🇱 **Dutch** \| *Nederlands* | `"nl"`, `"nl-NL"`| 100% |
| 🇺🇸 **English** | `"en"`, `"en-US"`| 100% |
| 🇬🇧 **English (UK)** |`"en-GB"`| 100% |
| 🇪🇪 **Estonian** \| *Eesti keel* | `"et"`, `"et-EE"`| 96% |
| 🇫🇮 **Finnish** \| *Suomi* | `"fi"`, `"fi-FI"`| 89% |
| 🇫🇷 **French** \| *Français* | `"fr"`, `"fr-FR"`| 91% |
| 🇩🇪 **German** \| *Deutsch* | `"de"`, `"de-DE"`| 96% |
| 🇬🇷 **Greek** \| *Ελληνικά* | `"el"`, `"el-GR"`| 95% |
| 🇮🇳 **Hindi** \| *हिंदी* | `"hi"`, `"hi-IN"`| 89% |
| 🇭🇺 **Hungarian** \| *Magyar* | `"hu"`, `"hu-HU"`| 59% |
| 🇮🇩 **Indonesian** \| *Indonesia* | `"id"`, `"id-ID"`| 89% |
| 🇮🇹 **Italian** \| *Italiano* | `"it"`, `"it-IT"`| 91% |
| 🇯🇵 **Japanese** \| *日本語* | `"ja"`, `"ja-JP"`| 91% |
| 🇰🇷 **Korean** \| *오류* | `"ko"`, `"ko-KR"`| 95% |
| 🇱🇻 **Latvian** \| *Latviešu valoda* | `"lv"`, `"lv-LV"`| 95% |
| 🇱🇹 **Lithuanian** \| *Lietuvių kalba* | `"lt"`, `"lt-LT"`| 95% |
| 🇳🇴 **Norwegian Bokmål** \| *Norsk Bokmål* | `"nb"`, `"nb-NO"`| 91% |
| 🇵🇱 **Polish** \| *Polski* | `"pl"`, `"pl-PL"`| 91% |
| 🇵🇹 **Portuguese** \| *Português* | `"pt"`, `"pt-PT"`, `"pt-BR"`| 91% |
| 🇷🇴 **Romanian** \| *Romana* | `"ro"`, `"ro-RO"`| 95% |
| 🇷🇺 **Russian** \| *Русский* | `"ru"`, `"ru-RU"`| 89% |
| 🇷🇸 **Serbian** \| *Srpski* | `"sr"`, `"sr-RS"`| 95% |
| 🇸🇰 **Slovak** \| *Slovenčina* | `"sk"`, `"sk-SK"`| 89% |
| 🇸🇮 **Slovenian** \| *Slovenščina* | `"sl"`, `"sl-SI"`| 95% |
| 🇪🇸 **Spanish** \| *Español* | `"es"`, `"es-ES"`| 91% |
| 🇸🇪 **Swedish** \| *Svenska* | `"sv"`, `"sv-SE"`| 89% |
| 🇹🇭 **Thai** \| *ไทย* | `"th"`, `"th-TH"`| 89% |
| 🇹🇷 **Turkish** \| *Türkçe* | `"tr"`, `"tr-TR"`| 88% |
| 🇺🇦 **Ukrainian** \| *Українська* | `"uk"`, `"uk-UA"`| 95% |
| 🇻🇳 **Vietnamese** \| *Tiếng Việt* | `"vi"`, `"vi-VN"`| 89% |

> This table was last updated 2026-06-23.



::::tip Language not supported?

Is your preferred language not in the table above? Please help by [**contributing translations**](https://poeditor.com/join/project/lrdZQ5Uk6D).

::::
