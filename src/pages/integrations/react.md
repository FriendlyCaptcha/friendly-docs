---
title: React Integration
description: Integrate Friendly Captcha into your React application
hide_table_of_contents: true
---

# React Integration

To integrate Friendly Captcha into your React application, you can use the `friendlycaptcha/sdk` NPM package.

```bash
npm install friendlycaptcha/sdk
```

## Friendly Captcha Component

To make it easier to integrate Friendly Captcha you can use this component. It's a wrapper around the Friendly Captcha SDK that handles the creation and destruction of the widget and exposes the configuration options.

```tsx
import {
  FRCWidgetCompleteEvent,
  FriendlyCaptchaSDK,
  CreateWidgetOptions,
  WidgetErrorData,
  FRCWidgetErrorEventData,
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

  useEffect(() => {
    if (captchaRef.current) {
      const captcha = sdk.createWidget({
        element: captchaRef.current,
        ...props,
      });

      if (props.onComplete) {
        captchaRef.current.addEventListener("frc:widget.complete", (e) => {
          props.onComplete!((e as FRCWidgetCompleteEvent).detail.response);
        });
      }

      if (props.onError) {
        captchaRef.current.addEventListener("frc:widget.error", (e) => {
          props.onError!(
            (e as CustomEvent<FRCWidgetErrorEventData>).detail.error
          );
        });
      }

      if (props.onExpire) {
        captchaRef.current.addEventListener("frc:widget.expire", () => {
          props.onExpire!();
        });
      }

      return () => captcha?.destroy();
    }
  }, Object.values(props));

  // Expose the reset method to the parent component
  useImperativeHandle(ref, () => ({
    reset: () => {
      widgetRef.current?.reset();
    },
  }));

  return <div ref={elementRef} />;
});

export default FriendlyCaptcha;
```

You can use the `FriendlyCaptcha` component in your application like this:

```tsx
function App() {
  const handleComplete = (response: string) => {
    console.log("Captcha complete", response);
  };

  return (
    <FriendlyCaptcha sitekey="YOUR_SITE_KEY" onComplete={handleComplete} />
  );
}
```

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
