import {
  getSettingsFromQueryString,
  PlaygroundSettings,
  saveSettingsToQueryString,
  WidgetEvent,
} from "@site/src/lib/playground";
import React, { useEffect, useState } from "react";
import PlaygroundWidgetPreview from "./PlaygroundWidgetPreview";
import PlaygroundEventsMonitor from "./PlaygroundEventsMonitor";
import PlaygroundConfigEditor from "./PlaygroundConfigEditor";
import PlaygroundUseCaseSelect from "./PlaygroundUseCaseSelect";
import PlaygroundVersionInfoBanner from "./PlaygroundVersionInfoBanner";
import PlaygroundBeginnerBanner from "./PlaygroundBeginnerBanner";
import PlaygroundModeSwitch from "./PlaygroundModeSwitch";

export default function Playground() {
  const [settings, setSettings] = useState<PlaygroundSettings>(
    getSettingsFromQueryString()
  );

  const [events, setEvents] = useState<WidgetEvent[]>([]);

  useEffect(() => {
    saveSettingsToQueryString(settings);
  }, [settings]);

  const addEvent = (eventName: string, detail: Partial<WidgetEvent>) => {
    const newEvent: WidgetEvent = {
      timestamp: new Date().toLocaleTimeString(),
      event: eventName,
      state: detail.state,
      response: detail.response,
      error: detail.error,
      data: detail.data,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 19)]); // Keep last 20 events
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <div id="tw-scope">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-5 items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Friendly Captcha Playground
                </h1>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  Explore different settings and options for Friendly Captcha v1
                  and v2
                </div>
              </div>

              <PlaygroundModeSwitch
                settings={settings}
                setSettings={setSettings}
              />
            </div>
          </div>

          <PlaygroundVersionInfoBanner settings={settings} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Use Case Selector and Configuration */}
            <div className="lg:col-span-1 space-y-6">
              <PlaygroundUseCaseSelect
                settings={settings}
                setSettings={setSettings}
              />

              <PlaygroundConfigEditor
                settings={settings}
                setSettings={setSettings}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Beginner Mode Info */}
              {!settings.expertMode && <PlaygroundBeginnerBanner />}

              {/* Widget Preview */}
              <PlaygroundWidgetPreview
                settings={settings}
                addEvent={addEvent}
              />

              {/* Events Monitor */}
              {settings.expertMode && settings.showEvents && (
                <PlaygroundEventsMonitor
                  events={events}
                  clearEvents={clearEvents}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
