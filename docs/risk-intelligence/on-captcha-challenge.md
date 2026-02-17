# Risk Intelligence On Captcha Challenge

As a paid add-on we offer Risk Intelligence data when verifying any Friendly Captcha v2 challenge. This feature simplifies your integration by allowing you to get risk scores and signals about the user who solved the captcha challenge without needing to make a separate API call to our Risk Intelligence API or change your frontend integration.


With Risk Intelligence on Captcha Challenge you  get risk insights about the user at the moment they have solved the captcha, which can help you make decisions about how to handle the request. 

For example, if a user has a high-risk score, you might want to require additional verification steps, despite them solving the captcha challenge. Alternatively, you can store this data for auditing and monitoring purposes, or feed it into your existing fraud detection systems. This allows you to enhance your security and fraud detection capabilities without adding any friction to the user experience.

When enabled, the Risk Intelligence data will be included in the `risk_intelligence` field of the response from the [siteverify API](../api/siteverify.md). The data in the field is described in detail on the [Risk Intelligence Format](./format.md) page.