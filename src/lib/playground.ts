import type { RiskIntelligenceRetrieveResponseData } from "@friendlycaptcha/server-sdk";

export type RiskIntelligenceData =
  RiskIntelligenceRetrieveResponseData["risk_intelligence"];

export type PlaygroundUseCase = "contact" | "signup" | "checkout" | "download";

export interface PlaygroundSettings {
  version: "v1" | "v2";
  widgetMode: "one-click" | "zero-click" | "smart";
  startMode: "auto" | "focus" | "none";
  theme: "light" | "dark" | "auto";
  endpoint: "global" | "eu" | "custom";
  customEndpoint: string;
  language: string;
  showEvents: boolean;
  expertMode: boolean;
  useCase: PlaygroundUseCase;

  simulateHighRisk: boolean;
}

export interface WidgetEvent {
  timestamp: string;
  event: string;
  state?: string;
  response?: string;
  error?: any;
  data?: any;
}

export const defaultSettings: PlaygroundSettings = {
  version: "v2",
  widgetMode: "smart",
  startMode: "focus",
  theme: "auto",
  endpoint: "global",
  customEndpoint: "",
  language: "auto",
  showEvents: true,
  expertMode: false,
  useCase: "contact",

  simulateHighRisk: false,
};

export function saveSettingsToQueryString(settings: PlaygroundSettings): void {
  if (typeof window === "undefined") return;

  // Only save the differences from default settings
  const diff: Partial<PlaygroundSettings> = {};
  for (const key in settings) {
    if (settings[key] !== defaultSettings[key]) {
      (diff as any)[key] = settings[key];
    }
  }

  const url = new URL(window.location.href);

  // If there are no differences, remove the settings parameter
  if (Object.keys(diff).length === 0) {
    url.searchParams.delete("settings");
  } else {
    const rawSettings = btoa(JSON.stringify(diff));
    url.searchParams.set("settings", rawSettings);
  }

  window.history.replaceState({}, "", url.toString());
}

export function getSettingsFromQueryString(): PlaygroundSettings {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const rawSettings = urlParams.get("settings");
  if (!rawSettings) {
    return defaultSettings;
  }

  try {
    const diff = JSON.parse(atob(rawSettings));
    return { ...defaultSettings, ...diff };
  } catch (error) {
    // If parsing fails, return default settings
    console.warn("Failed to parse settings from query string:", error);
    return defaultSettings;
  }
}

const mockRiskIntelligenceLowRisk = {
  risk_scores: {
    overall: 1,
    network: 1,
    browser: 1,
  },
  network: {
    ip: "203.0.113.42",
    as: {
      number: 15169,
      name: "GOOGLE",
      company: "Google LLC",
      description: "Google LLC",
      domain: "google.com",
      country: "US",
      rir: "ARIN",
      route: "203.0.113.0/24",
      type: "isp",
    },
    geolocation: {
      country: {
        iso2: "NL",
        iso3: "NLD",
        name: "Netherlands",
        name_native: "Nederland",
        region: "Europe",
        subregion: "Western Europe",
        currency: "EUR",
        currency_name: "Euro",
        phone_code: "+31",
        capital: "Amsterdam",
      },
      city: "Amsterdam",
      state: "North Holland",
    },
    anonymization: {
      vpn_score: 0,
      proxy_score: 0,
      tor: false,
      icloud_private_relay: false,
    },
    abuse_contact: null,
  },
  client: {
    header_user_agent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    time_zone: {
      name: "Europe/Amsterdam",
      country_iso2: "NL",
    },
    browser: {
      id: "chrome",
      name: "Chrome",
      version: "131.0.0.0",
      release_date: "2024-11-12",
    },
    browser_engine: {
      id: "blink",
      name: "Blink",
      version: "131.0.0.0",
    },
    device: {
      type: "desktop",
      brand: null,
      model: null,
    },
    os: {
      id: "windows",
      name: "Windows",
      version: "10",
    },
    tls_signature: {
      ja3: "771,4865-4866-4867-49195,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513,29-23-24,0",
      ja3n: "a1b2c3d4e5f6",
      ja4: "t13d1516h2_8daaf6152771_b0da82dd1658",
    },
    automation: {
      automation_tool: {
        detected: false,
        id: "",
        name: "",
        type: "",
      },
      known_bot: {
        detected: false,
        id: "",
        name: "",
        type: "",
        url: "",
      },
    },
  },
} satisfies RiskIntelligenceData;

const mockRiskIntelligenceHighRisk = {
  risk_scores: {
    overall: 5,
    network: 4,
    browser: 5,
  },
  network: {
    ip: "198.51.100.77",
    as: {
      number: 62904,
      name: "EONIX",
      company: "Eonix Corporation",
      description: "Eonix Corporation",
      domain: "eonix.net",
      country: "US",
      rir: "ARIN",
      route: "198.51.100.0/24",
      type: "hosting",
    },
    geolocation: {
      country: {
        iso2: "US",
        iso3: "USA",
        name: "United States",
        name_native: "United States",
        region: "Americas",
        subregion: "Northern America",
        currency: "USD",
        currency_name: "US Dollar",
        phone_code: "+1",
        capital: "Washington D.C.",
      },
      city: "Ashburn",
      state: "Virginia",
    },
    anonymization: {
      vpn_score: 4,
      proxy_score: 3,
      tor: false,
      icloud_private_relay: false,
    },
    abuse_contact: null,
  },
  client: {
    header_user_agent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36",
    time_zone: {
      name: "America/New_York",
      country_iso2: "US",
    },
    browser: {
      id: "chrome",
      name: "Chrome Headless",
      version: "120.0.0.0",
      release_date: "2023-12-06",
    },
    browser_engine: {
      id: "blink",
      name: "Blink",
      version: "120.0.0.0",
    },
    device: {
      type: "desktop",
      brand: null,
      model: null,
    },
    os: {
      id: "linux",
      name: "Linux",
      version: "",
    },
    tls_signature: {
      ja3: "771,4865-4866-4867-49195,0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513,29-23-24,0",
      ja3n: "f7e8d9c0b1a2",
      ja4: "t13d1516h2_e5a3f8b21c94_dc4b7e39a021",
    },
    automation: {
      automation_tool: {
        detected: true,
        id: "headless_chrome",
        name: "Headless Chrome",
        type: "browser_automation",
      },
      known_bot: {
        detected: false,
        id: "",
        name: "",
        type: "",
        url: "",
      },
    },
  },
} satisfies RiskIntelligenceData;

export function verifyCaptchaResponse(
  settings: PlaygroundSettings,
  response: string
) {
  return {
    success: true,
    riskIntelligence: settings.simulateHighRisk
      ? mockRiskIntelligenceHighRisk
      : mockRiskIntelligenceLowRisk,
  };
}
