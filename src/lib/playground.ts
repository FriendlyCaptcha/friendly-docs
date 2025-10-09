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
