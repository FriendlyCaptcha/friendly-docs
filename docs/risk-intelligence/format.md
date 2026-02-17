# Format

Risk Intelligence data is returned in a structured JSON format that includes various risk signals and scores. The exact structure of the data may vary depending on which modules you have enabled on your account (as of writing, all modules are included by default).

:::info
The structure of the Risk Intelligence data is subject to change. We always aim for backwards compatibility, your validation and parsing logic should be flexible enough to handle new fields being added in the future.
:::

## Structure Overview
The Risk Intelligence data is organized into three high level sections:

```json
{
    risk_scores: { ... },          // Overall risk scores summarizing the assessment into scores per category (1-5).
    network: { ... },              // Information about the user's network and IP address.
    client: { ... },              // Detected browser or bot information.
}
```

### Risk Scores
The `risk_scores` section provides a summary of the risk assessment in the form of scores for different categories. Each score is an integer value between 1 and 5, where 1 indicates very low risk and 5 indicates very high risk. 

The available risk scores include:
* `overall`: An overall risk score that combines all available signals into a single score.
* `network`: A risk score based on network-related signals such as IP reputation, ASN information, and geolocation. You can interpret this score as, based on the user's network characteristics, how likely the request is to be automated, fraudulent or malicious.
* `browser`: A risk score based on browser-related signals such as user agent, browser identification, bot identification and other client-side characteristics. This score helps assess the likelihood of the request being automated or coming from a suspicious client.

<details>
<summary>JSON Example</summary>

```json
"risk_scores": {
    "overall": 2,
    "network": 2,
    "browser": 1
}
```
</details>


### Network Information
The `network` section provides detailed information about the user's network and IP address. This includes.

:::info
The IP address is never stored on our servers in an unhashed format. We encode it into the risk intelligence token so that we can pass it on to you.

You can compare this IP address to the one you see in your server logs to correlate the risk intelligence data with specific requests.
:::

* `ip`: The IP address of the user when the risk intelligence data was gathered on the frontend.
* `as`: Information about the Autonomous System (AS) associated with the user's IP address, including ASN, AS name, company, description, domain, country, RIR, route and type.
* `geolocation`: Geographic information about the user's IP address, including city, region, country.
* `anonymization`: Signals indicating whether the user is using anonymization services such as VPNs or proxies, including VPN detection, proxy detection, Tor detection.

<details>
<summary>JSON Example</summary>

```json
"network": {
    "ip": "88.64.123.45"
    "as": {
      "asn": 3209,
      "name": "VODANET",
      "company": "Vodafone GmbH",
      "description": "Provides mobile and fixed broadband and telecommunication services to consumers and businesses.",
      "domain": "vodafone.de",
      "country": "DE",
      "rir": "RIPE",
      "route": "88.64.0.0/12",
      "type": "isp"
    },
    "geolocation": {
      "country": {
        "iso2": "DE",
        "iso3": "DEU",
        "name": "Germany",
        "name_native": "Deutschland",
        "region": "Europe",
        "subregion": "Western Europe",
        "currency": "EUR",
        "currency_name": "Euro",
        "phone_code": "49",
        "capital": "Berlin"
      },
      "city": "Eschborn",
      "state": "Hessen"
    },
    "anonymization": {
      "vpn_score": 2,
      "proxy_score": 1,
      "tor": false,
      "icloud_private_relay": false
    }
}
```
</details>

### Client Information
The `client` section provides information about the user's client, which can be a browser or a bot. This includes:
* `browser`: Detected browser information, including browser name, version, rendering engine, device type, brand and model, and operating system.
* `tls_signature`: TLS/SSL-derived information, including JA3 and JA4 signatures. These signatures can be used to identify specific clients and detect anomalies.
* `automation`: Signals related to automation and bot detection, including detected automation tools and bot types.

<details>
<summary>JSON Example</summary>

