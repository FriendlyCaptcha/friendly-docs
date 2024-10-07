---
slug: launching-v2
title: Launching Friendly Captcha v2
authors: [gzuidhof]
tags: [captcha, announcement, launch]
---

# Launching Friendly Captcha v2 🚀

For the past two years the Friendly Captcha team has worked on the next generation of our solution to protect websites against bots and spam attacks. As of September 2024 we have achieved many of the goals we set out for the next version of our product.

In this article we'd like to highlight how Friendly Captcha version v2 builds on and expands our vision and mission to make the internet safer, friendlier and more accessible.

## What is Friendly Captcha v2?

Friendly Captcha works by collecting *signals* from a user session in order to generate a score that indicates the likelihood of the session being abusive. It then assigns a computationally intensive challenge that increases in difficulty as the score increases.

The result of this is that it makes it increasingly difficult and expensive for abusers to access a service, while regular users mostly don’t even notice we’re there at all. This last bit is why we're *Friendly* Captcha. 😊

With this new version v2, we take our learnings from the past 4 years of protecting websites and apps. We collect more, different signals which help us distinguish between bots and genuine users. Aside from the improved protection, we made it easier to integrate into your website, improved the user experience, and gave the user interface an overhaul.

## Towards a human-friendly, inclusive internet

*Friendly* is not just part of our company name, it’s part of our core philosophy for the software we design. Most other anti-bot solutions come at the expense of users, their privacy, or their  experience.

In the best case the user doesn’t even notice that Friendly Captcha is there, while the website is protected from spam and other abuse. With Friendly Captcha v2 we can deliver that ideal situation in even more cases.

Some highlights:

- **Privacy friendly.** In order to  distinguish real users from bots, we can't get around collecting and processing some data from the web browser. Data is a burden and not an asset. We treat it accordingly, and do not collect or store what we don't need.

We do not use HTTP cookies and do not store any data in the browser’s persistent storage, and none of the data we collect is shared with third parties or used for purposes other than protecting websites from abuse. We comply with regulations like the GDPR to safeguard the privacy of all our users, and the code that runs on your website is [open source](https://github.com/FriendlyCaptcha/friendly-captcha-sdk) so you can verify what data is collected. You can read more about this in our [privacy policy](https://friendlycaptcha.com/legal/privacy-end-users/).
- **More powerful bot-or-not engine.** With v2 we collect a more diverse set of data points we call *signals*. We look at a wide range of signals like HTTP request information, the browser environment to detect browser automation, as well as the interaction of the users with the page (e.g. mouse movements). 

The better we can tell apart bots from genuine users, the better the user experience, as well as the protection, will be.
- **Inclusive and friction-free.** Just like v1, Friendly Captcha v2 does not rely on the user tasks like clicking on pictures of cars or solving puzzles. This means that nobody is excluded or annoyed. Our goal is to make [CAPTCHA truly accessible](https://friendlycaptcha.com/insights/captcha-accessibility/). The widget, which is the visible element that is added to websites that are protected, has been redesigned with speed in mind — in v2, it’s more likely that the captcha challenge will be completed before the user even finishes filling out the form!
- **Easier to integrate than ever**. There are [official SDKs and plugins](https://developer.friendlycaptcha.com/docs/integrations/) for popular programming languages and frameworks (such as PHP, Python, Node/Javascript, Go, Wordpress), with more on the way. Integration into your webpage is more straightforward with easier CSP (content security policy) requirements and automatic language detection. The same old browsers and operating systems are supported as before (including Internet Explorer 11).
- **Reliability:** Reliability is incredibly important: [our system should always be available](https://status.friendlycaptcha.com). Thanks to infrastructure changes our services are more resilient to failure, whether issues happen internally or outside of our control.

The best part is that these reliability improvements carry over to Friendly Captcha v1 as well, so they’re not exclusive to v2. 😊

## Getting started with Friendly Captcha v2

Friendly Captcha v2 is now available to all newly created accounts. The [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) section of the documentation is a good place to start for new integrations. For existing integrations there is the [Upgrading from v1 to v2](https://developer.friendlycaptcha.com/docs/v2/guides/upgrading-from-v1/) guide.

If you have an existing account, the dashboard will prompt you to sign the renewed DPA before you can use v2 - more on that below.

### Data Processing Agreement (DPA)

Friendly Captcha v2 collects a different and larger set of data. Many companies sign a *data processing agreement* with us, which is a document that describes the data we collect from end-users to protect your website and how we handle that data.

If you have previously signed a data processing agreement with us or signed up before May 1st 2024, you will need to review and sign the new data processing agreement to enable Friendly Captcha v2 for your account.

## What is the future for Friendly Captcha v1?

Friendly Captcha v1 isn't going anywhere, and we will continue to support it for many years moving forward. At some point we will disable Friendly Captcha v1 for newly created applications, which will be timely announced in the dashboard, this blog, and the documentation.

For new projects or integrations we recommend you use Friendly Captcha v2.
