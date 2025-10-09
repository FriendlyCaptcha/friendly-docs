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
}

export interface WidgetEvent {
  timestamp: string;
  event: string;
  state?: string;
  response?: string;
  error?: any;
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
};

export function saveSettingsToQueryString(settings: PlaygroundSettings): void {
  if (typeof window === "undefined") return;

  const rawSettings = btoa(JSON.stringify(settings));

  const url = new URL(window.location.href);
  url.searchParams.set("settings", rawSettings);
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

  const settings = JSON.parse(atob(rawSettings));
  return { ...defaultSettings, ...settings };
}
