---
id: friendly-captcha-sdk.widgethandle.reset
title: WidgetHandle.reset()
hide_title: true
sidebar_class_name: sidebar-hidden
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[friendly-captcha-sdk](./friendly-captcha-sdk.md) &gt; [WidgetHandle](./friendly-captcha-sdk.widgethandle.md) &gt; [reset](./friendly-captcha-sdk.widgethandle.reset.md)

## WidgetHandle.reset() method

Reset the widget, removing any progress.

Optional argument: an object with the name of the trigger that caused the reset. You would usually keep this empty. This is the `trigger` field in the `frc:widget.reset` event, which defaults to `root`<!-- -->.

**Signature:**

```typescript
reset(opts?: WidgetResetOptions): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  opts | WidgetResetOptions | _(Optional)_ |

**Returns:**

void