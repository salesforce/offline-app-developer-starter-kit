# Offline Lookups

[The offline lookups example](https://github.com/salesforce/offline-app-developer-starter-kit/tree/main/force-app/main/default/lwc/createContactRecord) in Starter Kit demonstrates the capability to search a list of objects (e.g., accounts) when creating/updating a record (e.g., contact) for mobile offline app. When device is online, the lookup field searches records by making network calls. When offline, it searches records from cache. In order to have records available for search offline, they need to be downloaded during briefcase priming. In addition to primed records, any existing drafts can also be searched in offline.

In the example of createContactRecord LWC, a lookup field is added as a base component `lightning-record-picker`  in the HTML file. Upon clicked on the field, a modal page will be presented where use can type a key word to search a list of accounts while creating a contact record. 

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

In the component’s JS file, the `handleChange` is called with the selected recordId after an account is selected. The recordId can then be used later when the edit form is submitted.

[The developers document](https://developer.salesforce.com/docs/component-library/bundle/lightning-record-picker/documentation) contains more details on how to use the lightning-record-picker component.

> **Note**
> This component is a Beta Service in Winter'24 release. It is targeted to be GA in the coming releases. [Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_components.htm&release=246&type=5)

## Steps

1. [Configure your Offline Briefcase](https://github.com/salesforce/offline-app-developer-starter-kit#define-an-offline-briefcase) with the desired objects. In this example, you want to have records to be primed for Contact and Account objects. Especially, the primed account records will be searched when user lookup accounts in offline.

2. At the minimum, deploy the following LWCs to the org which can be added as quick actions to objects
    - viewAccountRecord (Account.view), viewContactRecord (Contact.view)
    - createAccountRecord (Account.create), createContactRecord (Contact.create)

3. Login to the Mobile Offline App. Let the briefcase priming is fully completed.

4. Turn off network on device, tap the New button from Contacts home page to create a contact.
    - Fill required data fields, e.g., Last Name
    - Tap the Account lookup field at the bottom. It brings up a modal page with a search box. You can type any key to start search. The dropdown list shows any matched records in cache, including the drafts! Select an account record from the dropdown list. The modal page is automatically closed.
    - Now you have the account record filled in the lookup field. You can go ahead to save it as a new contact draft.
    
5. Turn on network on device, let the drafts automatically synced up with server. You should see a new contact is created successfully with an associated account!
