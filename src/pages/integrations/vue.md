---
title: Vue Integration
description: Integrate Friendly Captcha into your Vue application
hide_table_of_contents: true
---

# Vue Integration

To integrate Friendly Captcha into your Vue application, you can use the `friendlycaptcha/sdk` NPM package.

```bash
npm install friendlycaptcha/sdk
```

## Friendly Captcha Component

To make it easier to integrate Friendly Captcha you can use this component. It's a wrapper around the Friendly Captcha SDK that handles the creation and destruction of the widget and exposes the configuration options.

```html
<template>
  <div ref="container" class="frc-captcha" :style="{ width: '100%' }"></div>
</template>

<script lang="ts" setup>
  import { onUnmounted, ref, watch } from "vue";
  import {
    FRCWidgetCompleteEvent,
    FriendlyCaptchaSDK,
    CreateWidgetOptions,
    WidgetErrorData,
    FRCWidgetErrorEventData,
  } from "@friendlycaptcha/sdk";

  const sdk = new FriendlyCaptchaSDK({
    apiEndpoint: "global", // Set this to "eu" if you're using the EU endpoint.
    disableEvalPatching: false, // Set this to true if your Vue application uses eval in dev mode which is common in many frameworks.
  });

  defineExpose({ reset: () => widget.value?.reset() });
  const props = defineProps<Omit<CreateWidgetOptions, "element">>();
  const emit = defineEmits<{
    (e: "complete", response: string): void;
    (e: "error", error: WidgetErrorData): void;
    (e: "expire"): void;
  }>();

  const container = ref<HTMLElement>();
  const widget = ref<WidgetHandle>();

  watch(container, () => {
    if (widget.value) {
      widget.value.reset();
    }

    if (!widget.value && container.value) {
      widget.value = sdk.createWidget({
        element: container.value,
        ...props,
      });

      container.value.addEventListener("frc:widget.complete", (e) => {
        emit("complete", (e as FRCWidgetCompleteEvent).detail.response);
      });

      container.value.addEventListener("frc:widget.error", (e) => {
        emit("error", (e as CustomEvent<FRCWidgetErrorEventData>).detail.error);
      });

      container.value.addEventListener("frc:widget.expire", () => {
        emit("expire");
      });
    }
  });

  onUnmounted(() => {
    if (widget.value) {
      widget.value.destroy();
      widget.value = undefined;
    }
  });
</script>
```

You can use the `FriendlyCaptcha` component in your application like this:

```html
<template>
  <FriendlyCaptcha
    sitekey="YOUR_SITE_KEY"
    @complete="onComplete"
  ></FriendlyCaptcha>
</template>

<script lang="ts" setup>
  import FriendlyCaptcha from "./FriendlyCaptcha.vue";

  const onComplete = (response: string) => {
    console.log("Captcha complete", response);
  };
</script>
```