```json
"client": {
    "header_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0",
    "time_zone": {
      "name": "Europe/Berlin",
      "country_iso2": "DE"
    },
    "browser": {
      "id": "firefox",
      "name": "Firefox",
      "version": "146.0",
      "release_date": "2026-01-28"
    },
    "browser_engine": {
      "id": "gecko",
      "name": "Gecko",
      "version": "146.0"
    },
    "device": {
      "type": "desktop",
      "brand": "",
      "model": ""
    },
    "os": {
      "id": "windows",
      "name": "Windows",
      "version": "10"
    },
    "tls_signature": {
      "ja3": "d87a30a5782a73a83c1544bb06332780",
      "ja3n": "28ecc2d2875b345cecbb632b12d8c1e0",
      "ja4": "t13d1516h2_8daaf6152771_02713d6af862"
    },
    "automation": {
      "automation_tool": {
        "detected": false,
        "id": "",
        "name": "",
        "type": ""
      },
      "known_bot": {
        "detected": false,
        "id": "",
        "name": "",
        "type": "",
        "url": ""
      }
    }
}
```
</details>

## Field Reference

A comprehensive breakdown of all fields in the Risk Intelligence data format.

### Risk Scores

<details>
<summary><code>risk_scores</code> - Risk assessment scores</summary>

Risk scores summarize the entire risk intelligence assessment into scores per category. Each score is an integer from 0-5.

| Value | Meaning |
|-------|---------|
| `0` | Unknown or missing |
| `1` | Very low risk |
| `2` | Low risk |
| `3` | Medium risk |
| `4` | High risk |
| `5` | Very high risk |


:::info
**Why are risk scores not a percentage or a decimal score?**
We use a 1-5 integer scale to make it easier for you to set thresholds and make decisions based on the scores. A percentage or decimal score can give a false sense of precision, while in reality the underlying data and signals are often noisy and not precise enough to justify that level of granularity (ie what is the difference between 81% and 82% risk?).

The 1-5 scale provides a more actionable and interpretable way to use the risk scores in your decision-making processes.
:::

<details>
<summary><code>overall</code> - Overall risk score</summary>

**Type:** Integer (0-5)  
**Description:** A combined risk score that aggregates all available signals into a single assessment.

**Example:**
```json
"overall": 2
```
</details>

<details>
<summary><code>network</code> - Network risk score</summary>

**Type:** Integer (0-5)  
**Description:** Risk score based on network-related signals such as IP reputation, ASN information, geolocation, past abuse from this network, and other network characteristics. Indicates the likelihood of automation or malicious activity based on the network.

**Example:**
```json
"network": 2
```
</details>

<details>
<summary><code>browser</code> - Browser risk score</summary>

**Type:** Integer (0-5)  
**Description:** Risk score based on browser-related signals such as user agent consistency, automation traces, past abuse, and browser characteristics. Indicates the likelihood of automation, malicious activity, or browser spoofing.

**Example:**
```json
"browser": 1
```
</details>

</details>

### Network

<details>
<summary><code>network</code> - Network and IP information</summary>

Contains information about the user's network, IP address, and related characteristics.

<details>
<summary><code>ip</code> - Client IP address</summary>

**Type:** String  
**Description:** The IP address used when requesting the challenge. You can compare this IP with the one that is submitting to your backend. Note that IP addresses can change mid-session, for example when users are on mobile networks or using certain ISPs - so do create a way for users to update the IP address associated with a session in your system.

**Example:**
```json
"ip": "88.64.4.22"
```
</details>

<details>
<summary><code>as</code> - Autonomous System information</summary>

**Type:** Object or `null`  
**Description:** Information about the Autonomous System that owns the IP address.

<details>
<summary><code>number</code> - ASN</summary>

**Type:** Integer  
**Description:** Autonomous System Number (ASN) identifier.

**Example:**
```json
"number": 3209
```
</details>

<details>
<summary><code>name</code> - AS name</summary>

**Type:** String  
**Description:** Short name or handle of the autonomous system.

**Example:**
```json
"name": "VODANET"
```
</details>

<details>
<summary><code>company</code> - Company name</summary>

**Type:** String  
**Description:** Organization name that owns the ASN.

**Example:**
```json
"company": "Vodafone GmbH"
```
</details>

<details>
<summary><code>description</code> - Company description</summary>

**Type:** String  
**Description:** Short description of the company that owns the ASN.

