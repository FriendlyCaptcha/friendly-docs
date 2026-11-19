---
description: Instructions for AI coding agents that add Friendly Captcha v2 to a project, covering the widget, server-side verification, and the API key.
---

# Integrate with an AI agent

This page is written for AI coding agents that add Friendly Captcha to a project. If you're a person, point your agent to this page and give it your sitekey.

The steps below protect a form on both the frontend and the backend. The widget on its own doesn't stop bots. Bots are only stopped once the backend verifies the response.

## Before you start

You need two values from the user.

- The **sitekey**, which starts with `FC`. It's public, so it can go in the code.
- The **API key**. It's secret. Don't ask the user to paste it into the chat, and never write it into the code. Read it from the `FRC_API_KEY` environment variable and add `FRC_API_KEY` to `.env.example`, or to wherever the project documents its configuration.

Also ask whether the app uses the EU endpoint. If it does, set the endpoint to `eu` in both the widget and the server SDK. Otherwise leave it out.

Find out which framework and language the project uses, and follow its conventions.

## Use v2, not v1

These instructions are for Friendly Captcha v2. Don't use the v1 packages, which you may know from older code.

| | v2 (use this) | v1 (don't use) |
|---|---|---|
| Frontend package | `@friendlycaptcha/sdk` | `friendly-challenge` |
| Form field | `frc-captcha-response` | `frc-captcha-solution` |
| Verify endpoint | `/api/v2/captcha/siteverify` | `/api/v1/siteverify` |

If the project already uses v1, follow [Upgrading from v1](./upgrading-from-v1/index.md) instead.

## Frontend

If the project has a bundler or uses a JavaScript framework like React, Vue, or Svelte, install the npm package and create the widget from code. [Install the widget](../getting-started/install.md#option-b-programmatically-javascript-sdk) shows how.

```shell
npm install @friendlycaptcha/sdk
```

Otherwise, add the scripts to the page and put the widget element inside the form.

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.5/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.5/site.compat.min.js" async defer></script>

<div class="frc-captcha" data-sitekey="<sitekey>"></div>
```

For the EU endpoint, add `data-api-endpoint="eu"` to the element, or pass `apiEndpoint: "eu"` when creating the SDK.

When the widget finishes, it adds a hidden field named `frc-captcha-response` to the form.

## Backend

In the handler that receives the form, read `frc-captcha-response` from the submission and verify it with the official server SDK for the backend language.

| Language | Package | Install |
|---|---|---|
| JavaScript and TypeScript | [`@friendlycaptcha/server-sdk`](https://github.com/FriendlyCaptcha/friendly-captcha-javascript) | `npm install @friendlycaptcha/server-sdk` |
| PHP | [`friendlycaptcha/sdk`](https://github.com/FriendlyCaptcha/friendly-captcha-php) | `composer require friendlycaptcha/sdk` |
| Python | [`friendly-captcha-client`](https://github.com/FriendlyCaptcha/friendly-captcha-python) | `pip install friendly-captcha-client` |
| Go | [`friendly-captcha-go`](https://github.com/FriendlyCaptcha/friendly-captcha-go) | `go get github.com/friendlycaptcha/friendly-captcha-go` |

Configure the client with the API key from `FRC_API_KEY`, the sitekey, and the EU endpoint if the app uses it. Each SDK's README shows the options.

Then handle the result like this.

- Reject the submission when the SDK says to reject it. This includes a missing `frc-captcha-response` field.
- When the SDK says it wasn't able to verify, log an error. That means a wrong API key, a wrong configuration, or an outage. The SDK accepts the submission in that case, so real users can still send the form while it's fixed.

Here's what that looks like with the JavaScript SDK.

```javascript
import { FriendlyCaptchaClient } from "@friendlycaptcha/server-sdk";

const frc = new FriendlyCaptchaClient({
  apiKey: process.env.FRC_API_KEY,
  sitekey: "<sitekey>",
});

// In the handler that receives the form:
const result = await frc.verifyCaptchaResponse(req.body["frc-captcha-response"]);
if (!result.wasAbleToVerify()) {
  console.error("Friendly Captcha verification failed", result.getErrorCode());
}
if (result.shouldReject()) {
  // Reject the submission.
}
```

If there's no SDK for the language, send the request yourself as described in [Verify the response](../getting-started/verify.md). Use `https://global.frcapi.com/api/v2/captcha/siteverify`, or `https://eu.frcapi.com/api/v2/captcha/siteverify` for the EU endpoint.

## Sites on a CMS

If the site runs on WordPress, TYPO3, Magento, or another CMS or shop system, use its Friendly Captcha plugin instead of writing code. The [integrations page](/integrations) lists them.

## Check that it works

1. Load the page with the form. The widget should appear and finish on its own.
2. Submit the form. The backend should accept it.
3. Submit the form without the widget, for example by removing the field. The backend should reject it.

For automated tests, see [Automated testing](./automated-testing.md).

## When you're done

Tell the user which files you changed, that they need to set `FRC_API_KEY`, and how to test it.
