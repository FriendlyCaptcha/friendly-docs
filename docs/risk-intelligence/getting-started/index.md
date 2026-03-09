# Getting started with Risk Intelligence

There are two parts to getting Risk Intelligence data. First, you generate a Risk Intelligence _**token**_ in your project's front-end. Second, you use that token to retrieve Risk Intelligence _**data**_ from the Friendly Captcha API via your project's back-end.

<figure style={{ textAlign: "center" }}>
  <div style={{ transform: "scale(1.3)" }}>
    ![The Risk Intelligence request flow](./flow.svg)
  </div>
  <figcaption style={{ fontStyle: "italic" }}>The request flow for Risk Intelligence, showing token generation and data retrieval.</figcaption>
</figure>

With the data in your project's back-end, you can make Risk Intelligence-informed decisions about how to handle user actions in your project---e.g., require another authentication step, or send a suspicious account activity email. To get a sense of some possibilities, take a look at [the list of use cases](../use-cases.md).

To get started, follow these steps:

1. [Create a sitekey and API key.](./setup.md)
2. [Generate a Risk Intelligence token in your project's front-end.](./generate.md)
3. [Retrieve Risk Intelligence data in your project's back-end.](./retrieve.md)