**Example:**
```json
"description": "Provides mobile and fixed broadband and telecommunication services to consumers and businesses."
```
</details>

<details>
<summary><code>domain</code> - Company domain</summary>

**Type:** String  
**Description:** Domain name associated with the ASN.

**Example:**
```json
"domain": "vodafone.de"
```
</details>

<details>
<summary><code>country</code> - ASN country</summary>

**Type:** String  
**Description:** Two-letter ISO 3166-1 alpha-2 country code where the ASN is registered.

**Example:**
```json
"country": "DE"
```
</details>

<details>
<summary><code>rir</code> - Regional Internet Registry</summary>

**Type:** String  
**Description:** RIR that allocated the ASN.

**Possible Values:**
- `"ARIN"` - American Registry for Internet Numbers (North America)
- `"RIPE"` - Réseaux IP Européens (Europe, Middle East, Central Asia)
- `"APNIC"` - Asia-Pacific Network Information Centre
- `"LACNIC"` - Latin America and Caribbean Network Information Centre
- `"AFRINIC"` - African Network Information Centre

**Example:**
```json
"rir": "RIPE"
```
</details>

<details>
<summary><code>route</code> - IP route</summary>

**Type:** String  
**Description:** IP route in CIDR notation associated with the ASN.

**Example:**
```json
"route": "88.64.0.0/12"
```
</details>

<details>
<summary><code>type</code> - AS type</summary>

**Type:** String  
**Description:** Type classification of the autonomous system.

**Possible Values:**
- `"isp"` - Internet Service Provider
- `"mobile"` - Mobile network operator
- `"government"` - Government organization
- `"hosting"` - Hosting/data center provider
- `"education"` - Educational institution
- `"individual"` - Individual/personal ASN
- `"business"` - Business/corporate network
- `"other"` - Other/uncategorized

**Example:**
```json
"type": "isp"
```
</details>

</details>

<details>
<summary><code>geolocation</code> - Geographic location</summary>

**Type:** Object or `null`  
**Description:** Geographic location information for the IP address.

<details>
<summary><code>country</code> - Country information</summary>

**Type:** Object  
**Description:** Detailed information about the country.

<details>
<summary><code>iso2</code> - ISO 3166-1 alpha-2 code</summary>

**Type:** String  
**Description:** Two-letter country code.

**Example:**
```json
"iso2": "DE"
```
</details>

<details>
<summary><code>iso3</code> - ISO 3166-1 alpha-3 code</summary>

**Type:** String  
**Description:** Three-letter country code.

**Example:**
```json
"iso3": "DEU"
```
</details>

<details>
<summary><code>name</code> - Country name</summary>

**Type:** String  
**Description:** English name of the country.

**Example:**
```json
"name": "Germany"
```
</details>

<details>
<summary><code>name_native</code> - Native country name</summary>

**Type:** String  
**Description:** Country name in its native language.

**Example:**
```json
"name_native": "Deutschland"
```
</details>

<details>
<summary><code>region</code> - Geographic region</summary>

**Type:** String  
**Description:** Major world region.

**Example:**
```json
"region": "Europe"
```
</details>

<details>
<summary><code>subregion</code> - Geographic subregion</summary>

**Type:** String  
**Description:** More specific world region.

**Example:**
```json
"subregion": "Western Europe"
```
</details>

<details>
<summary><code>currency</code> - Currency code</summary>

**Type:** String  
**Description:** ISO 4217 currency code.

**Example:**
```json
"currency": "EUR"
```
</details>

<details>
<summary><code>currency_name</code> - Currency name</summary>

**Type:** String  
**Description:** Full name of the primary currency used in the country.

**Example:**
```json
"currency_name": "Euro"
```
</details>

<details>
<summary><code>phone_code</code> - Country phone code</summary>

**Type:** String  
**Description:** International dialing code.

**Example:**
```json
"phone_code": "49"
```
</details>

<details>
<summary><code>capital</code> - Capital city</summary>

**Type:** String  
**Description:** Name of the capital city.

**Example:**
```json
"capital": "Berlin"
```
</details>

</details>

