import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import { graphql, gql } from "lightning/uiGraphQLApi";

// eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unresolved-parent-class-reference
export default class AccountRelatedContacts extends NavigationMixin(
  LightningElement,
) {
  @api recordId;

  /*
    There is a currently Known Issue {@link https://issues.salesforce.com/issue/a028c00000xGGwE/graphql-query-fails-prefetch-with-an-unknown-field-warning} with GraphQL wire adapters where this will cause the component to fail to load offline.   
    There is a workaround that can be implemented in this Knowledge Article {@link https://help.salesforce.com/s/articleView?language=en_US&id=000396405&type=1}.
  */
  get accountQuery() {
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

  // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_graphql_relationships
  //
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, {
    query: "$accountQuery",
    variables: "$graphqlVariables",
    operationName: "accountWithChildContacts",
  })
  graphqlResult({ data /* errors */ }) {
    this.contacts = null;
    const accounts = data?.uiapi?.query?.Account?.edges;
    if (accounts && accounts[0]) {
      this.contacts = accounts[0].node.Contacts.edges.map((e) => e.node);
    }
  }
  contacts;

  get graphqlVariables() {
    return {
      recordId: this.recordId || "",
    };
  }

  contactClick(event) {
    const { id } = event.currentTarget.dataset;
    this[NavigationMixin.Navigate]({
      type: "standard__quickAction",
      attributes: {
        actionName: "Contact.view",
      },
      state: {
        recordId: id,
        objectApiName: "Contact",
      },
    });
  }
}
