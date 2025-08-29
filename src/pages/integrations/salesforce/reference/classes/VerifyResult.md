# VerifyResult Class

VerifyResult is a wrapper around the response of an 
 `/api/v2/captcha/siteverify` request. 
 
The main methods are `shouldAccept` and `wasAbleToVerify` . 
The first one you should use to determine if the user&#x27;s request should be accepted; 
the second one to determine if the request was able to be verified. 
If that returns false, it means that there was an issue in the communication with the 
Friendly Captcha API, and you should log an error or notify your monitoring system.

## Methods
### `isStrict()`

Whether the `strict` option was set to true on the client. 
In `strict` mode this will only return `true` if the request was successful 
(e.g. verification could happen), and the challenge was solved successfully. 
 
By default, `strict` is set to `false` , which means that the request 
will be accepted if the challenge could not be verified (also called *fail open*).

#### Signature
```apex
global Boolean isStrict()
```

#### Return Type
**Boolean**

---

### `shouldAccept()`

Determines if the user&#x27;s request should be accepted. 
 
Returns true if the request should be accepted, false otherwise.

#### Signature
```apex
global Boolean shouldAccept()
```

#### Return Type
**Boolean**

---

### `shouldReject()`

Determines if the user&#x27;s request should be rejected. 
 
Returns rue if the request should be rejected, false otherwise.

#### Signature
```apex
global Boolean shouldReject()
```

#### Return Type
**Boolean**

---

### `isEncodeError()`

Was unable to encode the captcha response. This means the captcha response 
was invalid and should never be accepted. 
 
Returns rue if there was an encoding error, false otherwise.

#### Signature
```apex
global Boolean isEncodeError()
```

#### Return Type
**Boolean**

---

### `isRequestError()`

Something went wrong making the request to the Friendly Captcha API, perhaps 
there is a network connection issue? 
 
Returns true if there was a request error, false otherwise.

#### Signature
```apex
global Boolean isRequestError()
```

#### Return Type
**Boolean**

---

### `isDecodeError()`

Something went wrong decoding the response from the Friendly Captcha API. 
 
Returns true if there was a decoding error, false otherwise.

#### Signature
```apex
global Boolean isDecodeError()
```

#### Return Type
**Boolean**

---

### `isClientError()`

Something went wrong on the client side, this generally means your 
configuration is wrong. 
Check your secrets (API key) and sitekey. 
 
See `response.error` for more details. 
 
Returns true if there was a client error, false otherwise.

#### Signature
```apex
global Boolean isClientError()
```

#### Return Type
**Boolean**

---

### `getResponse()`

Get the response as was sent from the server. 
This can be null if the request to the API could not be made successfully. 
 
Returns the response from the server, or null if the request failed.

#### Signature
```apex
global VerifyResponse getResponse()
```

#### Return Type
**[VerifyResponse](VerifyResponse)**

---

### `getErrorCode()`

Get the error code. 
 
Returns the error code, or null if not present.

#### Signature
```apex
global String getErrorCode()
```

#### Return Type
**String**

---

### `getErrorDetail()`

Get the error detail. 
 
Returns the error detail, or null if not present.

#### Signature
```apex
global String getErrorDetail()
```

#### Return Type
**String**

---

### `wasAbleToVerify()`

Whether the request to verify the captcha was completed. In other words: the 
API responded with status 200. 
If this is false, you should notify yourself and check `getErrorCode()` to see 
what is wrong. 
 
Returns true if the request was able to be verified, false otherwise.

#### Signature
```apex
global Boolean wasAbleToVerify()
```

#### Return Type
**Boolean**

---

### `getException()`

Get the exception that was thrown, if any. 
 
Returns the exception, or null if none was thrown.

#### Signature
```apex
global Exception getException()
```

#### Return Type
**Exception**

## Classes
### NullErrorException Class