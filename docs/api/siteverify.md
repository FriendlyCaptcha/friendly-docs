# `/api/v2/captcha/siteverify`

The siteverify endpoint is used to verify captcha responses. A captcha response is the value that is embedded in your form by the captcha widget when the challenge has been completed.

## Request

Make a **POST** request to `https://global.frcapi.com/api/v2/captcha/siteverify` with the following parameters:

| POST Parameter | Type | Description |
|----------------|------|-----------------------------------------------------|
| `response`       | `string`| The response value that the user submitted in the `frc-captcha-response` field.         |
| `sitekey`        | `string` | **Optional:** the sitekey that you want to make sure the puzzle was generated from. |

:::note
The maximum size of the `response` value is 16KB. 
:::

:::tip
Remember to authenticate the request [using the `X-API-Key` header](./authentication).
:::

You can pass these parameters in a JSON body, or as formdata.

## Response

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
        "origin": "https://example.com" // Origin where the challenge happened. This can be empty if unknown.
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
    "detail": "..." // A human readable description of what went wrong.
  },
}
```

:::info

We aim to ***never*** change or remove *existing* fields from these responses. However, we may from time-to-time add *new* fields. We therefore strongly recommend implementing your response validation logic to allow for such field additions.

:::

### Error codes

Possible values for `error.error_code`.

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

 **If you are seeing status code 400 or 401 your server code is probably not configured correctly.**
:::

:::tip
**What to do when siteverify doesn't work**

If you receive a response code other than 200 in production, you should probably accept the user's response despite not having been able to verify it.


Maybe your server is misconfigured or the Friendly Captcha servers are down. While we try to make sure that never happens, it is a good idea to assume one day disaster will strike.

It is better to temporarily accept bots or spam than to reject all requests. *Do remember to send an alert to yourself!*

:::


## Troubleshooting & Tips

### `method_not_allowed`
If you are seeing an error that includes `method_not_allowed`, you are likely making a HTTP **GET** request. You can fix this by making a HTTP **POST** request instead.

### How do I use automated testing with Friendly Captcha?
You can mock out the siteverify response. Instead of talking to our API, your code could always return `{success: true}`. [This documentation page](../guides/automated-testing) has more details and alternative techniques.
