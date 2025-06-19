# Enhanced Access Control

:::info

The Enhanced Access Control feature is part of the [**Compliance+ Add-On**](../compliance-plus-add-on/).

:::

The Enhanced Access Control feature gives you fine-grained access control over what each of your team members can view or modify within your organization's Friendly Captcha dashboard. This allows you to implement the principle of least-privilege by granting team members only the minimum permissions they need to perform their duties. You can create roles tailored to your organization's structure, such as view-only auditors, billing administrators, or developers with access to only specific *Applications*. This can help you to satisfy security best practices and enterprise compliance requirements.

For many organizations, tightly controlling access and keeping an audit log of changes are critical components of cybersecurity and compliance. Enhanced Access Control combines well with the [Audit Logs](./audit-logs) feature to help you satisfy these requirements.

Additionally, if you are using our [Single Sign-On (SSO)](./single-sign-on) feature to leverage your organization's existing identity provider for authentication, you can use Enhanced Access Control to create a *Default Role* with minimal (or even zero) permissions so that any team member logging in for the first time using SSO won't have more access than you intended.

## Features

### App Groups

If you have many *Applications* configured in the Friendly Captcha Dashboard, you may want some team members to only have access to a specific set of applications. To make this easier, you can create an *App Group* with one or more *Applications*, and then create a *Custom Role* that has view or edit permissions for this *App Group*.

### Custom Roles

There are three default roles:

- *Member*: This role can manage *Applications*, *API Keys*, and *Widget Themes*.
- *Admin*: This role is like *Member*, but can also send invites to new users.
- *Owner*: This role has maximum access, including deleting *Members* or changing their role, configuring [Single Sign-On](./single-sign-on), and viewing [Audit Logs](./audit-logs).

If you have many team members that have access to your organization's Friendly Captcha Dashboard, you may want to have more fine-grained access control. Custom Roles lets you create new roles that have exactly the permissions you want, such as read-only access, or edit access to only one specific *App Group*.

## Enabling Enhanced Access Control

Enhanced Access Control is enabled by default for all customers with the [**Compliance+ Add-On**](../compliance-plus-add-on/).

## Managing Enhanced Access Control

In the [Friendly Captcha Dashboard](https://app.friendlycaptcha.com/dashboard), navigate to the **Settings** page and find the **App Groups** and **Custom Roles** sections. They look like this:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/app-groups-and-custom-roles-settings.png" alt="Screenshot of App Groups and Custom Roles settings" />
    <figcaption><i>Screenshot of App Groups and Custom Roles settings</i></figcaption>
</figure>

### App Groups

To add a new App Group, type a suitable name into the input box and click the *Add App Group* button:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/app-groups-add.png" alt="Screenshot of adding a new App Group" />
    <figcaption><i>Screenshot of adding a new App Group</i></figcaption>
</figure>

Your new App Group should now be visible in the list of App Groups:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/app-groups-created.png" alt="Screenshot of the new App Group" />
    <figcaption><i>Screenshot of the new App Group</i></figcaption>
</figure>

To assign an Application to your new App Group, navigate to the *Applications* page to see your list of Applications. Click the *Manage* button for the Application you want to assign. You should see a page like this:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/app-groups-manage-app.png" alt="Screenshot of the Manage App page" />
    <figcaption><i>Screenshot of the Manage App page</i></figcaption>
</figure>

Click the *App Group* drop-down menu and select your new App Group, then click the *Save changes* button. You can repeat this step for any other Applications that you want to put into this App Group.

Go back to the main *Applications* page to see your list of Applications. You can now see the name of the App Group in the details of each Application:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/app-groups-applications.png" alt="Screenshot of the Applications page" />
    <figcaption><i>Screenshot of the Applications page</i></figcaption>
</figure>

:::info

You cannot delete an App Group that still has Applications assigned to it. To delete an App Group, you first need to assign all of the Applications that are in that App Group to a different App Group.

:::

### Custom Roles

To add a new Custom Role, click the *Add custom role* button:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/custom-roles-add.png" alt="Screenshot of Add Custom Role button" />
    <figcaption><i>Screenshot of the Add Custom Role button</i></figcaption>
</figure>

You will be taken to a page where you can configure your new Custom Role:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/custom-roles-form.png" alt="Screenshot of the Add Custom Role form" />
    <figcaption><i>Screenshot of the Add Custom Role form</i></figcaption>
</figure>

The form has these fields:

- *Role Name*: The name for your new Custom Role.
- *Account Permissions*: These are broad permissions that you can grant to this Custom Role. You might for example give the `Manage Billing` permission to a Custom Role designed for your finance team, but give them no other permissions.
- *All Apps Permissions*: The permission level you set here will be granted to this Custom Role across all Applications. These are the available choices:
    - *Manage*: View, update, or delete Applications.
    - *Edit*: View or update Applications.
    - *View*: View all Applications.
    - *None*: Cannot view any Applications.
- *App Group Permissions*: Here you can grant permissions to one or more specific App Groups. The permission levels (i.e. *Manage*, *Edit*, *View*) behave the same as for *All Apps Permissions* described above.

In the example below, we will create a Custom Role that can *Manage Widget Themes*, *Manage API Keys*, has the *View* permission level for all Applications, and the *Manage* permission level for Applications in one specific App Group:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/custom-roles-form-completed.png" alt="Screenshot of the completed Custom Role form" />
    <figcaption><i>Screenshot of the completed Custom Role form</i></figcaption>
</figure>

Click the *Save Changes* button when you are done. You will be taken back to the main *Settings* page, where you can see your new Custom Role:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/custom-roles-created.png" alt="Screenshot of the new Custom Role" />
    <figcaption><i>Screenshot of the new Custom Role</i></figcaption>
</figure>

You can now assign specific users to your new Custom Role. In the *Settings* page, scroll to the *Members* section, click the *Role* drop-down menu next to the desired user, and select your new Custom Role:

<figure style={{ textAlign: 'center' }}>
    <img src="/img/custom-roles-assign.png" alt="Screenshot of assigning a Custom Role to a user" />
    <figcaption><i>Screenshot of assigning a Custom Role to a user</i></figcaption>
</figure>

:::info

You cannot delete a Custom Role that still has users assigned to it. To delete a Custom Role, you first need to assign all of the users with that role to a different role.

:::
