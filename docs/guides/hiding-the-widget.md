# Hiding the Friendly Captcha widget

It is possible to hide the Friendly Captcha widget on your site. Before doing so, there are some considerations to make. This guide will explain the considerations and then show how to safely hide the widget.

:::note Attribution

If you choose to hide the widget, you must include the Friendly Captcha attribution visibly in the user flow. This helps to ensure end-user transparency and legal compliance. Please include the following text.

```html
This site is protected by <a href="https://friendlycaptcha.com" target="_blank" rel="noopener">Friendly Captcha</a> and its <a href="https://friendlycaptcha.com/privacy/user-protection/" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://friendlycaptcha.com/legal/terms/" target="_blank" rel="noopener">Terms of Use</a> apply.
```

:::

## When should I show the widget?

### The widget requires a click to complete

Under certain circumstances, the Friendly Captcha widget requires a click to complete. If that is the case, and the widget is hidden, your website users will be unable click it and the widget will never complete. They will therefore be unable to perform the protected website action.

Whether or not the widget requires a click is determined by its [Widget Mode](https://developer.friendlycaptcha.com/docs/v2/sdk/configuration#widget-mode). If your widget is in **One-click** mode, you should not hide it. You can set the widget to **Zero-click** mode, but know that doing so slightly sacrifices protection. If you leave the widget in its default of **Smart** mode, it may or may not require a click—and you can therefore _conditionally_ show the widget if a click is required. We show how to do that below.

:::warning

If your application’s Widget Mode is set to **One-click**, do not hide the widget.

:::

### The widget does not complete within 5 seconds

We make every effort to ensure that your customers are never waiting for the widget to complete. Rarely, it may happen that a customer receives a challenge that takes the widget longer. In those cases, it could make for a poor user experience if they are waiting on the widget to complete a challenge but they can’t see what’s going on. Therefore, we recommend displaying the widget if it hasn’t completed after 5 seconds.

### The widget encounters an error or expires

It is unlikely, but a widget might encounter an error before it completes. In that scenario, you should display the widget so that your end user can see what happened and decide what to do next.

Another rare scenario in which you should show the widget is when it expires. This can happen if the widget completes, but then the user does not actually perform the protected action (e.g., submitting the form). After a long period of time, the widget’s solution will expire, and the widget will show a message indicating as such.

## How to (safely) hide the widget

You can use CSS to hide the widget and a few lines of JavaScript to ensure that the widget is displayed in the above scenarios.

### HTML

```html
<div
  id="my-widget-id"
  class="frc-captcha frc-captcha-hidden"
  data-sitekey="FCXXXXXXXXXXXXX"
></div>
```

### CSS

```css
.frc-captcha-hidden {
  display: none;
}
```

### JavaScript

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const SHOW_AFTER_LONG_WAIT_MS = 5_000;
  const el = document.getElementById("my-widget-id");

  function showCaptchaWidget() {
    el.classList.remove("frc-captcha-hidden");
  }

  let timeout;
  el.addEventListener("frc:widget.statechange", function (e) {

    // Show the widget if the application's Widget Mode is "Smart"
    // and the widget determines that a click is required to complete.
    if (e.mode === "interactive") {
      showCaptchaWidget();
    }

    // Show the widget if it takes more than 10 seconds to complete.
    // You may also consider showing a loading indicator.
    if (e.state === "requesting") {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        showCaptchaWidget();
      }, SHOW_AFTER_LONG_WAIT_MS);
    } else if (e.state === "completed") {
      clearTimeout(timeout);
    }

    // Show the widget if it encounters an error or expires.
    if (e.state === "error" || e.state === "expired") {
      showCaptchaWidget();
    }

  });
});
```
