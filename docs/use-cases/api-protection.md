# API Protection

Your websites and apps likely rely on APIs to function. These APIs are vulnerable to abuse and attacks, which can lead to data breaches, service disruptions, and other security issues. 

While your APIs are intended for use by your users, an attacker may try to exploit them for malicious purposes. For example, they might use your API to scrape data, perform denial-of-service (DoS) attacks, or automate fraudulent activities.

Friendly Captcha helps prevent abuse and attacks on your APIs by adding a layer of protection that can distinguish between legitimate users and malicious actors. This makes attacks more difficult and costly for attackers, while allowing legitimate users to access your services without friction.

## How can Friendly Captcha protect your APIs?
Friendly Captcha's challenge (the widget) is great for protecting forms and other user interactions on your website or app. But what about protecting your APIs, which may not have a user interface?

[**Risk Intelligence**](https://developer.friendlycaptcha.com/docs/v2/risk-intelligence/) is a product we launched in 2026 that allows you to protect API endpoints that happen entirely in the background. Friendly Captcha assesses the visitor, sharing risk scores and signals with your backend, so you can make informed decisions about how to handle requests.

For example, you might choose to block requests that have a high risk score, you may rate limit them more aggressively, or you might require additional verification for those requests. This way, you can protect your APIs from abuse while still allowing legitimate users to access your services.

## What about machine-to-machine communication?
Friendly Captcha's Risk Intelligence is designed to protect APIs that are accessed by users.

You can assess the risk of machine-to-machine (M2M) communication based on the IP address of the request.

We launched the [**IP Trust**](https://iptrust.co/) product to help with this usecase. That service allows you to look up information about an IP address, such as whether it's a known proxy or VPN, its geolocation, and more. This can help you make informed decisions about how to handle requests from that IP address.

Other than most competitors, IP Trust offers a downloadable database, which means you can use it to protect M2M communication without needing to make an API call for each request. This can be especially useful for high-volume APIs where making an API call for each request would be impractical, or if you are concerned about the privacy implications of sharing your users' IP addresses with a third party.


