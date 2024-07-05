---
sidebar_position: 0
---

# Introduction

This guide describes how to upgrade from v1 to v2 of our widget.

To learn more about the ways v2 improves upon v1, and why upgrading is worth the effort, [**click here**](./why-upgrade).

:::tip
If you are using a [plugin or library](../../integrations/index.md) that adds Friendly Captcha to your framework or CMS, usually you only have to update your plugin.

We are working on bringing v2 support to all popular languages and frameworks.
:::

### Which version am I using?

#### Friendly Captcha **v1**


The widget for **v1** looks like this:  
![Screenshot of widget v1 that has not been started yet](./widget-v1-ready.png) ![Screenshot of widget v1 that has been finished](./widget-v1-completed.png)

The NPM package for **v1** is [`friendly-challenge`](https://www.npmjs.com/package/friendly-challenge).  
The siteverify endpoint for v1 is `https://api.friendlycaptcha.com/api/v1/siteverify`.

#### Friendly Captcha **v2**

The widget for **v2** looks like this:  
![Screenshot of widget v2 that has not been started yet](./widget-v2-ready.png) ![Screenshot of widget v2 that has been finished](./widget-v2-completed.png)

The NPM package for **v2** is [`@friendlycaptcha/sdk`](https://www.npmjs.com/package/@friendlycaptcha/sdk).  
The siteverify endpoint for v2 is `https://global.frcapi.com/api/v2/captcha/siteverify`.

## Switching from v1 to v2

### Enable v2 support

In your Friendly Captcha administration dashboard, select "v2" for the applications you wish to use v2 on.

<!-- TODO: Add link and screenshot -->

### Clientside changes (= changes to your website)

#### Script tag installation

If you installed Friendly Captcha to your website by adding a `<script>` tag, follow [this guide](./script).

#### Programmatic Javascript API

If you are using the Javascript API to programmatically create widgets, please follow [this guide](./javascript-api)

### Backend changes

You will also need to make small changes to your backend code. These are described in [this guide](./backend-integration).
