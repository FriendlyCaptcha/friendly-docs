---
sidebar_position: 6
---

# Migrating from reCAPTCHA

Switching from [Google's reCAPTCHA (v2)](https://www.google.com/recaptcha/about/) to Friendly Captcha is straightforward.

To make the switch even easier we offer a `recaptcha` compatibility mode. Using that compatibility mode switching should take only a few minutes. 



## Create a Friendly Captcha sitekey and API Key
:::info
To add the Friendly Captcha widget to your website you will need an account. You can [sign up here](https://app.friendlycaptcha.eu/dashboard/signup).
:::


Log in to the [Friendly Captcha Dashboard](https://app.friendlycaptcha.eu/dashboard/), then

1. [Create a new application](https://app.friendlycaptcha.eu/dashboard/accounts/-/apps) and take note of its sitekey.
2. [Create a new API key](https://app.friendlycaptcha.eu/dashboard/accounts/-/apikeys) and copy it somewhere safe.

:::tip
If you are using a CMS like Wordpress, you probably don't have to do the below steps.

Instead you would replace the reCAPTCHA plugin and install a plugin that supports Friendly Captcha.
:::

## Update your website's integration

1. Replace the reCAPTCHA script
    ```html
    <script src="https://www.google.com/recaptcha/api.js"
            async defer></script>
    ```
    with the reCAPTCHA-compatible Friendly Captcha scripts.
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk/recaptcha-site.min.js"
            async defer></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk/recaptcha-site.compat.min.js"
          async defer></script>
    ```

    <!-- :::tip
    The above uses a CDN which is the easiest way to add the script. We advise that in production you serve these files from your own server as it is more privacy-friendly.
    ::: -->
2. Replace `g-recaptcha` with `frc-captcha` and update the sitekey
    ```html
    <div class="g-recaptcha" data-sitekey="<reCAPTCHA sitekey>"></div>
    ``` 
    becomes
    ```html
    <div class="frc-captcha" data-sitekey="<Friendly Captcha sitekey>"></div>
    ``` 

## Update your server's integration

Follow the guide [here](../getting-started/siteverify) to set up your server's integration.

## Compatibility notes (only relevant for advanced usage)

Making use of the compatibility scripts (`recaptcha-site.min.js` and `recaptcha-site.compat.min.js`) means that the Friendly Captcha widget will work without having to change any Javascript code on your website or web app.

Some fields and methods do behave differently, here is a list of the different behaviors:

### Container Configuration and render attributes ([docs](https://developers.google.com/recaptcha/docs/display#render_param))

* `data-theme` has no effect.
* `data-size` has no effect. The Friendly Captcha widget is fully responsive, you can make it any size you want. You can use plain CSS to resize it.
* `data-close-callback` has no effect and is never called. In hCaptcha this is called when the user closes the "click-the-pictures" challenge, which is not relevant.

