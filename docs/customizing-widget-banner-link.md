---
id: customizing-widget-banner-link
title: Customizing the Widget Banner Link
---

# Customizing the Widget Banner Link

While the widget's banner link color cannot be customized through the dashboard's theme settings, you can easily modify it using CSS on your webpage.

Here's the CSS you need to add to your page. Replace `<YOUR_COLOR>` with the color you want to use.

```css
.frc-banner a {
  color: <YOUR_COLOR> !important;
}

@media (prefers-color-scheme: dark) {
  .frc-banner a {
    color: <YOUR_COLOR> !important;
  }
}
```

## Best Practices

To ensure end-user transparency and legal compliance, we recommend keeping the default banner link in the widget.

You are allowed to hide the widget banner link as long as you include the Friendly Captcha attribution visibly in the user flow. Please include the following text:

```html
This site is protected by <a href="https://friendlycaptcha.com" target="_blank" rel="noopener">Friendly Captcha</a> and its <a href="https://friendlycaptcha.com/privacy/user-protection/" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://friendlycaptcha.com/legal/terms/" target="_blank" rel="noopener">Terms of Use</a> apply.
```
