import { FriendlyCaptchaSDK, WidgetHandle } from "@friendlycaptcha/sdk";
import React, { useEffect, useRef, useState } from "react";

const friendlyCaptchaSDK = new FriendlyCaptchaSDK({
  disableEvalPatching: true,
});

export default function AcessibilityCertificationWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<WidgetHandle>(null);
  const cleanupFunc = useRef<() => void>(null);

  useEffect(() => {
    if (widgetRef.current) {
      widgetInstanceRef.current = friendlyCaptchaSDK.createWidget({
        element: widgetRef.current,
        sitekey: "FCMGEMUD2LR7ICLH",
      });
    }
  }, []);

  return <div ref={widgetRef} />;
}
