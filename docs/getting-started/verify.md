# Verify the response

When the captcha challenge is completed by the user, the user's browser receives a piece of text that proves that they completed the challenge. This proof is called the **response**.

The widget embeds this response in the form which is submitted to your server in a field called `frc-captcha-response`.

Your server needs to talk to Friendly Captcha's API to make sure the response is valid. **Without this verification there is no protection**.

:::info
If you are using the Javascript SDK, you can also embed the response in any other action you want to protect.
:::

## Verifying the solution (*siteverify*)


### Create an API key

You will need an API key to prove it's you, you can create one on the [**API Keys page**](https://app.friendlycaptcha.eu/dashboard/accounts/-/apikeys) in the dashboard.

### Make the siteverify request

To verify the CAPTCHA solution, make a **POST** request to `https://global.frcapi.com/api/v2/captcha/siteverify` with the following parameters:

| POST Parameter | Type | Description |
|----------------|----------------|-------------------------------------------------------------------------------|
| `response`     | `string`     | The response value that the user submitted in the `frc-captcha-response` field.     |
| `sitekey`      | `string`     | **Optional:** the sitekey that you want to make sure the puzzle was generated from. |

You can pass these parameters in a JSON body or as formdata.

To authenticate the request, make the request with the following header:

| Header | Description |
|----------------|-----------------------------------------------------|
| `X-API-Key`       | The API key you created in the previous step. |

### The siteverify response

The response will tell you whether the captcha response is valid, meaning the captcha was solved succesfully. 

The response body is a JSON object which has a `success` field that tells you whether the response was valid or not.

**Example `success=true` verification**

```json
{
  "success": true,
  "data": {
    "event_id": "ev_CkK-YXwlFf-15_f", // Unique identifier for the siteverify request.
    "challenge": {
        "timestamp": "2025-03-18T13:01:25Z", // ISO 8601 timestamp when the captcha challenge was completed.
        "origin": "example.com" // Origin where the challenge happened. This can be empty if unknown.
    }
  }
}
```

**Example `success=false` response**

```json
{
  "success": false,
  "error": {
    "error_code": "bad_request", // Error code, see the table below for possible values
    "detail": "..." // Extra details (this is mainly intended for Friendly Captcha staff)
  },
}
```

:::info

We aim to ***never*** change or remove *existing* fields from these responses. However, we may from time-to-time add *new* fields. We therefore strongly recommend implementing your response validation logic to allow for such field additions.

:::

Below is a list of possible values for `error_code`. **If you are seeing status code 400 or 401 your server code is probably not configured correctly.**

| Error code   | Status |Description |
|----------------|----------|-------------------------------------------|
| `auth_required`       | 401 | You forgot to set the `X-API-Key` header. |
| `auth_invalid`       | 401 | The API key you provided was invalid. |
| `sitekey_invalid` | 400 | The sitekey in your request is invalid. |
| `response_missing` | 400 | You forgot to add the response parameter. |
| `response_invalid` | 200 | The response you provided was invalid (perhaps the user tried to work around the captcha). |
| `response_timeout` | 200 | The response has expired. |
| `response_duplicate` | 200 | The response has already been used. |
| `bad_request` | 400 | Something else is wrong with your request, e.g. your request body is empty. |

:::warning Warning
 Status code **200** does not mean the solution was valid. It means the verification was performed succesfully. Use the `success` field.
:::

#### Why can a solution be invalid?
A solution can be invalid for a number of reasons, perhaps the user submitted before the captcha widget was finished, or they are trying to use a response more than once.

The first case can be prevented by disabling the submit button until the CAPTCHA has been completed succesfully.


:::tip

**What to do when siteverify doesn't work**

If you receive a response code other than 200 in production, you should probably accept the user's response despite not having been able to verify it.


Maybe your server is misconfigured or the Friendly Captcha servers are down. While we try to make sure that never happens, it is a good idea to assume one day disaster will strike.

It is better to temporarily accept bots or spam than to reject all requests. *Do remember to send an alert to yourself!*

:::

## API Reference
For more thorough docs, please see the [API Reference](../api/index.md).
