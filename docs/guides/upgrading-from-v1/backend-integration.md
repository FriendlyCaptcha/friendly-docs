---
sidebar_position: 4
---

# Backend Integration

## 1. Change the field name in your forms

The default name of the field in HTML forms was `frc-captcha-solution`. The new name is  `frc-captcha-response`. Find and replace any old occurences.

## 2. Change to the new siteverify endpoint URL

Update the siteverify endpoint URL from

```
https://api.friendlycaptcha.com/api/v1/siteverify
```

to

```shell
https://global.frcapi.com/api/v2/captcha/siteverify

# or in case you prefer to talk to our EU endpoint from your backend
https://eu.frcapi.com/api/v2/captcha/siteverify
```

## 3. Replace the secret field.

The `secret` field is no longer used, instead you send your API key in the following header:

| Header Name | Header Value |
|----------------|-----------------------------------------------------|
| `X-API-Key`       | Your API Key (`A1...`) |

## 4. Handle the new response layout

In v1 the response from siteverify would look like this:

```json
{
  "success": true|false,
  "errors": [...] // optional
}
```

The most notable change is that in v2 the `errors` array is removed, and replaced by a single `error` object:

```json
{
  "success": false,
  "error": {
    "error_code": "response_invalid",
    "detail": "..." // A human description of the error.
  }
}
```
For possible values of `error_code`, see the [documentation page](../../api/endpoints/siteverify). The status codes are unchanged.


