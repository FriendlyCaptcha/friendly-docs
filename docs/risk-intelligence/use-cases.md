# Use Cases

Risk Intelligence data can be used in various ways to enhance the security and fraud detection capabilities of your applications. Here we describe some common use cases for Risk Intelligence data.

## Risk-based Authentication
Risk Intelligence can be used to implement **risk-based authentication (RBA)** for preventing *account takeover*. With RBA you adjust the authentication requirements based on the assessed risk of the login attempt. For example, if a user is logging in from a new device or location and has a high-risk score, you might require them to complete additional verification steps such as entering a one-time password sent to their email or phone.

A Risk-Based Authentication setup helps prevent account takeover attacks while allowing low-risk users to log in without additional friction. Even if the account credentials have been compromised, the additional verification steps can block unauthorized access.

In practice this means an end-user may need to click a link in their email inbox or enter a code sent via SMS to complete the login process. *"You are logging in from a new device, please verify your identity by entering the code sent to your email."* 

<details>
<summary>Example: Risk-Based Authentication Email</summary>

<p align="center">
  <img src="/mockups/risk-auth-email.png" alt="Example of a Risk-Based Authentication email" />
</p>
<p align="center">
  <em>A security alert email notifying the user of an unusual login attempt from a new location, with options to confirm or secure their account.</em>
</p>

</details>

## Fraud Detection and Prevention
Risk Intelligence data can be integrated into your existing fraud detection systems to help identify and block fraudulent activity. For example, if a user is attempting to create multiple accounts from a country that you don't usually see traffic from, and has a high-risk score, you might want to block the account creation or flag it for manual review.

<details>
<summary>Example: Fraud Detection Dashboard</summary>

<p align="center">
  <img src="/mockups/fraud-detection-dashboard.png" alt="Fraud Detection Dashboard showing flagged signups with risk scores" />
</p>
<p align="center">
  <em>A fraud detection dashboard showing high-risk signups awaiting review with detailed risk signals including VPN detection, AS type, network risk scores, and device information.</em>
</p>

</details>

## Auditing and Monitoring
You can use Risk Intelligence data for auditing and monitoring purposes. By logging the risk scores and signals associated with user interactions, you can analyze patterns of behavior and identify potential security threats. For example, you might notice a spike in high-risk scores from a particular network, geographic region or device type, which could indicate a coordinated attack.

You can feed this data into your SIEM (Security Information and Event Management) system to correlate it with other security events.

## Account Sharing Prevention
Risk Intelligence can also help you detect and prevent account sharing. If you see a user logging in from multiple different browsers, devices or locations, it could indicate that the account is being shared among multiple people, which may violate your terms of service.

<details>
<summary>Example: Account Sharing Detection</summary>

<p align="center">
  <img src="/mockups/account-sharing-detection.png" alt="Account Sharing Detection showing concurrent sessions from multiple locations" />
</p>
<p align="center">
  <em>An account sharing detection view showing concurrent active sessions from New York, London, and Sydney with detailed device information and geographic distribution on a world map.</em>
</p>

</details>

## Known Bot Identification
More and more bots are active on the internet with the rise in LLMs and generative AI.

> *"ChatGPT go to this website, fill in the job application form with my details and submit it"*.

Risk Intelligence helps you identify these known bots,automated traffic, and user-initiated AI automation, allowing you to decide what to do with this traffic.

<details>
<summary>Example: Bot Detection Dashboard</summary>

<p align="center">
  <img src="/mockups/bot-detection-dashboard.png" alt="Bot Detection Dashboard showing bot traffic analysis" />
</p>
<p align="center">
  <em>A bot detection dashboard showing traffic distribution between humans and bots, top detected bots (GPTBot, Scrapy, ClaudeBot), and detailed bot activity with risk scores.</em>
</p>

</details>

## Custom Use Cases
The modular nature of Risk Intelligence allows you to use the specific data points that are most relevant to your use case. For example, if you are particularly concerned about users using anonymization services such as VPNs or proxies, you can focus on the signals provided by the **Anonymization Detection** module.
