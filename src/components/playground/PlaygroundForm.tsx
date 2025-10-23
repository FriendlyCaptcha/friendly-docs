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

    case "checkout":
      return (
        <>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
              🛒 Shopping Cart
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Wireless Headphones
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: 1
                </div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                  $99.99
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Phone Case
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: 2
                </div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                  $24.98
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  USB Cable
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: 1
                </div>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                  $12.99
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  Total:
                </span>
                <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  $137.96
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="name" className={commonLabelClass}>
              Full name
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
            <label htmlFor="address" className={commonLabelClass}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Your address"
              className={commonInputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className={commonLabelClass}>
              Card number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className={commonInputClass}
              required
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-auto">
              <label htmlFor="expirationDate" className={commonLabelClass}>
                Expiration date
              </label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/YY"
                className={commonInputClass}
                required
              />
            </div>
            <div className="flex-auto">
              <label htmlFor="cvv" className={commonLabelClass}>
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                className={commonInputClass}
                required
              />
            </div>
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
          <div className="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
              📄 Download: Product Brochure
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
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
