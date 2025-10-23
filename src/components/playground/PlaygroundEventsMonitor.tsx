import React from "react";
import { WidgetEvent } from "@site/src/lib/playground";

export default function PlaygroundEventsMonitor({
  events,
  clearEvents,
}: {
  events: WidgetEvent[];
  clearEvents: () => void;
}) {
  return (
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
                    Response: {event.response}
                  </div>
                )}
                {event.error && (
                  <div className="ml-4 text-red-600 dark:text-red-400 text-xs">
                    Error: {JSON.stringify(event.error)}
                  </div>
                )}
                {event.data && (
                  <div className="ml-4 text-gray-600 dark:text-gray-400 font-mono text-xs">
                    Data: {JSON.stringify(event.data)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
