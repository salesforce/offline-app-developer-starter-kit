# Custom Object

[The custom object example](../force-app/main/default/objects/StarterKitCustomObject__c) demonstrates the capability to work with custom objects in the Mobile Offline app. Like standard objects, users can view, create, and edit records of custom objects while their device is offline.

The following steps generally describe the setup of a custom object for use in offline scenarios. You can see a specific example of these steps in the "Configure" section below.
- Create a custom object and the associated fields needed for your use case.
- Configure and deploy Lightning web components and quick actions for the object.
- Add quick actions to the object layout.
- Add a custom tab on the object so that users can create object records on the browser.
- Add or update a permission set to give users read/edit permissions to the object and its fields.

> **Note**
> Permissions for newly created custom objects are disabled by default. Your org admin needs to enable the object and field permissions in permission sets for users to access the custom objects. 

## Configure Custom Object

In this example, a `StarterKitCustomObject` custom object is configured by deploying the relevant code artifacts to your org.

1. Deploy the following code artifacts for the `StarterKitCustomObject` object, in the order outlined below.

    ```sh
    # Create the StarterKitCustomObject object with 5 new fields
    sfdx force:source:deploy -p force-app/main/default/objects/StarterKitCustomObject__c

    # Add LWCs
    sfdx force:source:deploy -p force-app/main/default/lwc/viewStarterKitCustomObjectRecord
    sfdx force:source:deploy -p force-app/main/default/lwc/createStarterKitCustomObjectRecord
    sfdx force:source:deploy -p force-app/main/default/lwc/editStarterKitCustomObjectRecord

    # Add quick actions
    sfdx force:source:deploy -p force-app/main/default/quickActions/StarterKitCustomObject__c.view.quickAction-meta.xml
    sfdx force:source:deploy -p force-app/main/default/quickActions/StarterKitCustomObject__c.create.quickAction-meta.xml
    sfdx force:source:deploy -p force-app/main/default/quickActions/StarterKitCustomObject__c.edit.quickAction-meta.xml

    # Add quick actions to the StarterKitCustomObject Layout
    sfdx force:source:deploy -p "force-app/main/default/layouts/StarterKitCustomObject__c-StarterKitCustomObject Layout.layout-meta.xml"

    # Add the StarterKitCustomObjects tab for user to create records on the browser
    sfdx force:source:deploy -p force-app/main/default/tabs/StarterKitCustomObject__c.tab-meta.xml

    # Add the permission set "Offline Custom Objects" for accessing StarterKitCustomObject object
    sfdx force:source:deploy -p force-app/main/default/permissionsets/Offline_Custom_Objects.permissionset-meta.xml
    ``` 

2. In your org, an org admin should assign the permission set `Offline Custom Objects` to org users.

3. [Configure your Offline Briefcase](../README.md#define-an-offline-briefcase) to include the `StarterKitCustomObject` object. 
    - Make sure to create a few `StarterKitCustomObject` records to be included in the briefcase.

4. Log in to the Mobile Offline App. You should see the new `StarterKitCustomObject` object!
