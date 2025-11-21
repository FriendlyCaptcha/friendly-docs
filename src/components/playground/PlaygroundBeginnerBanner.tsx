import { Icon } from "@iconify/react";
import React, { useState } from "react";

export default function PlaygroundBeginnerBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 relative">
      <button
        onClick={() => setClosed(true)}
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Icon icon="iconamoon:close-fill" height={25} />
      </button>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
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
          <div className="text-lg font-bold text-green-800 dark:text-green-100 mb-2">
            Beginner Mode
          </div>
          <div className="mt-1 text-sm text-green-700 dark:text-green-300">
            <p>
              You're in beginner mode! This simplified view focuses on the
              essential settings. Switch to <strong>Expert Mode</strong> to
              access advanced features like event monitoring and detailed
              debugging tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
