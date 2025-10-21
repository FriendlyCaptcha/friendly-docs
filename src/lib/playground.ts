export type PlaygroundUseCase = "contact" | "signup" | "download";

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

  simulateFalsePositive: boolean;
}

export interface WidgetEvent {
  timestamp: string;
  event: string;
  state?: string;
  response?: string;
  error?: any;
  data?: any;
}

const defaultSettings: PlaygroundSettings = {
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

  simulateFalsePositive: false,
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

export function verifyCaptchaResponse(
  settings: PlaygroundSettings,
  response: string
) {
  // TODO: Either call real API or mock the response
  // Real API would require some kind of backend to proxy the request to the siteverify endpoint
  return {
    success: true,
  };
}
