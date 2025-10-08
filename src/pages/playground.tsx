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

  const generateHTML = () => {
    const baseAttrs = [
      `class="frc-captcha"`,
      `data-sitekey="${settings.sitekey}"`,
    ];

    if (settings.startMode !== "focus") {
      baseAttrs.push(`data-start="${settings.startMode}"`);
    }

    if (settings.theme !== "auto") {
      baseAttrs.push(`data-theme="${settings.theme}"`);
    }

    if (settings.endpoint === "eu") {
      baseAttrs.push(`data-api-endpoint="eu"`);
    } else if (settings.endpoint === "custom" && settings.customEndpoint) {
      baseAttrs.push(`data-api-endpoint="${settings.customEndpoint}"`);
    }

    if (
      settings.formFieldName !==
      (settings.version === "v1"
        ? "frc-captcha-solution"
        : "frc-captcha-response")
    ) {
      const attrName =
        settings.version === "v1"
          ? "data-solution-field-name"
          : "data-form-field-name";
      baseAttrs.push(`${attrName}="${settings.formFieldName}"`);
    }

    if (settings.language !== "auto") {
      const attrName = settings.version === "v1" ? "data-lang" : "lang";
      baseAttrs.push(`${attrName}="${settings.language}"`);
    }

    return `<div ${baseAttrs.join(" ")}></div>`;
  };

  const generateScript = () => {
    if (settings.version === "v1") {
      return `<!-- v1 Scripts -->
<script type="module" src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.module.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.min.js" async defer></script>`;
    } else {
      return `<!-- v2 Scripts -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.31/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.31/site.compat.min.js" async defer></script>`;
    }
  };

  const generateEventHandlers = () => {
    if (settings.version === "v1") {
      return `// v1 Event handling
const widget = document.querySelector('.frc-captcha');

// Listen for completion
widget.addEventListener('frc:widget.complete', function(event) {
  console.log('Widget completed:', event.detail.response);
});

// Listen for errors
widget.addEventListener('frc:widget.error', function(event) {
  console.error('Widget error:', event.detail.error);
});

// Listen for expiration
widget.addEventListener('frc:widget.expire', function(event) {
  console.warn('Widget expired');
});`;
    } else {
      return `// v2 Event handling
const widget = document.querySelector('.frc-captcha');

// Listen for state changes
widget.addEventListener('frc:widget.statechange', function(event) {
  const detail = event.detail;
  console.log('Widget state changed to:', detail.state);
  
  if (detail.state === 'completed') {
    console.log('Widget completed:', detail.response);
  } else if (detail.state === 'error') {
    console.error('Widget error:', detail.error);
  } else if (detail.state === 'expired') {
    console.warn('Widget expired');
  }
});`;
    }
  };

  const generateCompleteExample = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Friendly Captcha Example</title>
    ${generateScript()}
</head>
<body>
    <form id="my-form">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        ${generateHTML()}
        
        <button type="submit" id="submit-btn" disabled>Submit</button>
    </form>

    <script>
        ${generateEventHandlers()}
        
        // Enable/disable submit button based on widget state
        const submitBtn = document.getElementById('submit-btn');
        const widget = document.querySelector('.frc-captcha');
        
        widget.addEventListener('frc:widget.statechange', function(event) {
            const detail = event.detail;
            if (detail.state === 'completed') {
                submitBtn.disabled = false;
            } else if (detail.state === 'error' || detail.state === 'expired') {
                submitBtn.disabled = false; // Allow retry
            } else {
                submitBtn.disabled = true;
            }
        });
        
        // Handle form submission
        document.getElementById('my-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const response = formData.get('${settings.formFieldName}');
            
            if (!response || response === '.ERROR' || response === '.EXPIRED') {
                alert('Please complete the captcha');
                return;
            }
            
            // Submit to your server
            fetch('/submit', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  console.log('Success:', data);
                  // Handle success
              })
              .catch(error => {
                  console.error('Error:', error);
                  // Handle error
              });
        });
    </script>
</body>
</html>`;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Friendly Captcha Playground
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore different settings and options for Friendly Captcha v1 and
            v2
          </p>
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

              {/* Show Events Toggle */}
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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

            {/* Code Generation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generated Code
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Script Tags
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(generateScript(), "Script tags")
                      }
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
                    <code>{generateScript()}</code>
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      HTML Widget
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(generateHTML(), "HTML widget")
                      }
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
                    <code>{generateHTML()}</code>
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Event Handlers
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          generateEventHandlers(),
                          "Event handlers"
                        )
                      }
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto">
                    <code>{generateEventHandlers()}</code>
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Complete Example
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          generateCompleteExample(),
                          "Complete example"
                        )
                      }
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto max-h-96">
                    <code>{generateCompleteExample()}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Events Monitor */}
            {settings.showEvents && (
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
  );
}
