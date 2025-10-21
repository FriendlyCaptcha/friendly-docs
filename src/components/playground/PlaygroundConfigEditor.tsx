import { PlaygroundSettings } from "@site/src/lib/playground";
import React from "react";

export default function PlaygroundConfigEditor({
  settings,
  setSettings,
}: {
  settings: PlaygroundSettings;
  setSettings: (settings: PlaygroundSettings) => void;
}) {
  return (
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
            onClick={() => setSettings({ ...settings, version: "v1" })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              settings.version === "v1"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            v1
          </button>
          <button
            onClick={() => setSettings({ ...settings, version: "v2" })}
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
              setSettings({
                ...settings,
                widgetMode: e.target.value as any,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="one-click">One-click - User must click once</option>
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
            setSettings({
              ...settings,
              startMode: e.target.value as any,
            })
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
            setSettings({
              ...settings,
              theme: e.target.value as any,
            })
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
            setSettings({
              ...settings,
              endpoint: e.target.value as any,
            })
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
              setSettings({
                ...settings,
                customEndpoint: e.target.value,
              })
            }
            className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter custom endpoint URL"
          />
        )}
      </div>

      {/* Language */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) =>
            setSettings({
              ...settings,
              language: e.target.value,
            })
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
                setSettings({
                  ...settings,
                  showEvents: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Show Events
            </span>
          </label>
        </div>
      )}

      {/* Simulate False Positive Toggle */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.simulateFalsePositive}
            onChange={(e) =>
              setSettings({
                ...settings,
                simulateFalsePositive: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Simulate False Positive
          </span>
        </label>
      </div>
    </div>
  );
}
