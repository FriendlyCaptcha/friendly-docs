import { PlaygroundSettings } from "@site/src/lib/playground";
import { WidgetInstance } from "friendly-challenge";
import React, { useEffect, useRef, useState } from "react";
import PlaygroundForm from "./PlaygroundForm";
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";

const friendlyCaptchaSDK = new FriendlyCaptchaSDK({
  disableEvalPatching: true,
});

export default function PlaygroundWidgetPreview({
  settings,
  addEvent,
}: {
  settings: PlaygroundSettings;
  addEvent: (eventName: string, detail: any) => void;
}) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<WidgetInstance | any>(null);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [widgetState, setWidgetState] = useState<string>("none");

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
              setWidgetState("error");
            },
            readyCallback: () => {
              addEvent("frc:widget.statechange", { state: "ready" });
              setWidgetState("ready");
            },
            startedCallback: () => {
              addEvent("frc:widget.statechange", { state: "started" });
              setWidgetState("started");
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
              setWidgetState(event.detail.state);
            };

            const handleComplete = (event: any) => {
              addEvent("frc:widget.complete", event.detail);
              setWidgetState("completed");
            };

            const handleError = (event: any) => {
              addEvent("frc:widget.error", event.detail);
              setWidgetState("error");
            };

            const handleExpire = (event: any) => {
              addEvent("frc:widget.expire", event.detail);
              setWidgetState("expired");
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

      // Show different success messages based on use case
      const successMessages = {
        contact: "Message sent successfully! We'll get back to you soon.",
        signup: "Account created successfully! Welcome aboard!",
        download: "Download started! Check your downloads folder.",
      };
      alert(successMessages[settings.useCase]);
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
    settings.language,
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Widget Preview
      </h2>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Fill out the form fields below to test the
          captcha widget. The widget will activate based on your "Start Mode"
          setting ({settings.startMode}).
          {settings.useCase === "contact" &&
            " Try focusing on any field to trigger the captcha."}
          {settings.useCase === "signup" &&
            " The captcha will activate when you start filling the form."}
          {settings.useCase === "download" &&
            " Complete the form to download the file."}
        </p>
      </div>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 min-h-[200px]">
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <PlaygroundForm settings={settings} />

          <div className="flex flex-col md:flex-row justify-between gap-5 items-start">
            <div
              key={`widget-${settings.version}`}
              ref={widgetRef}
              className="frc-captcha"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {settings.useCase === "contact" && "Send Message"}
              {settings.useCase === "signup" && "Create Account"}
              {settings.useCase === "download" && "Download File"}
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
  );
}
