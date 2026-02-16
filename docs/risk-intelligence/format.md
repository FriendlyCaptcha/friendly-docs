# Format

Risk Intelligence data is returned in a structured JSON format that includes various risk signals and scores. The exact structure of the data may vary depending on which modules you have enabled on your account (as of writing, all modules are included by default).

:::info
The structure of the Risk Intelligence data is subject to change. We always aim for backwards compatibility, but your validation and parsing logic should be flexible enough to handle new fields being added in the future.
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
