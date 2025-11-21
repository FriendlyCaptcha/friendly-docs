# Options Class

Options manages configuration parameters used by the [Client](Client) . 
Parameters are set via a fluent interface. 
 
**Example** 
```apex
Options opts = new Options()
  .sitekey('FC0123456789ABCD')
  .timeout(500);

System.debug(opts.sitekey());
```

## Methods
### `sitekey()`

#### Signature
```apex
global String sitekey()
```

#### Return Type
**String**

---

### `sitekey(sitekey)`

#### Signature
```apex
global Options sitekey(String sitekey)
```

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| sitekey | String |  |

#### Return Type
**[Options](Options)**

---

### `apiKey()`

#### Signature
```apex
global String apiKey()
```

#### Return Type
**String**

---

### `apiKey(apiKey)`

#### Signature
```apex
global Options apiKey(String apiKey)
```

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| apiKey | String |  |

#### Return Type
**[Options](Options)**

---

### `apiEndpoint()`

#### Signature
```apex
global String apiEndpoint()
```

#### Return Type
**String**

---

### `apiEndpoint(apiEndpoint)`

#### Signature
```apex
global Options apiEndpoint(String apiEndpoint)
```

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| apiEndpoint | String |  |

#### Return Type
**[Options](Options)**

---

### `strict()`

#### Signature
```apex
global Boolean strict()
```

#### Return Type
**Boolean**

---

### `strict(strict)`

#### Signature
```apex
global Options strict(Boolean strict)
```

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| strict | Boolean |  |

#### Return Type
**[Options](Options)**

---

### `timeout()`

#### Signature
```apex
global Integer timeout()
```

#### Return Type
**Integer**

---

### `timeout(timeout)`

#### Signature
```apex
global Options timeout(Integer timeout)
```

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| timeout | Integer |  |

#### Return Type
**[Options](Options)**

## Classes
### InvalidOptionsException Class