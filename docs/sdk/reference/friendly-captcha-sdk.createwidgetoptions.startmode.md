---
id: friendly-captcha-sdk.createwidgetoptions.startmode
title: CreateWidgetOptions.startMode
hide_title: true
sidebar_class_name: sidebar-hidden
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[friendly-captcha-sdk](./friendly-captcha-sdk.md) &gt; [CreateWidgetOptions](./friendly-captcha-sdk.createwidgetoptions.md) &gt; [startMode](./friendly-captcha-sdk.createwidgetoptions.startmode.md)

## CreateWidgetOptions.startMode property

The start mode determines the behavior around automatic activation of the widget. Activation here means the challenge gets requested and gets solved. Defaults to `"focus"`<!-- -->.

\*`"auto"`<!-- -->: the widget gets activated as soon as it is created. \* `"focus"`<!-- -->: the widget gets activated as soon as the form above it is focused. \* `"none"`<!-- -->: The widget does not start automatically at all, the user needs to press the widget.

**Signature:**

```typescript
startMode?: StartMode;
```