# Account Takeover

Account takeover (ATO) is a type of identity theft where an attacker gains unauthorized access to a user's account.

This can lead to various malicious activities, such as stealing personal information, making unauthorized transactions, or using the account for further attacks. ATO attacks often occur through methods like phishing, credential stuffing, or brute force attacks.

## Preventing ATO even if the user's credentials are compromised

You can implement additional layers of security beyond just relying on passwords. You may add multi-factor authentication (MFA), which requires users to provide an additional form of verification (like a code sent to their phone) in addition to their password. This can significantly reduce the risk of account takeover, as it adds an extra barrier for attackers.

But what if MFA is not an option for your users, or if you are concerned with the increased friction that MFA can cause for legitimate users? In that case, you can implement a **Risk-Based Authentication** (RBA) approach.

With Risk-Based Authentication you require additional verification only for requests that are deemed risky. This way, you can protect against account takeover while still allowing legitimate users to access their accounts without unnecessary friction.

[Risk Intelligence](https://developer.friendlycaptcha.com/docs/v2/risk-intelligence/) is a product that allows you to implement risk-based authentication in a matter of hours instead of weeks.

Friendly Captcha assess the visitor, sharing risk scores and information about the browsing session with your backend, so you can make informed decisions about how to handle requests.

You could for example have a policy where you require MFA for requests that have a high risk score, but allow requests with a low risk score to proceed without additional verification.

Alternatively you can store information about the user's previous browsing sessions, and if a request comes in that deviates significantly from the user's normal behavior (e.g. a login attempt from a new device or location), you can require additional verification for that request.

<p align="center">
	<img src="/mockups/risk-auth-email.png" alt="Example of a Risk-Based Authentication verification email" />
</p>
<p align="center">
	<em>Example verification email shown for a risky login attempt from a new location.</em>
</p>

## Passive monitoring for account takeover
Even if you don't want to implement risk-based authentication, you can still use Risk Intelligence for passive monitoring of account takeover attempts. By logging signals associated with critical user interactions, you can analyze patterns of behavior and identify potential security threats. For example, you might notice a spike in high-risk scores from a particular network, geographic region or device type, which could indicate a coordinated attack. You can feed this data into your SIEM (Security Information Event Management) system to correlate it with other security events.

## Gettings Started
To learn more about risk-based authentication in general, the [riskbasedauthentication.org](https://riskbasedauthentication.org/) website is a great resource.

To get started with implementing risk-based authentication using Friendly Captcha's Risk Intelligence, you can follow our [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) guide to set this up.