<details>
<summary><code>city</code> - City name</summary>

**Type:** String  
**Description:** City of the IP address. Empty string if unknown.

**Example:**
```json
"city": "Eschborn"
```
</details>

<details>
<summary><code>state</code> - State/region/province</summary>

**Type:** String  
**Description:** State, region, or province of the IP address. Empty string if unknown.

**Example:**
```json
"state": "Hessen"
```
</details>

</details>

<details>
<summary><code>abuse_contact</code> - Abuse contact information</summary>

**Type:** Object or `null`  
**Description:** Contact information for reporting network abuse.

<details>
<summary><code>address</code> - Postal address</summary>

**Type:** String  
**Description:** Postal address of the abuse contact.

**Example:**
```json
"address": "Vodafone GmbH, Campus Eschborn, Duesseldorfer Strasse 15, D-65760 Eschborn, Germany"
```
</details>

<details>
<summary><code>name</code> - Contact name</summary>

**Type:** String  
**Description:** Name of the abuse contact person or team.

**Example:**
```json
"name": "Vodafone Germany IP Core Backbone"
```
</details>

<details>
<summary><code>email</code> - Contact email</summary>

**Type:** String  
**Description:** Abuse contact email address.

**Example:**
```json
"email": "abuse.de@vodafone.com"
```
</details>

<details>
<summary><code>phone</code> - Contact phone</summary>

**Type:** String  
**Description:** Abuse contact phone number. This can be in various formats, but often includes the country code. Note that not all abuse contacts provide a phone number.

**Example:**
```json
"phone": "+49 6196 52352105"
```
</details>

</details>

<details>
<summary><code>anonymization</code> - Anonymization detection</summary>

**Type:** Object or `null`  
**Description:** Detection of VPNs, proxies, and anonymization services.

<details>
<summary><code>vpn_score</code> - VPN detection score</summary>

**Type:** Integer (0-5)  
**Description:** Likelihood that a VPN is being used. Higher scores indicate stronger evidence of VPN usage.

**Example:**
```json
"vpn_score": 2
```
</details>

<details>
<summary><code>proxy_score</code> - Proxy detection score</summary>

**Type:** Integer (0-5)  
**Description:** Likelihood that the user is connecting through a proxy server. Higher scores indicate stronger evidence of proxy usage.

**Example:**
```json
"proxy_score": 1
```
</details>

<details>
<summary><code>tor</code> - Tor exit node</summary>

**Type:** Boolean  
**Description:** Whether the IP is a Tor exit node.

**Example:**
```json
"tor": false
```
</details>

<details>
<summary><code>icloud_private_relay</code> - iCloud Private Relay</summary>

**Type:** Boolean  
**Description:** Whether the IP is from iCloud Private Relay.

**Example:**
```json
"icloud_private_relay": false
```
</details>

</details>

</details>

### Client

<details>
<summary><code>client</code> - User agent and device information</summary>

Contains information about the client device, browser, and operating system.

<details>
<summary><code>header_user_agent</code> - User-Agent header</summary>

**Type:** String  
**Description:** The User-Agent HTTP header value.

**Example:**
```json
"header_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:146.0) Gecko/20100101 Firefox/146.0"
```
</details>

<details>
<summary><code>time_zone</code> - Time zone information</summary>

**Type:** Object or `null`  
**Description:** IANA time zone information from the browser.

<details>
<summary><code>name</code> - IANA time zone</summary>

**Type:** String  
**Description:** IANA time zone name reported by the browser.

**Example:**
```json
"name": "America/New_York"
```
</details>

<details>
<summary><code>country_iso2</code> - Country from time zone</summary>

**Type:** String  
**Description:** Two-letter ISO 3166-1 alpha-2 country code derived from the time zone. Returns `"XU"` if timezone is missing or cannot be mapped to a country (e.g., "Etc/UTC").

**Example:**
```json
"country_iso2": "US"
```
</details>

</details>

<details>
<summary><code>browser</code> - Browser information</summary>

**Type:** Object or `null`  
**Description:** Detected browser details.

<details>
<summary><code>id</code> - Browser identifier</summary>

