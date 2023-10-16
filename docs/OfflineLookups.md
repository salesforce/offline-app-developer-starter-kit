# Offline Lookups

[The LWC offline lookups example](../force-app/main/default/lwc/createContactRecord) demonstrates the capability to search a list of sObjects when creating or updating a record with the Mobile Offline app. For example, searching a list of `Accounts` while creating or updating a `Contact`. When the mobile device is online, the lookup field searches records by making network calls. When the mobile device is offline, it searches records from the local record cache in the app.

In order to have records available to search while offline, they must be downloaded during Briefcase priming. In addition to primed records, any existing drafts can also be searched while the device is offline.

In the example of the `createContactRecord` LWC, a lookup field is added as a base component—`lightning-record-picker`—in the HTML file. Upon tapping the field, a modal page emerges where the user can type a keyword to search a list of `Accounts` while creating a `Contact` record:

```xml
<lightning-record-picker
    label="Account"
    placeholder="Search Accounts..."
    object-api-name="Account"
    value={account}
    onchange={handleChange}
>
</lightning-record-picker>
```

In the component’s JS file, the `handleChange` event handler method is called with the record ID of the selected `Account`. This record ID is added to the `Contact` when the edits are saved.

See [Record Picker](https://developer.salesforce.com/docs/component-library/bundle/lightning-record-picker/documentation) in the Lightning Web Component Reference for more details on how to use the `lightning-record-picker` component.

> **Note**
> The `lightning-record-picker` component is a Beta Service in the Salesforce Winter '24 release. It's scheduled to be GA in a release to follow. See the [Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_components.htm&release=246&type=5) for more information.

## Configure Offline Lookups

1. [Configure your Offline Briefcase](../README.md#define-an-offline-briefcase) with the desired sObjects. In this example, you want to prime records for the `Contact` and `Account` sObjects. Priming `Contact` records allows you to work with those records offline, while primed `Account` records can be looked up during offline searches.

2. At a minimum, you must deploy the following LWCs to your Org, so they can be added as Quick Actions for the sObjects:
    - `viewAccountRecord` (`Account.view`), and `viewContactRecord` (`Contact.view`)
    - `createAccountRecord` (`Account.create`), and `createContactRecord` (`Contact.create`)

3. Log in to the Mobile Offline App. Wait for the briefcase priming to fully complete.

4. To verify that you can create records while offline:

    1. Turn off the network connection on your mobile device (for example, by enabling Airplane Mode or turning off WiFi).
    2. Tap the `New` button from the `Contacts` home page to create a new contact.
    3. Fill in the required data fields, like `Last Name`.
    4. Tap the `Account` lookup field at the bottom. This action brings up a modal page with a search box.
    5. Start searching by entering your filter criteria. The dropdown list shows any records matching your filter in the local cache, including the drafts!
    6. Select an `Account` record from the dropdown list. The modal page automatically closes, and the `Account` record is populated in the lookup field.
    7. Save the record as a new `Contact` draft.
    
5. Turn on the network connection on the mobile device, and let the drafts automatically sync up with the server. You should see that a new contact has been created successfully with an associated account!
