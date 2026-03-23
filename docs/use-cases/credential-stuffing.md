# Credential Stuffing

Credential stuffing is a cyberattack technique where attackers use automated tools to try large numbers of username and password combinations, often obtained from previous data breaches, to gain unauthorized access to user accounts. The goal is to exploit the fact that many people reuse passwords across multiple sites, allowing attackers to compromise accounts on various platforms using the same credentials.

This attack involves the use of bots to rapidly test these credentials against a target website or application, much like in a [brute force attack](./brute-force-attacks.md). However, credential stuffing specifically relies on the use of stolen credentials, rather than trying every possible combination of characters.

The first line of defense against credential stuffing is to encourage users to use unique, strong passwords for each of their accounts. However, even with strong password policies in place, attackers can still succeed if users reuse passwords or if they have access to a large number of stolen credentials.

Friendly Captcha can help protect against credential stuffing attacks by adding an additional layer of security to your login forms. Friendly Captcha looks at various signals from the user's browsing session to determine the likelihood of a request being malicious. If it detects suspicious activity, the user has to solve a computationally expensive challenge which makes the attack more costly and time-consuming for the attacker, while still allowing legitimate users to access their accounts without friction.

## Getting started
To protect your login forms against credential stuffing attacks, you can integrate Friendly Captcha into your authentication flow. This involves adding the Friendly Captcha widget to your login form and configuring it to work with your backend. You can follow our [Getting Started](https://developer.friendlycaptcha.com/docs/v2/getting-started/) guide to set this up. 