**Type:** String  
**Description:** Unique browser identifier. Empty string if browser could not be identified.

**Possible Values:**
- `"chrome"` - Chrome
- `"chrome_android"` - Chrome for Android
- `"edge"` - Microsoft Edge
- `"firefox"` - Firefox
- `"firefox_android"` - Firefox for Android
- `"ie"` - Internet Explorer
- `"oculus"` - Quest Browser (Oculus)
- `"opera"` - Opera
- `"opera_android"` - Opera for Android
- `"safari"` - Safari
- `"safari_ios"` - Safari on iOS
- `"samsunginternet_android"` - Samsung Internet for Android
- `"webview_android"` - WebView on Android
- `"webview_ios"` - WebView on iOS
- `""` - Unknown

**Example:**
```json
"id": "firefox"
```
</details>

<details>
<summary><code>name</code> - Browser name</summary>

**Type:** String  
**Description:** Human-readable browser name. Empty string if browser could not be identified.

**Example:**
```json
"name": "Firefox"
```
</details>

<details>
<summary><code>version</code> - Browser version</summary>

**Type:** String  
**Description:** Browser version number. Assumed to be the most recent release matching the signature if exact version unknown. Empty if unknown.

**Example:**
```json
"version": "146.0"
```
</details>

<details>
<summary><code>release_date</code> - Version release date</summary>

**Type:** String  
**Description:** Release date of the browser version in "YYYY-MM-DD" format. Empty string if unknown.

**Example:**
```json
"release_date": "2026-01-28"
```
</details>

</details>

<details>
<summary><code>browser_engine</code> - Rendering engine information</summary>

**Type:** Object or `null`  
**Description:** Browser rendering engine details.

<details>
<summary><code>id</code> - Engine identifier</summary>

**Type:** String  
**Description:** Unique rendering engine identifier. Empty string if engine could not be identified.

**Possible Values:**
- `"blink"` - Blink (Chromium-based browsers like Chrome, Edge, Opera)
- `"edgehtml"` - EdgeHTML (legacy Microsoft Edge, no longer developed)
- `"gecko"` - Gecko (Firefox)
- `"presto"` - Presto (legacy Opera, no longer developed)
- `"trident"` - Trident (Internet Explorer)
- `"v8"` - V8 JavaScript engine
- `"webkit"` - WebKit (Safari)
- `""` - Unknown

**Example:**
```json
"id": "gecko"
```
</details>

<details>
<summary><code>name</code> - Engine name</summary>

**Type:** String  
**Description:** Human-readable engine name. Empty string if engine could not be identified.

**Example:**
```json
"name": "Gecko"
```
</details>

<details>
<summary><code>version</code> - Engine version</summary>

**Type:** String  
**Description:** Rendering engine version. Assumed to be the most recent release matching the signature if exact version unknown. Empty if unknown.

**Example:**
```json
"version": "146.0"
```
</details>

</details>

<details>
<summary><code>device</code> - Device information</summary>

**Type:** Object or `null`  
**Description:** Device type and details.

<details>
<summary><code>type</code> - Device type</summary>

**Type:** String  
**Description:** Type of device.

**Possible Values:**
- `"desktop"` - Desktop device
- `"mobile"` - Mobile phone
- `"tablet"` - Tablet device
- `"tv"` - TV device
- `"console"` - Game console (PlayStation, Xbox, etc.)
- `"wearable"` - Wearable device (smartwatch, fitness tracker, etc.)
- `"xr"` - Extended reality device (VR headset, AR glasses, etc.)
- `"unknown"` - Unknown device type

**Example:**
```json
"type": "desktop"
```
</details>

<details>
<summary><code>brand</code> - Device brand</summary>

**Type:** String  
**Description:** Manufacturer brand.

**Example:**
```json
"brand": "Apple"
```
</details>

<details>
<summary><code>model</code> - Device model</summary>

**Type:** String  
**Description:** Device model name.

**Example:**
```json
"model": "iPhone 17"
```
</details>

</details>

<details>
<summary><code>os</code> - Operating system information</summary>

**Type:** Object or `null`  
**Description:** Detected operating system details.

