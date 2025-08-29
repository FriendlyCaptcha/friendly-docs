# Config

## API Name
`Config__mdt`

## Fields
### APIEndpoint

The endpoint URL used for communicating with the Friendly Captcha API. Shorthands &#x27;eu&#x27; or &#x27;global&#x27; are accepted. Default is &#x27;global&#x27;. Using the &#x27;eu&#x27; endpoint requires access that must be enabled in the Friendly Captcha dashboard.

**API Name**

`APIEndpoint__c`

**Type**

*Text*

---
### APIKey

An API key used for communicating with the Friendly Captcha API. Created in the Friendly Captcha dashboard.

**API Name**

`APIKey__c`

**Type**

*Text*

---
### Language

Language code such as &quot;en&quot; for English or &quot;de&quot; for German. Defaults to automatic language detection. Usually you should not set this yourself and instead let the widget detect the language automatically.

**API Name**

`Language__c`

**Type**

*Text*

---
### Sitekey

A Friendly Captcha sitekey associated with an application. Copied from the application configuration in the Friendly Captcha dashboard.

**API Name**

`Sitekey__c`

**Type**

*Text*

---
### StartMode

The start mode determines the behavior around automatic activation of the widget. Activation here means the challenge gets requested and gets solved.

**API Name**

`StartMode__c`

**Type**

*Picklist*

#### Possible values are
* auto
* focus
* none

---
### Strict

Determines the failure mode behavior of the captcha response verification (siteverify) result. This mode only applies when the API was not able to verify the response, which might occur for network connectivity reasons or a misconfiguration of the client. When &#x27;strict&#x27; is enabled, unverified responses will be set to &#x27;reject&#x27;, in a fail-closed behavior. When disabled (the default), unverified responses will be set to &#x27;accept&#x27;, in a fail-open behavior.

**API Name**

`Strict__c`

**Type**

*Checkbox*

---
### Theme

The theme for the widget.

**API Name**

`Theme__c`

**Type**

*Picklist*

#### Possible values are
* light
* dark
* auto

---
### Timeout

How long (in milliseconds) to wait for a captcha response verification request to complete.

**API Name**

`Timeout__c`

**Type**

*Number*

## Records
### Settings

**API Name**

`Config.Settings`