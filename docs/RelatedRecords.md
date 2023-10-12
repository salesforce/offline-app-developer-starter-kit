# Related Records

[The related records starter kit example](../force-app/main/default/lwc/accountRelatedContacts) demonstrates the capability to view related records e.g. `Contacts` from an object e.g `Account` using GraphQL queries. When the device is online and while briefcase priming, the related records are prefetched and stored in the cache to be able to view in offline mode. There is currently a well known issue that [GraphQL query prefetch fails](https://issues.salesforce.com/issue/a028c00000xGGwEAAW/graphql-query-fails-prefetch-with-an-unknown-field-warning), and as a result, accountRelatedContacts LWC will not work offline. An expected fix will come in November 2023 and there is a workaround that can be implemented in this [Knowledge Article](https://help.salesforce.com/s/articleView?language=en_US&id=000396405&type=1).

In this example, we performed a GraphQL query to fetch related contacts from an account record.

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

See the [Query Objects Examples documentation](https://developer.salesforce.com/docs/platform/graphql/guide/query-record-examples.html) for more details on how to use GraphQL queries.

Depending on your use case, you can deploy the `accountRelatedContacts` LWC as a quick action by creating a new file within the `quickActions` folder that includes the following

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

## How to Configure

1. [Configure your Offline Briefcase](../README.md#define-an-offline-briefcase) with the `Account` sObject.
2. Deploy the following LWCs to the org, which can also be added as quick actions to the sObjects:
    - `viewAccountRecord` (`Account.view`) and `viewContactRecord` (`Contact.view`)
    - `accountRelatedContacts`
        - If the accountRelatedContacts LWC is added as a quick action, you will have to update the page layout to include it.
3. Login to the Mobile Offline App and wait for the briefcase priming to be finished.
4. Navigate to the `Account` sObject in your briefcase and click on a record that has related contacts.
5. Click on the quick action and you should be able to see a list of related contacts.
6. Click on an item on the list to view the `Contact` record.