<details>
<summary><code>id</code> - OS identifier</summary>

**Type:** String  
**Description:** Unique operating system identifier. Empty string if OS could not be identified.

**Possible Values:**
- `"windows"` - Microsoft Windows
- `"macos"` - Apple macOS
- `"linux"` - Linux
- `"android"` - Android
- `"ios"` - Apple iOS
- `"ipados"` - Apple iPadOS
- `"chromeos"` - ChromeOS
- `""` - Unknown

**Example:**
```json
"id": "windows"
```
</details>

<details>
<summary><code>name</code> - OS name</summary>

**Type:** String  
**Description:** Human-readable operating system name. Empty string if OS could not be identified.

**Example:**
```json
"name": "Windows"
```
</details>

<details>
<summary><code>version</code> - OS version</summary>

**Type:** String  
**Description:** Operating system version number.

**Example:**
```json
"version": "10"
```
</details>

</details>

<details>
<summary><code>tls_signature</code> - TLS/SSL signatures</summary>

**Type:** Object or `null`  
**Description:** TLS client hello signatures (also called TLS fingerprints) derived from the TLS handshake between the client and server.

<details>
<summary><code>ja3</code> - JA3 signature</summary>

**Type:** String  
**Description:** JA3 TLS fingerprint hash.

**Example:**
```json
"ja3": "d87a30a5782a73a83c1544bb06332780"
```
</details>

<details>
<summary><code>ja3n</code> - JA3N signature</summary>

**Type:** String  
**Description:** JA3N TLS fingerprint hash.

**Example:**
```json
"ja3n": "28ecc2d2875b345cecbb632b12d8c1e0"
```
</details>

<details>
<summary><code>ja4</code> - JA4 signature</summary>

**Type:** String  
**Description:** JA4 TLS fingerprint.

**Example:**
```json
"ja4": "t13d1516h2_8daaf6152771_02713d6af862"
```
</details>

</details>

<details>
<summary><code>automation</code> - Automation and bot detection</summary>

**Type:** Object or `null`  
**Description:** Information about detected automation and bots.

<details>
<summary><code>automation_tool</code> - Automation tool detection</summary>

**Type:** Object  
**Description:** Detected automation tool information. Note that many automation tools are designed to mimic real browsers and may not be detected, so a value of `detected: false` does not necessarily mean that no automation is being used. The browser risk score can help assess the likelihood of automation even when specific tools are not detected.

<details>
<summary><code>detected</code> - Detection flag</summary>

**Type:** Boolean  
**Description:** Whether an automation tool was detected.

**Example:**
```json
"detected": false
```
</details>

<details>
<summary><code>id</code> - Tool identifier</summary>

**Type:** String  
**Description:** Automation tool identifier. Empty if no tool detected.

**Examples:** `"puppeteer"`, `"playwright"`, `"webdriver"`

**Example:**
```json
"id": "playwright"
```
</details>

<details>
<summary><code>name</code> - Tool name</summary>

**Type:** String  
**Description:** Human-readable tool name. Empty if no tool detected.

**Examples:** `"Puppeteer"`, `"Playwright"`, `"WebDriver"`

**Example:**
```json
"name": "Playwright"
```
</details>

<details>
<summary><code>type</code> - Tool type</summary>

**Type:** String  
**Description:** Type of automation tool. Empty if no tool detected.

**Possible Values:**
- `"browser_automation"` - Browser automation tool (e.g., Puppeteer, WebDriver, Playwright)
- `""` - No tool detected

Note

**Example:**
```json
"type": "browser_automation"
```
</details>

</details>

<details>
<summary><code>known_bot</code> - Known bot detection</summary>

**Type:** Object  
**Description:** Detected known bot information. Known bots have public documentation about their identity and purpose.

<details>
<summary><code>detected</code> - Detection flag</summary>

**Type:** Boolean  
**Description:** Whether a known bot was detected.

**Example:**
```json
"detected": false
```
</details>

<details>
<summary><code>id</code> - Bot identifier</summary>

**Type:** String  
**Description:** Bot identifier. Empty if no bot detected.

