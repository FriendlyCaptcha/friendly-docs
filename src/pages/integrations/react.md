---
title: React Integration
description: Integrate Friendly Captcha into your React application
hide_table_of_contents: true
---

# React Integration

To integrate Friendly Captcha into your React application, you can use the `@friendlycaptcha/sdk` NPM package.

```bash
npm install @friendlycaptcha/sdk
```

## Friendly Captcha Component

To make it easier to integrate Friendly Captcha you can use this component. It's a wrapper around the Friendly Captcha SDK that handles the creation and destruction of the widget and exposes the configuration options.

```tsx
import { useRef, forwardRef, useEffect, useImperativeHandle } from "react";
import {
  FriendlyCaptchaSDK,
  type WidgetHandle,
  type FRCWidgetCompleteEvent,
  type CreateWidgetOptions,
  type WidgetErrorData,
  type FRCWidgetErrorEventData,
} from "@friendlycaptcha/sdk";

const sdk = new FriendlyCaptchaSDK({
  apiEndpoint: "global", // Set this to "eu" if you're using the EU endpoint.
  disableEvalPatching: false, // Set this to true if your React application uses eval in dev mode which is common in many frameworks.
});

type Props = Omit<CreateWidgetOptions, "element"> & {
  onComplete?: (response: string) => void;
  onError?: (error: WidgetErrorData) => void;
  onExpire?: () => void;
};

type Ref = {
  reset: () => void;
};

const FriendlyCaptcha = forwardRef<Ref, Props>((props, ref) => {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<WidgetHandle | null>(null);

  // Separate callback props from widget options
  const { onComplete, onError, onExpire, ...widgetOptions } = props;

  useEffect(() => {
    if (captchaRef.current && sdk) {
      widgetRef.current = sdk.createWidget({
        element: captchaRef.current,
        ...widgetOptions,
      });

      return () => widgetRef.current?.destroy();
    }
  }, Object.values(widgetOptions));

  // Update event listeners when callbacks change
  useEffect(() => {
    const element = captchaRef.current;
    if (!element) return;

    const handleComplete = (e: Event) => {
      if (onComplete) {
        onComplete((e as FRCWidgetCompleteEvent).detail.response);
      }
    };

    const handleError = (e: Event) => {
      if (onError) {
        onError((e as CustomEvent<FRCWidgetErrorEventData>).detail.error);
      }
    };

    if (onComplete) {
      element.addEventListener("frc:widget.complete", handleComplete);
    }
    if (onError) {
      element.addEventListener("frc:widget.error", handleError);
    }
    if (onExpire) {
      element.addEventListener("frc:widget.expire", onExpire);
    }

    return () => {
      if (onComplete) {
        element.removeEventListener("frc:widget.complete", handleComplete);
      }
      if (onError) {
        element.removeEventListener("frc:widget.error", handleError);
      }
      if (onExpire) {
        element.removeEventListener("frc:widget.expire", onExpire);
      }
    };
  }, [onComplete, onError, onExpire]);

  useImperativeHandle(ref, () => ({
    reset: () => widgetRef.current?.reset(),
  }));

  return <div ref={captchaRef} />;
});

export default FriendlyCaptcha;
```

You can use the `FriendlyCaptcha` component in your application like this:

```tsx
function App() {
  // Memoize the callback function to avoid unnecessary event listeners updates.
  const handleComplete = useCallback((response: string) => {
    console.log("Captcha complete", response);
  }, []);

  return (
    <FriendlyCaptcha sitekey="YOUR_SITE_KEY" onComplete={handleComplete} />
  );
}
```

Keep in mind that whenever any of the configuration props change, the widget has to be destroyed and recreated. The only exception are the `onComplete`, `onError`, and `onExpire` callbacks, which can be updated without recreating the widget. To avoid unnecessary updates to the event listeners, it can make sense to memoize the callback functions using `useCallback`.

## Issues with Next.js

Next.js is a popular framework for building React applications. It leverages server-side rendering (SSR) to improve performance and SEO.

To integrate Friendly Captcha into your Next.js application, you have to make sure it's only rendered on the client side.

### Pages Router

If you're using the Pages Router, you can use the `dynamic` function provided by `next/dynamic` to import your `FriendlyCaptcha` component only on the client side.

```tsx
import dynamic from "next/dynamic";

const FriendlyCaptcha = dynamic(() => import("@/components/FriendlyCaptcha"), {
  ssr: false,
});

export default function Home() {
  return <FriendlyCaptcha />;
}
```

### App Router

If you're using the App Router, you can declare a boundary between the server and client using the `"use client"` directive. Just add it to the top of your `FriendlyCaptcha` component which imports `@friendlycaptcha/sdk`.

```tsx
"use client";

import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";

const sdk = new FriendlyCaptchaSDK({
  apiEndpoint: "global", // Set this to "eu" if you're using the EU endpoint.
  disableEvalPatching: process.env.NODE_ENV === "development", // Next.js uses eval in dev mode.
});

// The rest of the component is the same as the one in the Friendly Captcha Component above.
// ...
```
