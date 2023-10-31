# Custom Object

[The custom object example](../force-app/main/default/objects/Visit__c) demonstrates the capability to work with custom objects in mobile offline app. Like standard objects, user can view, create, and edit records of custom objects in offline.

The following steps are recommended for setting up a custom object.
- Create a custom object with designed fields.
- Deploy lightning web components and quick actions on the object.
- Add quick actions to the object layout.
- Add a custom tab on the object so that users can create object records on the browser.
- Add or update a permission set to give users read/edit permissions to the object and its fields.

> **Note**
> Permissions for newly created custom objects are disabled by default. Admin needs to enable the object and field permissions in permission sets for users to access the custom objects. 

In this example, a `Visit` custom object is configured by deploying the relevant code artifacts to your org.

## Configure Custom Object

1. Deploy the following code artifacts for the `Visit` object in order.

    ```sh
    # Create the Visit object with 5 new fields
    sfdx force:source:deploy -p force-app/main/default/objects/Visit__c

    # Add LWCs
    sfdx force:source:deploy -p force-app/main/default/lwc/viewVisitRecord
    sfdx force:source:deploy -p force-app/main/default/lwc/createVisitRecord
    sfdx force:source:deploy -p force-app/main/default/lwc/editVisitRecord

    # Add quick actions
    sfdx force:source:deploy -p force-app/main/default/quickActions/Visit__c.view.quickAction-meta.xml
    sfdx force:source:deploy -p force-app/main/default/quickActions/Visit__c.create.quickAction-meta.xml
    sfdx force:source:deploy -p force-app/main/default/quickActions/Visit__c.edit.quickAction-meta.xml

    # Add quick actions to the Visit Layout
    sfdx force:source:deploy -p "force-app/main/default/layouts/Visit__c-Visit Layout.layout-meta.xml"

    # Add the Visits tab for user to create records on the browser
    sfdx force:source:deploy -p force-app/main/default/tabs/Visit__c.tab-meta.xml

    # Add the permission set "Offline Custom Objects" for accessing Visit object
    sfdx force:source:deploy -p force-app/main/default/permissionsets/Offline_Custom_Objects.permissionset-meta.xml
    ``` 

2. Admin assigns the permission set "Offline Custom Objects" to org users.

3. [Configure your Offline Briefcase](../README.md#define-an-offline-briefcase) to include the `Visit` object. 
    - Make sure to create a few `Visit` records to be included in the briefcase.

4. Log in to the Mobile Offline App. You should see the new `Visit` object!
