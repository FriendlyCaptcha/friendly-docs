---
slug: /versions
---

# v1 and v2

There are two versions of the Friendly Captcha service, called **v1** and **v2**. The second version contains technical and non-technical enhancements that come from state-of-the-art improvements and learnings from **v1**.

## What's new in v2?

* v2 has **improved protection**. It provides us with more powerful signals to detect abuse, automated browsers, and browsers that have otherwise been tampered with.
* v2 improves on **user experience**. Real users are less likely to need to wait for the captcha to finish.
* v2 is **easier to integrate**. It has SDKs for many popular programming languages, automatically matches the language of your website, and has simplified Content Security Policy (CSP) requirements.

## What hasn't changed?

* Friendly Captcha protects your websites and apps from bots and abuse.
* There are no user tasks like clicking cars, and there are no cookies or user tracking involved.
* It supports the same old browsers like Internet Explorer 11.
* It offers an EU-only infrastructure option, where we guarantee your users' data does not touch any US-owned server.
* The code that runs in your website is [open source](https://github.com/FriendlyCaptcha/friendly-captcha-sdk), so you can be certain you will not be compromised even if we were to get compromised.

## What's going to happen to v1?

v1 will keep working! We will maintain it moving forward for multiple years.

At some point down the road we will not allow newly created apps to use v1, but existing apps will still continue to work.

## How do I upgrade?

v2 is available to all customers and we highly recommend it!

For older accounts, v2 might not be enabled yet. Please [contact us](https://friendlycaptcha.com/support/) and we'll happily enable v2 for your account.

After we enable v2 for your account, please [follow the upgrade guide](./guides/upgrading-from-v1).

## How can I tell if I'm using v1 or v2?

There are a couple of features that you can use to identify which version you're using. Firstly, the widget that goes on your website or app looks different.

<div style={{ display: 'flex' }}>
    <div style={{ textAlign: 'center' }}>
        <b>v1 Widget</b>
        <img src="/img/widget-v1-ready.png" style={{ width: '100%' }} />
        <img src="/img/widget-v1-completed.png" style={{ width: '100%' }} />
    </div>
    <div style={{ textAlign: 'center' }}>
        <b>v2 Widget</b>
        <img src="/img/widget-v2-ready.png" style={{ width: '100%' }} />
        <img src="/img/widget-v2-completed.png" style={{ width: '100%' }} />
    </div>
</div>

Secondly, the URLs that you use are different between v1 and v2.

**v1 URLs**

* Widget SDK script: `https://cdn.jsdelivr.net/npm/friendly-challenge@X.Y.Z/widget.module.min.js`.
* NPM package: [`friendly-challenge`](https://www.npmjs.com/package/friendly-challenge).
* Verification API endpoint: `https://api.friendlycaptcha.com/api/v1/siteverify`.

**v2 URLs**

* Widget SDK script: `https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@X.Y.Z/site.min.js`.
* NPM package: [`@friendlycaptcha/sdk`](https://www.npmjs.com/package/@friendlycaptcha/sdk).
* Verification API endpoint: `https://global.frcapi.com/api/v2/captcha/siteverify`
