---
slug: v2-deep-dive
title: v2 Deep Dive
authors: [imiric]
tags: [captcha, v2]
---

# v2 Deep Dive

For the past 2 years the Friendly Captcha team has been working tirelessly on the next generation of our solution to protect websites against bots and spam attacks. As of July 2024 we have achieved many of the goals we set out for the product, and in this article we'd like to share more about what makes Friendly Captcha version 2 (v2) so great, and how it differs from our original service (v1) launched in 2020.

## What is FC v2?

FC v2 is a generational leap of our service in several technical and non-technical areas. At its core, the job it does is not fundamentally different from v1: it still collects signals from web users, categorizes them according to specific rules, and assigns a computationally intensive challenge based on the likelihood of the user being a bot. The result of this is that it makes it increasingly difficult for bad guys to access a service, while regular users don't even notice it. This last bit is why we're _Friendly_ Captcha after all. :blush:

So what is different from v1?

## Improved protection

FC v2 offers much greater protection than v1. This is due to many changes related to two broad topics:

- **More powerful signal detection.**
  With v2, we not only detect the user's IP address and HTTP request information, but do a deep inspection of the environment our widget is running in (e.g. is it a browser or an automated tool), and sophisticated behavioral detection (e.g. how quick and accurate are their cursor movements and page interactions). All of this contributes to having much more information about the user to make a more accurate distinction between bots and real users.

  Rest assured, though. We handle this data with the utmost of care, and do everything to ensure that we preserve our users' privacy.
  <!-- Ugh this sounds lame. How can we make "we collect all your data" sound less scary? -->

- **More powerful and flexible puzzle difficulty rules.**
  Based on the improved signal detection, our puzzle difficulty rules, i.e. the logic that determines how much work the client must do to proceed, have also improved. The rules are more nuanced; harsh towards abusers, but more relaxed for regular users.

  This is something we're still actively working on improving. We soon plan to make defining and customizing these rules much more dynamic, and also give more control to our users, with the possibility of tweaking or even adding their own! We'll announce these changes as they roll out in the coming months.


## Easier integration

There are several changes that make FC v2 easier to integrate into websites.

- There are [more official SDKs and plugins](/docs/integrations/) for popular programming languages and frameworks. We now have a PHP, Python and NodeJS SDK, in addition to Go and JVM ones.

- There is a reCAPTCHA and hCaptcha compatibility build, making switching easier. <!-- TODO Expand on this and link to it -->

- It automatically matches the language of your website. <!-- TODO Expand on this -->

- It has simplified strict content security policy (CSP) requirements. <!-- TODO Expand on this -->

- It has better support for uncommon use-cases such as multiple widgets on one page. <!-- TODO Expand on this -->

- It supports old operating systems that do not support Let's Encrypt SSL certificates (such as Windows XP Service Pack 2).


## Improved user experience

Visually, the FC v2 widget is more modern, simpler and less prominent.

- v1 widget

  ![Screenshot of widget v1 that has not been started yet](/img/widget-v1-ready.png)
  ![Screenshot of widget v1 that has been finished](/img/widget-v1-completed.png)

- v2 widget

  ![Screenshot of widget v2 that has not been started yet](/img/widget-v2-ready.png)
  ![Screenshot of widget v2 that has been finished](/img/widget-v2-completed.png)


They both support light and dark mode, but the v2 widget will appear better integrated in websites.
We also have plans to allow the v2 widget style to be customized, so stay tuned for that soon!

Additionally, FC v2 has the ability to store solutions for future submissions.
<!-- TODO Expand on this. What does this mean in practice and how is it valuable to the user? -->


## More consistent performance

FC v2 has a smaller speed difference between older and newer browsers.

<!-- TODO Expand on this. Is this because our JS solver is more functionally equivalent to the WASM one?
     Let's explain both solvers here and then arrive at why there's a smaller speed difference.
 -->


## Other things to highlight...?

<!-- Anything else worth mentioning besides what's on the "Why upgrade?" page? -->


## What's next?

While we have worked hard to get to this point, the work on FC v2 is not done. We still have many plans for improving the user experience, and making our bot protection even more accurate and sophisticated.

<!-- TODO: Mention the things above like dynamic rules and widget customization here? -->


## FAQ

Below are answers to some common questions that users may have. If yours is not here, feel free to [reach out](https://friendlycaptcha.com/contact/).

- Is FC v1 going away?


- What are the privacy implications from the additional data collected by FC v2?

  DPA...
