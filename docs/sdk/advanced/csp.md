---
sidebar_position: 100
---

# Content Security Policy (CSP)

Content Security Policy is a way to secure your website from cross-site scripting (XSS).

## Configuring your CSP for Friendly Captcha
If you are using a CSP for your website you will have to configure it to allow Friendly Captcha's iframes to be embedded.

In most cases you will only need to add the `iframe-src: *.frcapi.com` directive, for example:
```headers
# old header
Content-Security-Policy: default-src 'self'

# new header
Content-Security-Policy: default-src 'self'; frame-src *.frcapi.com
```