**Possible Values (Search Engines):**
- `"GoogleBot"` - Google search crawler
- `"BingBot"` - Microsoft Bing search crawler
- `"YahooBot"` - Yahoo search crawler
- `"DuckDuckBot"` - DuckDuckGo search crawler
- `"BaiduBot"` - Baidu search crawler (China)
- `"YandexBot"` - Yandex search crawler (Russia)
- `"360Bot"` - 360 search crawler (China)
- `"SogouBot"` - Sogou search crawler (China)
- `"SeznamBot"` - Seznam search crawler (Czech Republic)

**Possible Values (Social Media):**
- `"FacebookBot"` - Facebook link preview crawler
- `"TwitterBot"` - Twitter/X link preview crawler
- `"LinkedInBot"` - LinkedIn link preview crawler
- `"PinterestBot"` - Pinterest crawler
- `"DiscordBot"` - Discord link preview bot
- `"TelegramBot"` - Telegram link preview bot
- `"WhatsAppBot"` - WhatsApp link preview bot

**Possible Values (AI/LLM):**
- `"OAI-SearchBot"` - OpenAI web search bot
- `"GPTBot"` - OpenAI GPT crawler
- `"ChatGPT-User"` - ChatGPT user-initiated request
- `"ClaudeBot"` - Anthropic Claude crawler
- `"PerplexityBot"` - Perplexity AI crawler
- `"Perplexity-User"` - Perplexity user-initiated request
- `"Google-Extended"` - Google AI/LLM crawler
- `"Applebot-Extended"` - Apple AI/LLM crawler

**Possible Values (SEO/Crawlers):**
- `"SemrushBot"` - Semrush SEO crawler
- `"AhrefsBot"` - Ahrefs SEO crawler
- `"MJ12Bot"` - Majestic SEO crawler
- `"DotBot"` - Moz/OpenSiteExplorer crawler
- `"RogerBot"` - Moz/RogerBot crawler
- `"PetalBot"` - Huawei Petal search crawler
- `"ExaBot"` - Exalead crawler
- `"ProximicBot"` - Comscore Proximic crawler

**Possible Values (Monitoring):**
- `"UptimeRobot"` - Uptime monitoring service
- `"PingdomBot"` - Pingdom monitoring service
- `"GTmetrixBot"` - GTmetrix performance monitoring
- `"Site24x7Bot"` - Site24x7 monitoring service
- `"NewRelicBot"` - New Relic monitoring service
- `"MonitisBot"` - Monitis monitoring service

**Possible Values (Other):**
- `"AppleBot"` - Apple web crawler
- `"AmazonBot"` - Amazon web crawler
- `"MSNBot"` - Microsoft MSN crawler (legacy)
- `"InternetArchiveBot"` - Internet Archive Wayback Machine crawler
- `"UnknownBot"` - Detected as bot but specific identity unknown
- `""` - No bot detected

**Example:**
```json
"id": "GoogleBot"
```
</details>

<details>
<summary><code>name</code> - Bot name</summary>

**Type:** String  
**Description:** Human-readable bot name. Empty if no bot detected.

**Examples:** `"Googlebot"`, `"Bingbot"`, `"ChatGPT"`

**Example:**
```json
"name": ""
```
</details>

<details>
<summary><code>type</code> - Bot type</summary>

**Type:** String  
**Description:** Bot type classification. Empty if no bot detected.

**Possible Values:**
- `"search_engine"` - Search engine crawler
- `"social"` - Social media crawler/link preview bot
- `"crawler"` - General web crawler (SEO, archival, etc.)
- `"monitoring"` - Monitoring/uptime check service
- `"ai"` - AI bot (generic, when specific type unknown)
- `"ai_crawler"` - AI model training/data collection crawler
- `"ai_user_initiated"` - AI assistant responding to user request
- `"ai_agent"` - Autonomous AI agent
- `""` - No bot detected

**Example:**
```json
"type": "search_engine"
```
</details>

<details>
<summary><code>url</code> - Bot documentation URL</summary>

**Type:** String  
**Description:** Link to bot documentation. Empty if no bot detected.

**Example:**
```json
"url": "https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers"
```
</details>

</details>

</details>

</details>