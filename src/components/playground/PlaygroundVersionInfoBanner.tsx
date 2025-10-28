import { Icon } from "@iconify/react";
import { PlaygroundSettings } from "@site/src/lib/playground";
import React, { useState } from "react";

export default function PlaygroundVersionInfoBanner({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg relative">
      <button
        onClick={() => setClosed(true)}
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Icon icon="iconamoon:close-fill" height={25} />
      </button>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
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
          <div className="text-xl font-bold text-blue-800 dark:text-blue-100 mb-3">
            {settings.version === "v1"
              ? "Friendly Captcha v1"
              : "Friendly Captcha v2"}
          </div>
          <div className="mt-1 text-sm text-blue-700 dark:text-blue-300 prose">
            {settings.version === "v1" ? (
              <div className="mb-5">
                Legacy version with basic features. Switch to v2 for improved
                protection and UX.
              </div>
            ) : (
              <>
                <div className="mb-5">
                  Latest version with improved protection and UX.
                </div>

                <ul className="list-disc list-outside space-y-2">
                  <li>
                    v2 has <strong>improved protection</strong>. It provides us
                    with more powerful signals to detect abuse, automated
                    browsers, and browsers that have otherwise been tampered
                    with.
                  </li>
                  <li>
                    v2 improves on <strong>user experience</strong>. Real users
                    are less likely to need to wait for the captcha to finish.
                  </li>
                  <li>
                    v2 is <strong>easier to integrate</strong>. It has SDKs for
                    many popular programming languages, automatically matches
                    the language of your website, and has simplified Content
                    Security Policy (CSP) requirements.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
