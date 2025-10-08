import React, { useState, useEffect, useRef } from "react";

interface PlaygroundSettings {
  version: "v1" | "v2";
  sitekey: string;
  startMode: "auto" | "focus" | "none";
  theme: "light" | "dark" | "auto";
  endpoint: "global" | "eu" | "custom";
  customEndpoint: string;
  formFieldName: string;
  language: string;
  showEvents: boolean;
  expertMode: boolean;
}

interface WidgetEvent {
  timestamp: string;
  event: string;
  state?: string;
  response?: string;
  error?: any;
}

export default function Playground() {
  const [settings, setSettings] = useState<PlaygroundSettings>({
    version: "v2",
    sitekey: "FCM1234567890ABCDEF",
    startMode: "focus",
    theme: "auto",
    endpoint: "global",
    customEndpoint: "",
    formFieldName: "frc-captcha-response",
    language: "auto",
    showEvents: true,
    expertMode: false,
  });

  const [events, setEvents] = useState<WidgetEvent[]>([]);
  const [widgetState, setWidgetState] = useState<string>("init");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<any>(null);

  // Update form field name when version changes
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      formFieldName:
        prev.version === "v1" ? "frc-captcha-solution" : "frc-captcha-response",
    }));
  }, [settings.version]);

  const addEvent = (eventName: string, detail: any) => {
    const newEvent: WidgetEvent = {
      timestamp: new Date().toLocaleTimeString(),
      event: eventName,
      state: detail.state,
      response: detail.response,
      error: detail.error,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 19)]); // Keep last 20 events
    setWidgetState(detail.state || "unknown");
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  // Load the appropriate SDK based on version
  useEffect(() => {
    const loadSDK = () => {
      // Remove existing scripts
      const existingScripts = document.querySelectorAll(
        'script[src*="friendly-challenge"], script[src*="@friendlycaptcha/sdk"]'
      );
      existingScripts.forEach((script) => script.remove());

      // Load new scripts based on version
      if (settings.version === "v1") {
        const moduleScript = document.createElement("script");
        moduleScript.type = "module";
        moduleScript.src =
          "https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.module.min.js";
        moduleScript.async = true;
        moduleScript.defer = true;
        document.head.appendChild(moduleScript);

        const compatScript = document.createElement("script");
        compatScript.setAttribute("nomodule", "");
        compatScript.src =
          "https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.min.js";
        compatScript.async = true;
        compatScript.defer = true;
        document.head.appendChild(compatScript);
      } else {
        const moduleScript = document.createElement("script");
        moduleScript.type = "module";
        moduleScript.src =
          "https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.31/site.min.js";
        moduleScript.async = true;
        moduleScript.defer = true;
        document.head.appendChild(moduleScript);

        const compatScript = document.createElement("script");
        compatScript.setAttribute("nomodule", "");
        compatScript.src =
          "https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.31/site.compat.min.js";
        compatScript.async = true;
        compatScript.defer = true;
        document.head.appendChild(compatScript);
      }
    };

    loadSDK();
  }, [settings.version]);

  // Set up event listeners when widget is ready
  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = widgetRef.current;

    const handleStateChange = (event: any) => {
      addEvent("frc:widget.statechange", event.detail);
    };

    const handleComplete = (event: any) => {
      addEvent("frc:widget.complete", event.detail);
    };

    const handleError = (event: any) => {
      addEvent("frc:widget.error", event.detail);
    };

    const handleExpire = (event: any) => {
      addEvent("frc:widget.expire", event.detail);
    };

    // Add event listeners
    widget.addEventListener("frc:widget.statechange", handleStateChange);
    widget.addEventListener("frc:widget.complete", handleComplete);
    widget.addEventListener("frc:widget.error", handleError);
    widget.addEventListener("frc:widget.expire", handleExpire);

    return () => {
      widget.removeEventListener("frc:widget.statechange", handleStateChange);
      widget.removeEventListener("frc:widget.complete", handleComplete);
      widget.removeEventListener("frc:widget.error", handleError);
      widget.removeEventListener("frc:widget.expire", handleExpire);
    };
  }, [settings]);

  return (
    <div id="tw-scope">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Friendly Captcha Playground
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Explore different settings and options for Friendly Captcha v1
                  and v2
                </p>
              </div>

              {/* Mode Switch */}
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm font-medium ${
                    !settings.expertMode
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Beginner
                </span>
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      expertMode: !prev.expertMode,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.expertMode
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.expertMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    settings.expertMode
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Expert
                </span>
              </div>
            </div>
          </div>

          {/* Version Info Banner */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {settings.version === "v1"
                    ? "Friendly Captcha v1"
                    : "Friendly Captcha v2"}
                </h3>
                <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  {settings.version === "v1" ? (
                    <p>
                      Legacy version with basic features. Uses{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        data-lang
                      </code>
                      ,{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        data-solution-field-name
                      </code>
                      , and{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        data-puzzle-endpoint
                      </code>{" "}
                      attributes.
                    </p>
                  ) : (
                    <p>
                      Latest version with improved protection and UX. Uses{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        lang
                      </code>
                      ,{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        data-form-field-name
                      </code>
                      , and{" "}
                      <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
                        data-api-endpoint
                      </code>{" "}
                      attributes. Auto-detects language and has enhanced event
                      handling.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Configuration
                </h2>

                {/* Version Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Version
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, version: "v1" }))
                      }
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        settings.version === "v1"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      v1
                    </button>
                    <button
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, version: "v2" }))
                      }
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        settings.version === "v2"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      v2
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {settings.version === "v1"
                      ? "Legacy version with basic features"
                      : "Latest version with improved protection and UX"}
                  </p>
                </div>

                {/* Sitekey */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sitekey
                  </label>
                  <input
                    type="text"
                    value={settings.sitekey}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        sitekey: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your sitekey"
                  />
                </div>

                {/* Start Mode */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Mode
                  </label>
                  <select
                    value={settings.startMode}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        startMode: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">Auto - Start immediately</option>
                    <option value="focus">Focus - Start on form focus</option>
                    <option value="none">None - Manual start only</option>
                  </select>
                </div>

                {/* Theme */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        theme: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">Auto - Match system preference</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                {/* Endpoint */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Endpoint
                  </label>
                  <select
                    value={settings.endpoint}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        endpoint: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="global">Global</option>
                    <option value="eu">EU Only</option>
                    <option value="custom">Custom</option>
                  </select>
                  {settings.endpoint === "custom" && (
                    <input
                      type="text"
                      value={settings.customEndpoint}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          customEndpoint: e.target.value,
                        }))
                      }
                      className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter custom endpoint URL"
                    />
                  )}
                </div>

                {/* Form Field Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Form Field Name
                  </label>
                  <input
                    type="text"
                    value={settings.formFieldName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        formFieldName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="frc-captcha-response"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Default:{" "}
                    {settings.version === "v1"
                      ? "frc-captcha-solution"
                      : "frc-captcha-response"}
                  </p>
                </div>

                {/* Language */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="pt">Portuguese</option>
                    <option value="ja">Japanese</option>
                    <option value="zh">Chinese</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {settings.version === "v2"
                      ? "Auto-detection recommended"
                      : "Manual language selection"}
                  </p>
                </div>

                {/* Show Events Toggle - Only in Expert Mode */}
                {settings.expertMode && (
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.showEvents}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            showEvents: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Show Events
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Beginner Mode Info */}
              {!settings.expertMode && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Beginner Mode
                      </h3>
                      <div className="mt-1 text-sm text-green-700 dark:text-green-300">
                        <p>
                          You're in beginner mode! This simplified view focuses
                          on the essential settings. Switch to{" "}
                          <strong>Expert Mode</strong> to access advanced
                          features like event monitoring and detailed debugging
                          tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Widget Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Widget Preview
                </h2>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <div
                    ref={widgetRef}
                    className="frc-captcha"
                    data-sitekey={settings.sitekey}
                    data-start={settings.startMode}
                    data-theme={settings.theme}
                    {...(settings.version === "v1"
                      ? {
                          "data-puzzle-endpoint":
                            settings.endpoint === "eu"
                              ? "https://eu-api.friendlycaptcha.eu/api/v1/puzzle"
                              : settings.endpoint === "custom"
                              ? settings.customEndpoint
                              : undefined,
                          "data-solution-field-name": settings.formFieldName,
                          "data-lang":
                            settings.language !== "auto"
                              ? settings.language
                              : undefined,
                        }
                      : {
                          "data-api-endpoint":
                            settings.endpoint === "eu"
                              ? "eu"
                              : settings.endpoint === "custom"
                              ? settings.customEndpoint
                              : undefined,
                          "data-form-field-name": settings.formFieldName,
                          lang:
                            settings.language !== "auto"
                              ? settings.language
                              : undefined,
                        })}
                  />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Current State:</strong>{" "}
                    <span className="font-mono">{widgetState}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (widgetRef.current) {
                        // Reset the widget by removing and re-adding it
                        const widget = widgetRef.current;
                        const parent = widget.parentNode;
                        const newWidget = widget.cloneNode(
                          true
                        ) as HTMLDivElement;
                        parent?.replaceChild(newWidget, widget);
                        widgetRef.current = newWidget;
                        setWidgetState("init");
                      }
                    }}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset Widget
                  </button>
                </div>
              </div>

              {/* Events Monitor */}
              {settings.expertMode && settings.showEvents && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Events Monitor
                    </h2>
                    <button
                      onClick={clearEvents}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 max-h-64 overflow-y-auto">
                    {events.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No events yet. Interact with the widget to see events.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {events.map((event, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                                {event.timestamp}
                              </span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {event.event}
                              </span>
                              {event.state && (
                                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  {event.state}
                                </span>
                              )}
                            </div>
                            {event.response && (
                              <div className="ml-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                                Response: {event.response.substring(0, 50)}...
                              </div>
                            )}
                            {event.error && (
                              <div className="ml-4 text-red-600 dark:text-red-400 text-xs">
                                Error: {JSON.stringify(event.error)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
