---
slug: a-more-accessible-captcha-widget
title: "A more accessible captcha widget"
authors: [agreenberg]
tags: [captcha, accessibility, announcement]
---

A couple of weeks ago, while browsing open support tickets, I noticed a customer report that the Friendly Captcha widget was not WCAG-compliant. In other words, something about the widget fell outside the set of recommendations provided by the Web Content Accessibility Guidelines (WCAG). Removing barriers to accessing the web is a primary value of Friendly Captcha, so we try hard to make our products as accessible as possible.

As luck would have it, right around the time of this customer report, we launched an in-house [website accessibility checker](https://accessibilitycheck.friendlycaptcha.com/). It allows anyone to input a website URL and receive a report with an accessibility score and a list of remediations to achieve compliancy with **WCAG 2** and **EN 301 549**, two important accessibility standards. 

![Screenshot of the Friendly Captcha accessibility checker](./a11y-checker.png)

I entered the URL of the Friendly Captcha demo. Sure enough, the report contained an issue: the `<iframe>` element that houses the Friendly Captcha widget was missing an accessible name. According to WCAG 2.0, [all `<frame>` and `<iframe>` elements must have an accessible name](https://www.w3.org/TR/WCAG20-TECHS/H64.html), provided by the `title` attribute. The Friendly Captcha widget didn't have that attribute.

[One pull request later](https://github.com/FriendlyCaptcha/friendly-captcha-sdk/pull/40), the Friendly Captcha widget had a (properly localized) `title` attribute with a descriptive name. After redeploying the demo, I checked it again using the accessibility checker.

![Screenshot of the accessibility report for the Friendly Captcha demo](./fc-demo-report.png)

This time, it earned a score of 100 and a big green checkmark. Now, the Friendly Captcha widget is even more accessible to those who use browser assistive technologies. If you're looking for a user-friendly and accessible captcha solution, consider trying [Friendly Captcha](https://friendlycaptcha.com/). Or, if you'd like to see how your websites stacks up in terms of accessibility, try entering its URL in the [accessibility checker](https://accessibilitycheck.friendlycaptcha.com/)!
