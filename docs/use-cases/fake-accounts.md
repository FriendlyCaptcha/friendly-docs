# Fake Accounts

Fake accounts are a common problem on platforms, and they can be used for a variety of malicious purposes, such as spreading misinformation, harassing other users, engaging in fraudulent activities, or abusing your service otherwise. These accounts are often created using automated bots, which can quickly generate large numbers of fake accounts to overwhelm a platform.

Friendly Captcha helps protect your platform from fake accounts by adding a layer of security that can distinguish between legitimate users and automated bots. This makes it more difficult and costly for attackers to create fake accounts, while allowing legitimate users to access your services without friction.

## How can Friendly Captcha protect against fake accounts?

When a user attempts to create an account on your platform, you can integrate the Friendly Captcha widget into your registration form. When the user interacts with the form, Friendly Captcha assesses the visitor and gathers signals from their browsing session. If it detects suspicious activity that is indicative of a bot, it will require the user's device to solve a computationally expensive challenge. This adds a significant cost to carrying out fake account creation attacks, as automated bots will struggle to solve the challenges at scale. Meanwhile, legitimate users will typically be able to solve the challenges quickly, allowing them to access your services without unnecessary friction.

## What about human attackers?
While Friendly Captcha is effective at blocking automated bots, it may not be able to prevent fake accounts that are created by human attackers. While these users may be slowed down by the challenge, they can still potentially create fake accounts. 

To prevent such fake accounts, you can use our [Risk Intelligence](https://developer.friendlycaptcha.com/docs/v2/risk-intelligence/) product, which provides you with risk scores and signals about the browsing session. This can help you identify potentially malicious users and take additional actions against them, such as flagging their accounts for review or requiring additional verification for their accounts. You can enrich the account creation process with the signals provided by Risk Intelligence, such as the user's IP address, device information, and behavior patterns, to make informed decisions about whether to allow account creation, implement additional security checks, and monitor suspicious accounts.

## Getting started
To get started with protecting your platform from fake accounts using Friendly Captcha, you can follow our [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) guide to install the widget on your signup form.
