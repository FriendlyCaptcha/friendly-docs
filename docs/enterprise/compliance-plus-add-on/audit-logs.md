# Audit Logs

:::info

The Audit Logs feature is part of the [**Compliance+ Add-On**](../compliance-plus-add-on/).

:::

The Audit Logs feature provides comprehensive tracking of changes made by you and your team members within your organization's Friendly Captcha dashboard. This lets you keep track of what changes were made, when those changes were made, and by which user. The activity trail created by the Audit Logs feature is persistent and cannot be modified, so it can help you to satisfy enterprise compliance requirements and can help with security investigations.

Audit Logs are particularly useful when many different team members have access to make changes on your organization's Friendly Captcha dashboard. Audit Logs include activity like creating, modifying or deleting *Applications*, creating or deleting *API keys*, inviting users, and so on. When you combine Audit Logs with [Enhanced Access Control](./enhanced-access-control), you will have tight control over security and have full oversight of changes that are made.

This page shows you how you and your team members can use Audit Logs in the Friendly Captcha Dashboard. If you have any trouble, please do [contact support](https://friendlycaptcha.com/support/) and we'd be more than happy to help!

## Enabling Audit Logs

Audit Logs are enabled by default for all customers with the [**Compliance+ Add-On**](../compliance-plus-add-on/).

## Using Audit Logs

### Overview

In the [Friendly Captcha Dashboard](https://app.friendlycaptcha.com/dashboard), navigate to the **Audit Logs** page. It looks like this:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/audit-logs.png" alt="Screenshot of Audit Logs" />
    <figcaption><i>Screenshot of Audit Logs</i></figcaption>
</figure>

There are three columns:

- *Description*: A summary of what changed.
- *Actor*: The display name of the user that made this change.
- *Timestamp*: The date and time of the change.

### Showing further details

You can click on an item to show more detailed information. In the screenshot below, the first item in the list is expanded:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/audit-logs-detail.png" alt="Screenshot of the details for an Audit Logs entry" />
    <figcaption><i>Screenshot of the details for an Audit Logs entry</i></figcaption>
</figure>

The details for every event will always include these two fields:

- *Actor*: The user that made this change.
- *Resource*: The resource that the change relates to (e.g. an *Application*, *API Key*, *Widget Theme*, etc).

For some events, the details will also show the value before and after the change:

- The old value *before* the change is shown by the line starting with a `-` symbol and is highlighted in red.
- The new value *after* the change is shown by the line starting with a `+` symbol and is highlighted in green.

### Selecting a date range

If you want to view activity for a particular time period, click the date selector:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/audit-logs-date.png" alt="Screenshot of Audit Logs date selector" />
    <figcaption><i>Screenshot of Audit Logs date selector</i></figcaption>
</figure>

## Controlling who can view Audit Logs

Due to the sensitive nature of Audit Logs, by default only the user with the *Owner* role can view Audit Logs.
