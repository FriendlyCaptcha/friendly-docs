# ErrorCodes Class

ErrorCodes contains constants representing various error codes used in the Friendly Captcha SDK.

## Fields
### `FAILED_TO_ENCODE_REQUEST`

(-1, internal) Failed to encode request

#### Signature
```apex
global static final FAILED_TO_ENCODE_REQUEST
```

#### Type
String

---

### `REQUEST_FAILED`

(-1, internal) Failed to talk to the Friendly Captcha API

#### Signature
```apex
global static final REQUEST_FAILED
```

#### Type
String

---

### `FAILED_DUE_TO_CLIENT_ERROR`

(-1, internal) Verification failed due to a client error (check your credentials)

#### Signature
```apex
global static final FAILED_DUE_TO_CLIENT_ERROR
```

#### Type
String

---

### `FAILED_TO_DECODE_RESPONSE`

(-1, internal) Verification failed because we got an unexpected value from the server

#### Signature
```apex
global static final FAILED_TO_DECODE_RESPONSE
```

#### Type
String

---

### `AUTH_REQUIRED`

(401) You forgot to set the X-API-Key header

#### Signature
```apex
global static final AUTH_REQUIRED
```

#### Type
String

---

### `AUTH_INVALID`

(401) The API key you provided is invalid

#### Signature
```apex
global static final AUTH_INVALID
```

#### Type
String

---

### `SITEKEY_INVALID`

(400) The sitekey in your request is invalid

#### Signature
```apex
global static final SITEKEY_INVALID
```

#### Type
String

---

### `RESPONSE_MISSING`

(400) The response field is missing in your request

#### Signature
```apex
global static final RESPONSE_MISSING
```

#### Type
String

---

### `RESPONSE_INVALID`

(200) The response field is invalid

#### Signature
```apex
global static final RESPONSE_INVALID
```

#### Type
String

---

### `RESPONSE_TIMEOUT`

(200) The response has expired

#### Signature
```apex
global static final RESPONSE_TIMEOUT
```

#### Type
String

---

### `RESPONSE_DUPLICATE`

(200) The response has already been used

#### Signature
```apex
global static final RESPONSE_DUPLICATE
```

#### Type
String

---

### `BAD_REQUEST`

(400) Something else is wrong with your request, e.g. the request body was empty

#### Signature
```apex
global static final BAD_REQUEST
```

#### Type
String