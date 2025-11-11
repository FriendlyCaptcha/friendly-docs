# Self-Hosted Endpoint

:::info

The Self-Hosted Endpoint feature is only available for Friendly Captcha v2.

:::

When a customer website or application loads a Friendly Captcha widget, the widget makes a number of requests to the Friendly Captcha API. The API endpoint is `global.frcapi.com`, or `eu.frcapi.com` for customers who use [the EU Endpoint](./eu-endpoint). Friendly Captcha offers the **Self-Hosted Endpoint** feature for customers who prefer to route all end-user traffic through their own infrastructure.

To use a Self-Hosted Endpoint, customers operate a proxy server that forwards widget requests to the Friendly Captcha API. Because the Friendly Captcha service depends on data sent by the widget, it is important to ensure that a Self-Hosted Endpoint correctly forwards that data.

## Setup

There are 3 steps to setting up a Self-Hosted Endpoint, explained in detail below.

1. [Generate a proxy key in the Friendly Captcha dashboard.](#1-generate-a-proxy-key)
2. [Configure your web server to proxy widget requests to the Friendly Captcha API.](#2-configure-your-web-server)
3. [Configure your widget to use your Self-Hosted Endpoint.](#3-configure-your-site-or-apps-widget)

### 1. Generate a proxy key

To verify that proxied widget requests come from your infrastructure, you must set a header that contains a proxy key. You can generate a key in the [Friendly Captcha dashboard](https://app.friendlycaptcha.eu/dashboard/accounts/-/keys/proxy). Make sure to generate a **Proxy Key**; API keys are not accepted. Store the generated key somewhere safe and retrievable&mdash;Friendly Captcha doesn't keep a copy of the key, so you will have to regenerate it if you lose it. You will use this proxy key in the next step.

### 2. Configure your web server

You need to configure your web server to forward the following requests to the Friendly Captcha API:

```
GET  /api/v2/captcha/agent
GET  /api/v2/captcha/widget
POST /api/v2/captcha/activate
POST /api/v2/captcha/quote
POST /api/v2/captcha/redeem
```

For these requests, your server should forward the request in its entirety, including all headers. Additionally, the forwarded requests should include two ***extra*** headers:

1. `X-Frc-Proxy-Key`: The proxy key you generated in the Friendly Captcha dashboard.
2. `X-Frc-Proxy-Client-IP`: The original (source) IP address of the end user.

Forward the requests to this endpoint (i.e., the upstream server):

```
https://global.proxy.frcapi.com
```

If you have access to [the EU Endpoint](./eu-endpoint.md), you may alternatively forward the requests to this endpoint:

```
https://eu.proxy.frcapi.com
```

[See below](#example-routing-configurations) for examples of how to configure a server to correctly proxy the widget requests.

:::warning Note

If you don't forward the entire request and its headers, the widget may still be functional, but the service will operate in a degraded state. If you forget either of the additional proxy headers (`X-Frc-Proxy-Key` and `X-Frc-Proxy-Client-IP`), the widget will display an error message. 

:::

### 3. Configure your site or app's widget

The final step is to configure your server's URL as the API endpoint for your widget. This will ensure that the widget sends its requests to your server (which will then forward them to the upstream Friendly Captcha API). If your server's URL is `https://example.com` and you configure the widget using HTML `data-` attributes, your markup will look something like this:

```html
<div class="frc-captcha" data-sitekey="<my sitekey>" data-api-endpoint="https://example.com"></div>
```

If you configure the widget using the JavaScript SDK, your code will look something like this:

```js
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk"
const sdk = new FriendlyCaptchaSDK();

const mount = document.querySelector(".my-widget");
const widget = sdk.createWidget({
    element: mount,
    sitekey: "<my sitekey>",
    apiEndpoint: "https://example.com",
});
```

For more documentation, see the page on [configuring the Friendly Captcha widget](../sdk/configuration.md).

## Example Routing Configurations

Provided below are some example Self-Hosted Endpoints configurations for popular web server technologies. If you copy and paste the configuration, make sure to replace `<% PROXY KEY %>` with your real proxy key, and verify that you're using the correct upstream Friendly Captcha API endpoint.

### Apache

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule headers_module modules/mod_headers.so

<LocationMatch "^/api/v2/captcha/(agent|widget|ping|activate|quote|redeem)(/.*)?$">
    RequestHeader set X-Frc-Proxy-Key "<% PROXY KEY %>"
    RequestHeader set X-Frc-Proxy-Client-IP expr=%{REMOTE_ADDR}

    ProxyPass https://global.proxy.frcapi.com
    ProxyPassReverse https://global.proxy.frcapi.com
</LocationMatch>
```

### Caddy

```
@captcha_paths path_regexp ^/api/v2/captcha/(agent|widget|ping|activate|quote|redeem)(/.*)?$

reverse_proxy  @captcha_paths https://global.proxy.frcapi.com {
    header_up X-Frc-Proxy-Key "<% PROXY KEY %>"
    header_up X-Frc-Proxy-Client-IP {remote_host}
}
```

### HAProxy

```
frontend http-in
    # other frontend configuration...

    acl is_captcha_path path_reg ^/api/v2/captcha/(agent|widget|ping|activate|quote|redeem)(/.*)?$
    use_backend captcha_paths if is_captcha_path

backend captcha_paths
    mode http

    http-request set-header X-Frc-Proxy-Key "<% PROXY KEY %>"
    http-request set-header X-Frc-Proxy-Client-IP %[src]

    # Note: the path to the certificates file may be different for your OS.
    server frc_api global.proxy.frcapi.com:443 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt
```

### NGINX

```
location ~ ^/api/v2/captcha/(agent|widget|ping|activate|quote|redeem)(/.*)?$ {
    proxy_set_header X-Frc-Proxy-Key <% PROXY KEY %>;
    proxy_set_header X-Frc-Proxy-Client-IP $remote_addr;

    proxy_pass https://global.proxy.frcapi.com;
}
```
