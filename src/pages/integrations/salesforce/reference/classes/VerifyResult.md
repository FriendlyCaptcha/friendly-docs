# VerifyResult Class

VerifyResult is a wrapper around the response of an 
/api/v2/captcha/siteverify request. 
 
The main methods are `shouldAccept` and `wasAbleToVerify` . 
The first one you should use to determine if the user&#x27;s request should be accepted; 
the second one to determine if the request was able to be verified. 
If that returns false, you should alert yourself.

## Methods
### `isStrict()`

#### Signature
```apex
global Boolean isStrict()
```

#### Return Type
**Boolean**

whether the ,[object Object], option was set to true on the client. In,[object Object],        ,[object Object], mode this will only return ,[object Object],[object Object],        if the request was successful (e.g. verification could happen), and,[object Object],        the challenge was solved successfully.,[object Object],,[object Object],        By default, ,[object Object], is set to ,[object Object],, which means that the request,[object Object],        will be accepted if the challenge could,[object Object],        not be verified (also called *fail open*).

---

### `shouldAccept()`

Determines if the user&#x27;s request should be accepted.

#### Signature
```apex
global Boolean shouldAccept()
```

#### Return Type
**Boolean**

true if the request should be accepted, false otherwise.

---

### `shouldReject()`

Determines if the user&#x27;s request should be rejected.

#### Signature
```apex
global Boolean shouldReject()
```

#### Return Type
**Boolean**

true if the request should be rejected, false otherwise.

---

### `isEncodeError()`

Was unable to encode the captcha response. This means the captcha response 
was invalid and should never be accepted.

#### Signature
```apex
global Boolean isEncodeError()
```

#### Return Type
**Boolean**

true if there was an encoding error, false otherwise.

---

### `isRequestError()`

Something went wrong making the request to the Friendly Captcha API, perhaps 
there is a network connection issue?

#### Signature
```apex
global Boolean isRequestError()
```

#### Return Type
**Boolean**

true if there was a request error, false otherwise.

---

### `isDecodeError()`

Something went wrong decoding the response from the Friendly Captcha API.

#### Signature
```apex
global Boolean isDecodeError()
```

#### Return Type
**Boolean**

true if there was a decoding error, false otherwise.

---

### `isClientError()`

Something went wrong on the client side, this generally means your 
configuration is wrong. 
Check your secrets (API key) and sitekey. 
 
See `response.error` for more details.

#### Signature
```apex
global Boolean isClientError()
```

#### Return Type
**Boolean**

true if there was a client error, false otherwise.

---

### `getResponse()`

Get the response as was sent from the server. 
This can be null if the request to the API could not be made successfully.

#### Signature
```apex
global VerifyResponse getResponse()
```

#### Return Type
**[VerifyResponse](VerifyResponse)**

the response from the server, or null if the request failed.

---

### `getErrorCode()`

Get the error code.

#### Signature
```apex
global String getErrorCode()
```

#### Return Type
**String**

the error code, or null if not present.

---

### `getErrorDetail()`

Get the error detail.

#### Signature
```apex
global String getErrorDetail()
```

#### Return Type
**String**

the error detail, or null if not present.

---

### `wasAbleToVerify()`

Whether the request to verify the captcha was completed. In other words: the 
API responded with status 200. 
If this is false, you should notify yourself and check `getErrorCode()` to see 
what is wrong.

#### Signature
```apex
global Boolean wasAbleToVerify()
```

#### Return Type
**Boolean**

true if the request was able to be verified, false otherwise.

---

### `getException()`

Get the exception that was thrown, if any.

#### Signature
```apex
global Exception getException()
```

#### Return Type
**Exception**

the exception, or null if none was thrown.

## Classes
### NullErrorException Class