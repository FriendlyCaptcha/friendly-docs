import React, { useState, useEffect, useRef } from "react";
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";
import { WidgetInstance } from "friendly-challenge";

// Create SDK instance at module level
const friendlyCaptchaSDK = new FriendlyCaptchaSDK();

interface PlaygroundSettings {
  version: "v1" | "v2";
  widgetMode: "one-click" | "zero-click" | "smart";
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
    widgetMode: "smart",
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
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<WidgetInstance | any>(null);

  // Get sitekey based on widget mode and version
  const getSitekey = () => {
    if (settings.version === "v1") {
      // v1 doesn't have widget modes, use a default sitekey
      return "FCMTROQPGU36Q253";
    }

    // v2 has widget modes
    const v2Sitekeys = {
      "one-click": "FCMTROQPGSDQVODI",
      "zero-click": "FCMTROQPGUDDHU39",
      smart: "FCMTROQPGU36Q253",
    };
    return v2Sitekeys[settings.widgetMode];
  };

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

  const destroyWidgetInstance = () => {
    if (widgetInstanceRef.current) {
      try {
        // Clean up event listeners for v2
        if (widgetInstanceRef.current._cleanup) {
          widgetInstanceRef.current._cleanup();
        }

        widgetInstanceRef.current.destroy();
      } catch (error) {
        console.warn("Error destroying widget:", error);
      }
      widgetInstanceRef.current = null;
    }
  };

  const createWidgetInstance = () => {
    if (!widgetRef.current || isCreating) return;

    setIsCreating(true);

    // Destroy existing widget instance
    destroyWidgetInstance();

    // Clear the widget container
    widgetRef.current.innerHTML = "";
    setWidgetState("init");

    // Add a small delay to ensure cleanup is complete
    setTimeout(() => {
      if (!widgetRef.current) {
        setIsCreating(false);
        return;
      }

      try {
        if (settings.version === "v1") {
          // Create v1 widget using friendly-challenge
          const options = {
            sitekey: getSitekey(),
            startMode: settings.startMode,
            language:
              settings.language !== "auto"
                ? (settings.language as any)
                : undefined,
            solutionFieldName: settings.formFieldName,
            puzzleEndpoint:
              settings.endpoint === "eu"
                ? "https://eu-api.friendlycaptcha.eu/api/v1/puzzle"
                : settings.endpoint === "custom"
                ? settings.customEndpoint
                : "https://api.friendlycaptcha.com/api/v1/puzzle",
            doneCallback: (solution: string) => {
              addEvent("frc:widget.complete", {
                state: "completed",
                response: solution,
              });
            },
            errorCallback: (error: any) => {
              addEvent("frc:widget.error", { state: "error", error });
            },
            readyCallback: () => {
              addEvent("frc:widget.statechange", { state: "ready" });
            },
            startedCallback: () => {
              addEvent("frc:widget.statechange", { state: "started" });
            },
          };

          widgetInstanceRef.current = new WidgetInstance(
            widgetRef.current,
            options
          );
        } else {
          // Create v2 widget using @friendlycaptcha/sdk
          const options = {
            element: widgetRef.current,
            sitekey: getSitekey(),
            startMode: settings.startMode,
            theme: settings.theme,
            language:
              settings.language !== "auto" ? settings.language : undefined,
            formFieldName: settings.formFieldName,
            apiEndpoint:
              settings.endpoint === "eu"
                ? "eu"
                : settings.endpoint === "custom"
                ? settings.customEndpoint
                : undefined,
          };

          widgetInstanceRef.current = friendlyCaptchaSDK.createWidget(options);

          // Add event listeners for v2
          if (widgetRef.current) {
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
            widget.addEventListener(
              "frc:widget.statechange",
              handleStateChange
            );
            widget.addEventListener("frc:widget.complete", handleComplete);
            widget.addEventListener("frc:widget.error", handleError);
            widget.addEventListener("frc:widget.expire", handleExpire);

            // Store cleanup function
            widgetInstanceRef.current._cleanup = () => {
              widget.removeEventListener(
                "frc:widget.statechange",
                handleStateChange
              );
              widget.removeEventListener("frc:widget.complete", handleComplete);
              widget.removeEventListener("frc:widget.error", handleError);
              widget.removeEventListener("frc:widget.expire", handleExpire);
            };
          }
        }
      } catch (error) {
        console.error("Failed to create widget:", error);
        addEvent("frc:widget.error", { state: "error", error });
      } finally {
        setIsCreating(false);
      }
    }, 100);
  };

  const recreateWidget = () => {
    createWidgetInstance();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    // Check if widget is completed
    const captchaInput = widgetRef.current?.querySelector(
      'input[name*="captcha"]'
    ) as HTMLInputElement;
    const widgetResponse = captchaInput?.value;

    if (widgetResponse) {
      addEvent("form:submit", {
        state: "form_submitted",
        formData: data,
        captchaResponse: widgetResponse,
      });
      alert(
        "Form submitted successfully! Check the event log to see the captcha response."
      );
    } else {
      addEvent("form:submit", {
        state: "form_submit_failed",
        error: "Captcha not completed",
      });
      alert("Please complete the captcha before submitting the form.");
    }
  };

  // Create widget when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      createWidgetInstance();
    }, 100);

    return () => {
      clearTimeout(timer);
      destroyWidgetInstance();
    };
  }, []);

  // Recreate widget when settings change
  useEffect(() => {
    const timer = setTimeout(() => {
      createWidgetInstance();
    }, 100);

    return () => {
      clearTimeout(timer);
      destroyWidgetInstance();
    };
  }, [
    settings.version,
    settings.widgetMode,
    settings.startMode,
    settings.theme,
    settings.endpoint,
    settings.customEndpoint,
    settings.formFieldName,
    settings.language,
  ]);

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
                  {settings.version === "v2" && (
                    <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-800 rounded text-xs">
                      <strong>Widget Mode:</strong>{" "}
                      {settings.widgetMode === "one-click"
                        ? "One-click - User must click once to complete"
                        : settings.widgetMode === "zero-click"
                        ? "Zero-click - Completes automatically"
                        : "Smart - Intelligently decides when click is needed"}
                    </div>
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

                {/* Widget Mode - Only for v2 */}
                {settings.version === "v2" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Widget Mode
                    </label>
                    <select
                      value={settings.widgetMode}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          widgetMode: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="one-click">
                        One-click - User must click once
                      </option>
                      <option value="zero-click">
                        Zero-click - Automatic completion
                      </option>
                      <option value="smart">
                        Smart - Intelligent decision (default)
                      </option>
                    </select>
                  </div>
                )}

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
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Tip:</strong> Click on the input field below to
                    trigger the captcha widget. The widget will activate based
                    on your "Start Mode" setting ({settings.startMode}).
                  </p>
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 min-h-[200px]">
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <input
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Click here to trigger the captcha widget"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div
                        key={`widget-${settings.version}`}
                        ref={widgetRef}
                        className="frc-captcha"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        Submit Form
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Current State:</strong>{" "}
                    <span className="font-mono">{widgetState}</span>
                  </div>
                  <button
                    onClick={recreateWidget}
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
