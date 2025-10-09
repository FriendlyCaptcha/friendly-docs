import {
  PlaygroundSettings,
  setExpertModeInQueryString,
} from "@site/src/lib/playground";
import React from "react";

export default function PlaygroundModeSwitch({
  settings,
  setSettings,
}: {
  settings: PlaygroundSettings;
  setSettings: (settings: PlaygroundSettings) => void;
}) {
  return (
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
        onClick={() => {
          const newExpertMode = !settings.expertMode;
          setSettings({
            ...settings,
            expertMode: newExpertMode,
          });
          setExpertModeInQueryString(newExpertMode);
        }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          settings.expertMode ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
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
  );
}
