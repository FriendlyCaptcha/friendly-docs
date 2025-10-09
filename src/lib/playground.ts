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

// Query string utilities for playground settings
export function getExpertModeFromQueryString(): boolean {
  if (typeof window === "undefined") return false;

  const urlParams = new URLSearchParams(window.location.search);
  const expertMode = urlParams.get("expert");
  return expertMode === "true";
}

export function setExpertModeInQueryString(expertMode: boolean): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (expertMode) {
    url.searchParams.set("expert", "true");
  } else {
    url.searchParams.delete("expert");
  }

  // Update the URL without causing a page reload
  window.history.replaceState({}, "", url.toString());
}
