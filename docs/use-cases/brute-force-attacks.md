# Brute Force Attacks

A **brute force attack**, also known as **brute forcing**, is an attempt to guess a web user’s credentials by trying every possible combination of characters. For web sites and applications, the end goal of a brute force attack is **account takeover (ATO)**, where the attacker gains unauthorized access to the account.

Common defenses against brute forcing include rate-limiting, which slows the rate at which attackers can attempt logins, and password complexity requirements, which increase the number of possibilities that attackers need to try. Both of these defenses aim to make brute force attacks more *costly*.

Friendly Captcha’s technology also increases the cost of carrying out a brute force attack, and it includes logic to specifically identify and mitigate these kinds of attacks.

## How can Friendly Captcha protect against brute force attacks?

The target of a brute force attack is a login form. Brute force attacks will likely automate attempts to break through a login form by submitting it repeatedly with different credentials. We designed Friendly Captcha to be included in login forms, and the first step to mitigating a brute force attack is to install the widget in the form. We outline the steps to installing the Friendly Captcha widget in our [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) article.

Friendly Captcha works by generating cryptographic challenges that must be solved by the browser in order to successfully submit a form. By using signals gathered from a browsing session, it varies the difficulty of the challenges, increasing or decreasing the amount of time it takes to complete them. To combat brute forcing, the goal is to make the challenges challenging enough that the attack becomes too expensive.

Let’s take a look at two signals Friendly Captcha uses that are relevant in the defense against brute force attacks.

### Rate of requests

In the past, brute force attacks were simpler—perhaps a single machine targeting a website. This rudimentary approach could be blocked by rate-limiting requests from the IP address of the attacking machine. Nowadays, attackers use botnets comprising millions of machines, each with a distinct IP address, to evade IP-based rate limits.

Friendly Captcha uses a combination of data to generate a unique, yet anonymized, identifier that it associates with form submission requests. Each time it receives a request from a given identifier, the challenge difficulty increases. For a brute force attack, which relies on submitting a form repeatedly, the challenge difficulty will quickly become too challenging to solve in a reasonable amount of time.

### Browser information

These days, brute forcers often make use of browser automation technologies like [Puppeteer](https://pptr.dev/) or [Playwright](https://playwright.dev/), because they speed up the rate at which attackers can try passwords. These tools, or derivations of them, may attempt to conceal their automated nature. But they often leave traces that give clues to their identity.

Friendly Captcha’s signal analysis pipeline can leverage these clues to recognize browsing sessions that are likely malicious. From there, it increases the challenge difficulty, furthering slowing down the attack.

## Brute force attacks continuously evolve

A central problem in cybersecurity is that the threat landscape is changing in realtime. What worked yesterday might not work today. In order to remain secure in that landscape, your defense needs to evolve as quickly as the attackers.

Friendly Captcha closely monitors the shifting trends in online security and its threats, and the service constantly upgrades to provide the best protection possible. In addition, we’ve worked hard to make integration as simple as possible. You can add Friendly Captcha to your login flow by following the [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) guide.