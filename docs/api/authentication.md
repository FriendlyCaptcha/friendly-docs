---
sidebar_position: 2
---

#  Authentication

To make requests to the Friendly Captcha API you need to prove who you are. You do this by passing an API key in a header.

:::caution

API Keys are secret, please treat them the same way you would handle any other password in your organization.

:::

## `X-API-Key` Header

With every request from your server, you should pass the following header:

| Header Name | Header Value |
|----------------|-----------------------------------------------------|
| `X-API-Key`       | Your API Key (`A1...`) |

## Creating API Keys

You can create API keys in the [Friendly Captcha Dashboard](https://app.friendlycaptcha.eu/dashboard/accounts/-/apikeys).

### Some notes
* API keys can be used to verify captcha respones for all sitekeys in your account.
* There is no cost to creating more API keys.
* An API key can only be viewed when it is first created, make sure to copy it somewhere safe. If you lose your API key, you should create a new one.
