# Related Records

[The LWC related records example](../force-app/main/default/lwc/accountRelatedContacts) demonstrates the capability to view related records, for example `Contacts`, from an object, for example `Account`, using GraphQL queries. When a user's mobile device is online and priming the briefcase, the related records are prefetched and stored in the cache and can be viewed in offline mode.

> **Note**
> There’s a known issue that [GraphQL query prefetches fail](https://issues.salesforce.com/issue/a028c00000xGGwEAAW/graphql-query-fails-prefetch-with-an-unknown-field-warning), and as a result the `accountRelatedContacts` LWC won’t work offline. In the meantime, see this [Knowledge Article](https://help.salesforce.com/s/articleView?language=en_US&id=000396405&type=1) for a resolution to this known issue. 

> **Update**
> As of Spring '24 release the issue has been addressed.

In this example, we perform a GraphQL query to fetch related `Contacts` from an `Account` record.

```js
  get accountQuery() {
    if (!this.recordId) return undefined;

    return gql`
      query accountWithChildContacts($recordId: ID) {
        uiapi {
          query {
            Account(where: { Id: { eq: $recordId } }) {
              edges {
                node {
                  Contacts {
                    edges {
                      node {
                        Id
                        Name {
                          value
                        }
                        Phone {
                          value
                        }
                        Email {
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  }
```

See the [Query Objects Examples](https://developer.salesforce.com/docs/platform/graphql/guide/query-record-examples.html) in the GraphQL API Developer Guide for more details on how to use GraphQL queries.

Depending on your use case, you can deploy the `accountRelatedContacts` LWC as a quick action by creating a new file within the `quickActions` folder that includes the following:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<QuickAction xmlns="http://soap.sforce.com/2006/04/metadata">
    <actionSubtype>ScreenAction</actionSubtype>
    <label>Related Contacts</label>
    <lightningWebComponent>accountRelatedContacts</lightningWebComponent>
    <optionsCreateFeedItem>false</optionsCreateFeedItem>
    <type>LightningWebComponent</type>
</QuickAction>
```

## Configure Related Records

1. [Configure your Offline Briefcase](../README.md#define-an-offline-briefcase) with the `Account` sObject.
2. Deploy the following LWCs to the org, which can also be added as quick actions to the sObjects:
    - `viewAccountRecord` (`Account.view`) and `viewContactRecord` (`Contact.view`)
    - `accountRelatedContacts`
        - If the `accountRelatedContacts` LWC is added as a quick action, you have to update the page layout to include it.
3. Log in to the Mobile Offline App, and wait for the briefcase priming to finish.
4. Navigate to the `Account` sObject in your briefcase, and Tap on a record that has related contacts.
5. Tap on the quick action, and you should see a list of related contacts.
6. Tap on an item on the list to view the `Contact` record.

