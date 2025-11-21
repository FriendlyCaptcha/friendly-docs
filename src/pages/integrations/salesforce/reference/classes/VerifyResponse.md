# VerifyResponse Class

Represents the data structure returned in the siteverify response 
from the Friendly Captcha API. 
 
For more information, see [the API response documentation](/docs/v2/api/siteverify#response).

## Fields
### `success`

#### Signature
```apex
global success
```

#### Type
Boolean

---

### `data`

#### Signature
```apex
global data
```

#### Type
Data

---

### `error`

#### Signature
```apex
global error
```

#### Type
Error

## Methods
### `isSuccess()`

#### Signature
```apex
global Boolean isSuccess()
```

#### Return Type
**Boolean**

## Classes
### Data Class

#### Fields
##### `challenge`

###### Signature
```apex
global challenge
```

###### Type
Challenge

### Challenge Class

#### Fields
##### `timestamp`

###### Signature
```apex
global timestamp
```

###### Type
String

---

##### `origin`

###### Signature
```apex
global origin
```

###### Type
String

### Error Class

#### Fields
##### `error_code`

###### Signature
```apex
global error_code
```

###### Type
String

---

##### `detail`

###### Signature
```apex
global detail
```

###### Type
String