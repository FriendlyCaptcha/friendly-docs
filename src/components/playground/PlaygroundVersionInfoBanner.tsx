import { PlaygroundSettings } from "@site/src/lib/playground";
import React from "react";

export default function PlaygroundVersionInfoBanner({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  return (
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
  );
}
