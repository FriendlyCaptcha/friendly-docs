import { PlaygroundSettings } from "@site/src/lib/playground";
import React from "react";

export default function PlaygroundUseCaseSelect({
  settings,
  setSettings,
}: {
  settings: PlaygroundSettings;
  setSettings: (settings: PlaygroundSettings) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Use Case
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Choose a real-world scenario to test the captcha widget
      </p>
      <select
        value={settings.useCase}
        onChange={(e) =>
          setSettings({
            ...settings,
            useCase: e.target.value as "contact" | "signup" | "download",
          })
        }
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
      >
        <option value="contact">📧 Contact Form</option>
        <option value="signup">👤 User Signup</option>
        <option value="download">📥 File Download</option>
      </select>
    </div>
  );
}
