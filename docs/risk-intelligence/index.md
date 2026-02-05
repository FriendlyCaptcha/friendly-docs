# Risk Intelligence

*Risk Intelligence* helps make decisions about the trustworthiness of users interacting with your services.

Friendly Captcha provides Risk Intelligence data as part of its API responses. This data includes various risk scores and signals that can help you assess the likelihood of fraudulent or malicious activity.

You can store and use this data to enhance your (existing) security systems, such as implementing risk-based authentication or fraud detection systems. For example, you may want to flag users with high risk scores for additional verification steps.

## How do I get Risk Intelligence data?
Risk Intelligence is a paid add-on feature that is available on **Friendly Captcha Advanced** and **Enterprise** plans.

When enabled, the Risk Intelligence data will be included in the `risk_intelligence` field of the response from the [siteverify API](../api/siteverify.md).

## Why is Risk Intelligence useful?
We wrote up example use cases for Risk Intelligence data in the [**Use Cases**](./use-cases.md) document.

## Modular
We offer Risk Intelligence as a modular add-on, allowing you to choose the specific data points that are most relevant to your use case.

There are 5 modules available:
* **Risk Scores**: Combined risk scores that summarize the risk in different categories such as browser risk and network risk.
* **IP Intelligence**: Information about the IP address of the user, such as geolocation and the ASN and the ASN type such as residential vs datacenter.
* **Anonymization Detection**: Signals that indicate whether the user is using anonymization or masking services like VPNs or proxies. *This module will be launched in Q2 2026.*
* **Browser Identification**: Signals that help identify the browser and device being used by the user.
* **Bot Detection**: Information about what kind of automation or bot was detected.

## Risk Intelligence data format
The Risk Intelligence data is returned as a JSON object in the `risk_intelligence` field of the siteverify response. Below is an example of what the data might look like:

```json
{
  // Risk scores summarizing the assessment into scores per category (1-5)
  // Available when the Risk Scores module is enabled, null otherwise
  risk_scores: {
    overall: 2,      // Overall risk score combining all factors
    network: 2,      // Network-related risk based on IP, ASN, reputation, geolocation
    browser: 1       // Browser-related risk based on user agent, automation traces, consistency
  },

  network: {
    ip: "88.64.123.45",  // IP address of the request, note this plain IP is *never* stored on our servers

    // Autonomous System information (available when IP Intelligence module is enabled)
    as: {
      asn: 3209,                       // Autonomous System Number
      name: "VODANET",                 // AS name/handle
      company: "Vodafone GmbH",        // Organization name that owns the ASN
      description: "Provides mobile and fixed broadband and telecommunication services to consumers and businesses.",
      domain: "vodafone.de",           // Domain associated with the ASN
      country: "DE",                   // Two-letter country code where ASN is registered
      rir: "RIPE",                     // Regional Internet Registry that allocated the ASN
      route: "88.64.0.0/12",           // IP route in CIDR notation
      type: "isp"                      // AS type (isp, hosting, mobile, etc.)
    },

    // Geographic location of the IP (available when IP Intelligence module is enabled)
    geolocation: {
      country: {
        iso2: "DE",                    // Two-letter ISO 3166-1 alpha-2 code
        iso3: "DEU",                   // Three-letter ISO 3166-1 alpha-3 code
        name: "Germany",               // Country name in English
        name_native: "Deutschland",    // Country name in native language
        region: "Europe",              // Major world region
        subregion: "Western Europe",   // More specific world region
        currency: "EUR",               // ISO 4217 currency code
        currency_name: "Euro",         // Full name of the currency
        phone_code: "49",              // International dialing code
        capital: "Berlin"              // Capital city
      },
      city: "Eschborn",                // City name (empty string if unknown)
      state: "Hessen"                  // State/region/province (empty string if unknown)
    },

    // Abuse contact information (available when IP Intelligence module is enabled)
    abuse_contact: {
      address: "Vodafone GmbH, Campus Eschborn, Duesseldorfer Strasse 15, D-65760 Eschborn, Germany",  // Postal address
      name: "Vodafone Germany IP Core Backbone",  // Abuse contact name
      email: "abuse.de@vodafone.com",  // Abuse contact email
      phone: "+49 6196 52352105"       // Abuse contact phone
    },

    // IP anonymization detection (available when Anonymization Detection module is enabled)
    anonymization: {
      vpn_score: 2,                    // VPN likelihood score (1-5)
      proxy_score: 1,                  // Proxy likelihood score (1-5)
      tor: false,                      // Tor exit node detected
      icloud_private_relay: false      // iCloud Private Relay detected
    }
  },

  client: {
    // User-Agent HTTP header sent by the browser
    header_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0",

    // Time zone from the browser (available when Browser Identification module is enabled)
    time_zone: {
      name: "Europe/Berlin",           // IANA time zone identifier
      country_iso2: "DE"               // Country derived from time zone
    },

    // Detected browser information (available when Browser Identification module is enabled)
    browser: {
      id: "firefox",                   // Browser identifier
      name: "Firefox",                 // Human-readable browser name
      version: "146.0",                // Browser version
      release_date: "2026-01-28"       // Release date of this version (YYYY-MM-DD)
    },

    // Browser rendering engine (available when Browser Identification module is enabled)
    browser_engine: {
      id: "gecko",                     // Engine identifier
      name: "Gecko",                   // Human-readable engine name
      version: "146.0"                 // Engine version
    },

    // Device information (available when Browser Identification module is enabled)
    device: {
      type: "desktop",                 // Device type (desktop, mobile, tablet, etc.)
      brand: "",                       // Device manufacturer brand (empty for desktop)
      model: ""                        // Device model name (empty for desktop)
    },

    // Operating system information (available when Browser Identification module is enabled)
    os: {
      id: "windows",                   // OS identifier
      name: "Windows",                 // Human-readable OS name
      version: "10"                    // OS version
    },

    // TLS/SSL signatures (available when Bot Detection module is enabled)
    tls_signature: {
      ja3: "d87a30a5782a73a83c1544bb06332780",             // JA3 hash
      ja3n: "28ecc2d2875b345cecbb632b12d8c1e0",            // JA3N hash (normalized)
      ja4: "t13d1516h2_8daaf6152771_02713d6af862"          // JA4 signature
    },

    // Automation and bot detection (available when Bot Detection module is enabled)
    automation: {
      // Automation tool detection
      automation_tool: {
        detected: false,               // Whether automation tool was detected
        id: "",                        // Tool identifier (puppeteer, selenium, etc.)
        name: "",                      // Human-readable tool name
        type: ""                       // Tool type (webdriver, cdp, etc.)
      },

      // Known bot/crawler detection (good bots with public documentation)
      known_bot: {
        detected: false,               // Whether a known bot was detected
        id: "",                        // Bot identifier (googlebot, bingbot, etc.)
        name: "",                      // Human-readable bot name
        type: "",                      // Bot type (search, monitor, social, etc.)
        url: ""                        // URL to bot documentation
      }
    }
  }
}
```

## Next steps
You can enable Risk Intelligence on your account by contacting our support team. If you want to learn more about how to use the Risk Intelligence data, check out the [**Use Cases**](./use-cases.md) document where we provide example implementations and ideas for how to use this data to enhance your security.
