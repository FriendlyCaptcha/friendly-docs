# Migrating from hCaptcha

Switching from [hCaptcha](https://www.hcaptcha.com/) to Friendly Captcha is straightforward.

To make the switch even easier we offer a `hcaptcha` compatibility mode. Using that compatibility mode switching should take only a few minutes. 



## Create a Friendly Captcha sitekey and API Key
:::info
To add the Friendly Captcha widget to your website you will need an account. You can [sign up here](https://app.friendlycaptcha.eu/dashboard/signup).
:::


Log in to the [Friendly Captcha Dashboard](https://app.friendlycaptcha.eu/dashboard/), then

1. [Create a new application](https://app.friendlycaptcha.eu/dashboard/accounts/-/apps) and take note of its sitekey.
2. [Create a new API key](https://app.friendlycaptcha.eu/dashboard/accounts/-/apikeys) and copy it somewhere safe.

:::tip
If you are using a CMS like Wordpress, you probably don't have to do the below steps.

Instead you would replace the hCaptcha plugin and install a plugin that supports Friendly Captcha.
:::


## Update your website's integration

1. Replace the hCaptcha script
    ```html
    <script src="https://js.hcaptcha.com/1/api.js"
            async defer></script>
    ```
    with the hCAPTCHA-compatible Friendly Captcha scripts.
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.8/contrib/hcaptcha-site.min.js"
            async defer></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.8/contrib/hcaptcha-site.compat.min.js"
          async defer></script>
    ```

    :::info
    If you are making use of [query parameters to configure hCaptcha](https://docs.hcaptcha.com/configuration), add them to both scripts. For example if the script URL ends with `?hl=fr`, add that to both the new script URLs.
    :::

2. Replace `h-captcha` with `frc-captcha` and update the sitekey
    ```html
    <div class="h-captcha" data-sitekey="<hCaptcha sitekey>"></div>
    ``` 
    becomes
    ```html
    <div class="frc-captcha" data-sitekey="<Friendly Captcha sitekey>"></div>
    ``` 

## Update your server's integration

Follow the guide [here](../getting-started/verify) to set up your server's integration.

## Compatibility notes (only relevant for advanced usage)

Making use of the compatibility scripts (`hcaptcha-site.min.js` and `hcaptcha-site.compat.min.js`) means that the Friendly Captcha widget will work without having to change any Javascript code on your website or web app.

Some fields and methods do behave differently, here is a list of the different behavior:

### Container Configuration and render attributes ([docs](https://docs.hcaptcha.com/configuration#hcaptcha-container-configuration))

* `data-size` has no effect. The Friendly Captcha widget is fully responsive, you can make it any size you want. You can use plain CSS to resize it.
* `data-chalexpired-callback` is never called, instead `data-expired-callback` is called when the captcha response expires.
* `data-open-callback` is called when the widget starts solving.
* `data-close-callback` has no effect and is never called. In hCaptcha this is called when the user closes the "click-the-pictures" challenge, which is not relevant.

### Javascript API ([docs](https://docs.hcaptcha.com/configuration#hcaptcha-container-configuration))

* `hcaptcha.getRespKey(widgetID)`([docs](https://docs.hcaptcha.com/configuration#hcaptchagetrespkeywidgetid)) always returns an empty string.
