import React from "react";
import { PlaygroundSettings } from "@site/src/lib/playground";

export default function PlaygroundForm({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  const commonInputClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white";
  const commonLabelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  switch (settings.useCase) {
    case "contact":
      return (
        <>
          <div>
            <label htmlFor="name" className={commonLabelClass}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={commonLabelClass}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className={commonLabelClass}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className={commonLabelClass}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us how we can help you..."
              className={commonInputClass}
              required
            />
          </div>
        </>
      );

    case "signup":
      return (
        <>
          <div>
            <label htmlFor="username" className={commonLabelClass}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a username"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={commonLabelClass}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={commonLabelClass}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={commonLabelClass}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className={commonInputClass}
              required
            />
          </div>
        </>
      );

    case "download":
      return (
        <>
          <div>
            <label htmlFor="name" className={commonLabelClass}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={commonLabelClass}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="company" className={commonLabelClass}>
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your company name"
              className={commonInputClass}
            />
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              📄 Download: Product Brochure
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Get our comprehensive product brochure with pricing, features, and
              case studies.
            </p>
          </div>
        </>
      );

    default:
      return null;
  }
}
