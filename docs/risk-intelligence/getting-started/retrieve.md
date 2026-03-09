# Retrieve Risk Intelligence data

To retrieve Risk Intelligence data using a token, you need to send a request containing the token authenticated by the Friendly Captcha API key you created in [the first step](./setup.md#api-key).

### Send the retrieve request

To retrieve the data, send a **POST** request to `https://global.frcapi.com/api/v2/riskIntelligence/retrieve` with the following parameters.

| POST Parameter | Type | Description |
|-|-|-|
| `token` | `string` | The Risk Intelligence token generated in your application's front-end. |
| `sitekey` | `string` | **Optional:** The sitekey used in toke generation, for an extra layer of back-end validation. |

These parameters can be passed as JSON data or FormData.

#### Authentication

To authenticate the request, set the following header.

| Header | Description |
|-|-|
| `X-API-Key` | The API you created in your Friendly Captcha account. |

### The retrieve response

The response body is a JSON object with a `success` field that indicates whether the response is valid or not.

#### Example `success=true` response

```json
{
  "success": true,
  "data": {
    "event_id": "ev_C52P4pm-xkZIHB5Y", // Unique identifier for the retrieve request.
    "token": {
      "timestamp": "2026-03-05T11:22:51.922Z", // ISO 8601 timestamp when the token was created.
      "expires_at": "2026-03-05T11:37:51.922Z", // ISO 8601 timestamp for when the token will expire.
      "num_uses": 1 // Counter representing the number of times the token has been used to retrieve Risk Intelligence data.
    },
    "risk_intelligence": {
        // see http://developer.friendlycaptcha.com/docs/v2/risk-intelligence/#risk-intelligence-data-format
        // for an example of Risk Intelligence data.
    }
  }
}
```

#### Example `success=false` response

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

We aim to ***never*** fundamentally change or remove *existing* fields from these responses. However, you should expect us to add *new* fields in the future.

:::

Below is a list of possible values for `error_code`. **If you are seeing status code 400 or 401 your server code is probably not configured correctly.**

| Error code | Status | Description |
|-|-|-|
| `auth_required` | 401 | You forgot to set the `X-API-Key` header. |
| `auth_invalid` | 401 | The API key you provided was invalid. |
| `sitekey_invalid` | 400 | The sitekey in your request is invalid. |
| `token_missing` | 400 | You forgot to add the token parameter. |
| `token_expired` | 400 | The response has expired. |
| `bad_request` | 400 | Something else is wrong with your request; e.g. your token is invalid. |
