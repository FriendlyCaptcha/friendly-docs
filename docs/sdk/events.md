# Events

The captcha widget emits DOM events which allow you to write code that reacts to changes in the widget.

## Listening to events
You can listen to events using `HTMLElement.addEventListener` or `widget.addEventListener`.


**Example** (disable the button until the captcha is complete)
```html
<form>
  <input type="text" name="message" placeholder="Enter your message.."/>
  <div class="frc-captcha" data-sitekey="<my sitekey>"></div>

  <button id="my-button" type="submit" disabled></button>
</form>
```

```html
<script>
  const myWidget = document.querySelector(".frc-captcha");
  const myButton = document.getElementById("my-button");

  myWidget.addEventListener("frc:widget.complete", function(event) {
      console.log("Widget was completed! Response:", event.detail.response);
      myButton.disabled = false;
  });

  myWidget.addEventListener("frc:widget.error", function(event) {
      console.error("Widget ran into an error:", event.detail.error);
      myButton.disabled = false;
  });

  myWidget.addEventListener("frc:widget.expire", function(event) {
      console.warn("The widget expired because the user waited too long");
      myButton.disabled = true;
  });
</script>
```


## Widget Event Reference

Below are all the custom events a widget can emit and their payload.

### `frc:widget.complete`

Called when the widget completes, in the payload you can find the `response` which is the value that should be part of the request to your server.

#### Event payload (**`event.detail`**)
```typescript
{
  name: "frc:widget.complete",
  state: "completed",
  response: "<a long string of random characters>",
  id: "w_123asdf" // The widget ID, a random string that is unique per widget on the page.
}
```

### `frc:widget.error`
Called when the widget failed for any reason. Perhaps there was no internet connection to request a challenge. A restart button is shown to the end user and the widget can be started to try again.

#### **`event.detail`**
```typescript
{
  name: "frc:widget.error",
  state: "error",
  response: ".ERROR",
  error: {
    code: "network_error", // See `WidgetErrorCode` for possible values
    detail: "..." // A human readable description of the issue, or an empty string.
  },
  id: "w_123asdf" // The widget ID, a random string that is unique per widget on the page.
}
```

### `frc:widget.expire`
Called when the completed response has expired. This will only happen if the user leaves their browser open for a long time after completing a captcha, in which case a restart button is shown to the end user.

#### **`event.detail`**
```typescript
{
  name: "frc:widget.expire",
  state: "expired",
  response: ".EXPIRED",
  id: "w_123asdf" // The widget ID, a random string that is unique per widget on the page.
}
```

### `frc:widget.statechange`
Called when the widget switches to a different state.  
See also the [**widget lifecycle documentation**](./lifecycle).

#### **`event.detail`**
```typescript
{
  name: "frc:widget.statechange",
  state: "<name of new state>", // One of "init", "reset", "unactivated", "activating", "activated", "requesting", "solving", "verifying", "completed", "expired", "error", "destroyed"
  response: "<different value depending on the state>",
  error: {
    code: "network_error", // See `WidgetErrorCode` for possible values
    detail: "..." // A human description of the issue, or empty string.
  },
  id: "w_123asdf" // The widget ID, a random string that is unique per widget on the page.
}
```

### WidgetError
For the exact specification of the `error` fields in the event payload, see the [reference here](./reference/sdk.widgeterrordata).
