---
description: Steps for AI coding agents that add Friendly Captcha v2 to a project, from the widget to verifying the response on the backend.
---

# Add Friendly Captcha with an AI agent

This page is for AI coding agents that add Friendly Captcha to a project. If you're a person, point your agent here and give it your sitekey.

You'll protect a form on the frontend and the backend. The widget alone doesn't stop bots. They're only stopped once the backend verifies the response.

## Before you start

You need the sitekey and the API key. The sitekey starts with `FC` and is public, so it can go in the code. The API key is secret. Don't ask for it in the chat and don't write it into the code. Load it the way the project already loads its other secrets, like an environment variable, a secrets manager, or a config file that stays out of git. If the project has no convention yet, use an `FRC_API_KEY` environment variable and add it to `.env.example` or wherever the project documents its config.

Ask whether the app uses the EU endpoint. If it does, set the endpoint to `eu` in the widget and in the server SDK.

Look at the project's framework and language first, and follow its conventions.

## Use v2, not v1

This page covers Friendly Captcha v2. You may know the v1 packages from older code. Don't use them.

| | v2 (use this) | v1 (don't use) |
|---|---|---|
| Frontend package | `@friendlycaptcha/sdk` | `friendly-challenge` |
| Form field | `frc-captcha-response` | `frc-captcha-solution` |
| Verify endpoint | `/api/v2/captcha/siteverify` | `/api/v1/siteverify` |

If the project already uses v1, follow [Upgrading from v1](./upgrading-from-v1/index.md) instead.

## Add the widget

With a bundler or a framework like React, Vue, or Svelte, install the npm package and create the widget in code, as shown in [Install the widget](../getting-started/install.md#option-b-programmatically-javascript-sdk). For React and Vue, the [React](/integrations/react) and [Vue](/integrations/vue) pages have a ready-made component.

```shell
npm install @friendlycaptcha/sdk
```

Without one, add the scripts and put the widget element inside the form.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.5/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.5/site.compat.min.js" async defer></script>

<div class="frc-captcha" data-sitekey="<sitekey>"></div>
```

For the EU endpoint, add `data-api-endpoint="eu"` to the element, or pass `apiEndpoint: "eu"` to `new FriendlyCaptchaSDK()` or `createWidget()`.

The widget adds a hidden `frc-captcha-response` field to the form. Once it's done, the field holds the response your backend verifies.

## Verify the response on the backend

In the handler that receives the form, read `frc-captcha-response` and check it with the official server SDK for the backend's language.

| Language | Package | Install |
|---|---|---|
| JavaScript and TypeScript | [`@friendlycaptcha/server-sdk`](https://github.com/FriendlyCaptcha/friendly-captcha-javascript) | `npm install @friendlycaptcha/server-sdk` |
| PHP | [`friendlycaptcha/sdk`](https://github.com/FriendlyCaptcha/friendly-captcha-php) | `composer require friendlycaptcha/sdk` |
| Python | [`friendly-captcha-client`](https://github.com/FriendlyCaptcha/friendly-captcha-python) | `pip install friendly-captcha-client` |
| Go | [`friendly-captcha-go`](https://github.com/FriendlyCaptcha/friendly-captcha-go) | `go get github.com/friendlycaptcha/friendly-captcha-go` |

Give the client the API key, the sitekey, and the EU endpoint if the app uses it. Each SDK's README lists the options.

Reject the submission when the SDK says to. If the `frc-captcha-response` field is missing, pass an empty string instead. The SDKs reject an empty response, but the JavaScript SDK accepts a missing one the same way it accepts submissions during an outage. When the SDK couldn't verify at all, log an error. That points to a wrong API key, a config mistake, or an outage. The SDK accepts the submission in that case, so real users can still send the form while it's fixed.

Here's the JavaScript SDK as an example, with the key in an `FRC_API_KEY` environment variable.

```javascript
import { FriendlyCaptchaClient } from "@friendlycaptcha/server-sdk";

const frc = new FriendlyCaptchaClient({
  apiKey: process.env.FRC_API_KEY,
  sitekey: "<sitekey>",
});

// In the handler that receives the form:
const result = await frc.verifyCaptchaResponse(req.body["frc-captcha-response"] ?? "");
if (!result.wasAbleToVerify()) {
  console.error("Friendly Captcha verification failed", result.getErrorCode());
}
if (result.shouldReject()) {
  // Reject the submission.
}
```

If the language has no SDK, send the request yourself as described in [Verify the response](../getting-started/verify.md). Use `https://global.frcapi.com/api/v2/captcha/siteverify`, or `https://eu.frcapi.com/api/v2/captcha/siteverify` for the EU endpoint.

## Sites on a CMS

For WordPress, TYPO3, Magento, or another CMS or shop system, use its Friendly Captcha plugin instead of writing code. The [integrations page](/integrations) lists them.

## Check that it works

Load the page with the form and click into it. The widget should start solving. Depending on the app's widget mode, it finishes on its own or asks for a click. Submit the form and check that the backend accepts it. Then submit it without the `frc-captcha-response` field and check that the backend rejects it.

For automated tests, see [Automated testing](./automated-testing.md).

## When you're done

Tell the user which files you changed, where to put the API key, and how to test it.
