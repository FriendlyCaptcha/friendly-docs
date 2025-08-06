# Client (CDN script)

This guide runs you through the changes you will have to make when switching from version 1 to version 2 of the Friendly Captcha widget if you are using the script tags. 

If you create widgets programmatically, follow [this guide](./javascript-api) instead.

## 1. Replace the script tags
Replace the `friendly-challenge` scripts

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.module.min.js" async defer></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.12/widget.min.js" async defer></script>
  ```
  with the new `@friendlycaptcha/sdk` scripts
  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.30/site.min.js"
          async defer></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@0.1.30/site.compat.min.js"
        async defer></script>
  ```
## 2. 🇪🇺 Update custom API endpoints

If you are using a specific endpoint, you need to update the `data-puzzle-endpoint` attribute. The attribute is now called `data-api-endpoint` and it supports shortcuts (`"eu"` for our dedicated EU endpoint).

For example, if you are using the dedicated EU-only endpoint, you would replace
```html
<div class="frc-captcha" data-sitekey="<your sitekey>" data-puzzle-endpoint="https://eu-api.friendlycaptcha.eu/api/v1/puzzle"></div>
```
with
```html
<div class="frc-captcha" data-sitekey="<your sitekey>" data-api-endpoint="eu"></div>
```

## 3. Remove `data-lang`
Remove the `data-lang="..."` attributes from your widgets. The new v2 widget automatically matches the language on your website. 


**Example**
```html
<div class="frc-captcha" data-sitekey="<your sitekey>" data-lang="fr"></div>
```
becomes
```html
<div class="frc-captcha" data-sitekey="<your sitekey>"></div>
```

If you still want to explicitly force a specific language, replace `data-lang` with `lang`.

## 4. Update your callbacks into event listeners 

If specify `data-callback`, `data-error-callback` or `data-expired-callback` on your widget, these need to be replaced with event handlers.

If you are currently using these callbacks to enable and disable a submit button, your code may look like this:

```html
<form>
  <div class="frc-captcha" data-sitekey="<your sitekey>" data-callback="myCallback" data-error-callback="myErrorCallback"></div>

  <button id="my-button" type="submit" disabled></button>
</form>
```
```javascript
<script>
  const myButton = document.getElementById("my-button");

  function myCallback(response) {
    console.log("The response is ", response);
    // use the response somehow.
    myButton.disabled = false;
  }
  function myErrorCallback(error) {
    console.error(error);

    // It is best practice to enable your submit button when an error occurs.
    myButton.disabled = false
  }
</script>
```

You would replace it with the following

```html
<form>
  <div class="frc-captcha" data-sitekey="<your sitekey>"></div>

  <button id="my-button" type="submit" disabled></button>
</form>
```
```javascript
<script>
  const myWidgetElement = document.querySelector(".frc-captcha");
  const myButton = document.getElementById("my-button");

  myWidgetElement.addEventListener("frc:widget.statechange", function (event) {
    const detail = event.detail;
    if (detail.state === "completed") { 
      myButton.disabled = false;
      console.log("The response is ", detail.response);
    else if (detail.state === "error") {
      console.error(detail.error);

      // It is best practice to enable your submit button when an error occurs.
      myButton.disabled = false;
    }
    } else {
      myButton.disabled = true;
    }
  });
</script>
```

For more information around the events and possible states, see [the Events documentation](../../sdk/events.md).

## 5. Next steps
With these changes the widget should function the same way as it did before.

You will need to make some changes to your backend server code next, which are described in [this guide](./backend-integration).
