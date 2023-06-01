---
id: friendly-captcha-sdk.widgethandle.removeeventlistener
title: WidgetHandle.removeEventListener()
hide_title: true
sidebar_class_name: sidebar-hidden
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[friendly-captcha-sdk](./friendly-captcha-sdk.md) &gt; [WidgetHandle](./friendly-captcha-sdk.widgethandle.md) &gt; [removeEventListener](./friendly-captcha-sdk.widgethandle.removeeventlistener.md)

## WidgetHandle.removeEventListener() method

Shorthand for `this.getElement().removeEventListener` (that is strictly typed in Typescript)

**Signature:**

```typescript
removeEventListener<K extends keyof FRCEventMap>(type: K, listener: (this: HTMLElement, ev: FRCEventMap[K]) => any | {
        handleEvent: (ev: FRCEventMap[K]) => any;
    }, options?: EventListenerOptions): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  type | K |  |
|  listener | (this: HTMLElement, ev: [FRCEventMap](./friendly-captcha-sdk.frceventmap.md)<!-- -->\[K\]) =&gt; any &#124; { handleEvent: (ev: [FRCEventMap](./friendly-captcha-sdk.frceventmap.md)<!-- -->\[K\]) =&gt; any; } |  |
|  options | EventListenerOptions | _(Optional)_ |

**Returns:**

void