import { PlaygroundSettings } from "@site/src/lib/playground";
import React from "react";

const v2SettingCombinations = {
  smart_auto:
    "The widget will start solving puzzles in the background immediately and will decide intelligently whether to require a click to complete the captcha.",
  smart_focus:
    "The widget will start solving puzzles in the background when the form is focused and will decide intelligently whether to require a click to complete the captcha.",
  smart_none:
    "The widget will not solve puzzles in the background and will decide intelligently whether to require a click to complete the captcha.",
  "one-click_auto":
    "The widget will start solving puzzles in the background immediately and will require a click to complete the captcha.",
  "one-click_focus":
    "The widget will start solving puzzles in the background when the form is focused and will require a click to complete the captcha.",
  "one-click_none":
    "The widget will not solve puzzles in the background and will require a click to complete the captcha.",
  "zero-click_auto":
    "The widget will start solving puzzles in the background immediately and will complete the captcha without requiring a click.",
  "zero-click_focus":
    "The widget will start solving puzzles in the background when the form is focused and will complete the captcha without requiring a click.",
  "zero-click_none":
    "The widget will start solving puzzles in the background when the form is submitted and will complete the captcha without requiring a click.",
};

const v1SettingCombinations = {
  auto: "The widget will start immediately.",
  focus: "The widget will start when the form is focused.",
  none: "The widget only starts when the user clicks on it.",
};

export default function PlaygroundFormHeader({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  return (
    <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
      <div className="text-sm text-blue-800 dark:text-blue-200 mb-5">
        Fill out the form fields below to test the Friendly Captcha widget. The
        widget will activate based on your "Start Mode" ({settings.startMode}){" "}
        {settings.version === "v2" &&
          `and "Widget Mode" (${settings.widgetMode}) `}
        setting.
      </div>

      {settings.version === "v2" ? (
        <div className="text-xs text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-800 rounded p-2 leading-relaxed">
          <strong>Activation:</strong>{" "}
          {
            v2SettingCombinations[
              `${settings.widgetMode}_${settings.startMode}`
            ]
          }
        </div>
      ) : (
        <div className="text-xs text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-800 rounded p-2 leading-relaxed">
          <strong>Activation:</strong>{" "}
          {v1SettingCombinations[settings.startMode]}
        </div>
      )}
    </div>
  );
}
