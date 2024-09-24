# Introduction

Friendly Captcha is a service that protects websites from bots and abuse in a privacy-friendly and accessible way. To learn more about the company or service, you can visit the [Friendly Captcha website](https://friendlycaptcha.com).

This site contains the technical documentation that will help you integrate the Friendly Captcha's anti-abuse service into your website. Integration entails adding a widget to the websites you want to protect. The Friendly Captcha widget looks like this:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/widget-v2-ready.png" alt="Screenshot of the Friendly Captcha widget" />
    <figcaption><i>Screenshot of the Friendly Captcha Widget</i></figcaption>
</figure>

## What's different about Friendly Captcha?

Other captcha systems like [Google reCAPTCHA](https://en.wikipedia.org/wiki/ReCAPTCHA) or [hCaptcha](https://hcaptcha.com) invent tasks for website users that are meant to be easy for humans but impossible for bots. An example is clicking on images that contain cars.

These tasks are annoying for many users, but they can even create barriers to legitimate access. Users with difficulty seeing or hearing, or with advanced age, or who just lack technical savvy, might struggle to complete them.

Another reason many organizations adopt Friendly Captcha is for its commitment to data protection and user privacy. Friendly Captcha does not rely on user tracking or cookies for its protection service, and offers a true EU-only offering.

## How does it work?

The Friendly Captcha widget serves a cryptographic puzzle which is solved by the user's device. The Friendly Captcha system analyzes various signals to compute a risk score, which is used to increase the difficulty of the puzzle. The main idea is that abusers will get high risk scores and difficult puzzles, while normal users will get low risk scores and easy puzzles.

This happens in the background, so that by the time a user is ready to submit a form on your website, the puzzle is often already solved.

## v1 and v2

There are two versions of the Friendly Captcha service, called **v1** and **v2**. The second version contains technical and non-technical enhancements that come from state-of-the-art improvements and learnings from **v1**. These enhancements range from improved protection, to easier integration, to better user experience, and beyond. You can learn more about the differences between **v1** and **v2** [**here**](./guides/upgrading-from-v1/why-upgrade).

At the moment, **v2** is being offered in a closed beta, as we roll it out to all customers. Those interested in gaining access to the beta can [**apply here**](./guides/upgrading-from-v1/why-upgrade#how-do-i-upgrade).

:::info

For critical production use-cases, we currently recommend using **v1**. The docs for **v1** are available [**here**](/docs/v1).

:::

## Next Steps

- Follow the [**Getting Started**](./getting-started) tutorial to add Friendly Captcha to your website in 3 steps.
- Visit the [**Friendly Captcha website**](https://friendlycaptcha.com).
- Migrating from **Google reCAPTCHA** or **hCAPTCHA**? Follow our [**migration guides**](./guides).
