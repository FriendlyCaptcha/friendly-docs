---
slug: /versions
---

# v1 and v2

There are two versions of the Friendly Captcha service, called **v1** and **v2**. The second version contains technical and non-technical enhancements that come from state-of-the-art improvements and learnings from **v1**.

## What's new in v2?

* v2 has **improved protection**. It provides us with more powerful signals to detect abuse, automated browsers, and browsers that have otherwise been tampered with.
* v2 improves on **user experience**. It has an updated design and the ability to store solutions for future submissions.
* v2 has a **smaller speed difference** between older and newer browsers.
* v2 is **easier to integrate**:
  * It automatically matches the language of your website.
  * It has better support for uncommon use-cases such as multiple widgets on one page.
  * It offers a reCAPTCHA and hCaptcha compatibility build, making switching easier.
  * It has simplified strict content security policy (CSP) requirements.
  * It supports ancient operating systems that do not support Let's Encrypt SSL certificates (such as Windows XP Service Pack 2).
  * There are [official SDKs and plugins](/integrations) for common programming languages and frameworks.

## What hasn't changed?

* Friendly Captcha protects your websites and apps from bots and abuse.
* There are no user tasks like clicking cars, and there are no cookies or user tracking involved.
* It supports the same old browsers like Internet Explorer 11.
* It offers an EU-only infrastructure option, where we guarantee your users' data does not touch any US-owned server.
* The code that runs in your website is open source, so you can be certain you will not be compromised even if we were to get compromised.

## What's going to happen to v1?

v1 will keep working! We will maintain it moving forward for multiple years.

At some point down the road we will not allow newly created apps to use v1, but existing apps will still continue to work.

## When can I upgrade?

You may already be eligible&mdash;accounts created after May 1, 2024 automatically have access to v2. You can find out if you do by navigating to the [Create New App](https://app.friendlycaptcha.eu/dashboard/accounts/-/apps/create) page. In the **Friendly Captcha Version** step, if you can select v2, you're all set.

Over the next 6 months, we will be rolling out v2 access to the rest of our customers. If you're ready to upgrade now, feel free to reach out using [**this form**](https://tally.so/r/n0MGDA) and a member of our team will help you get access.

## How do I upgrade?

After v2 is enabled for your account, you can [follow the upgrade guide](./guides/upgrading-from-v1).

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
