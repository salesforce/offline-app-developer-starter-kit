import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import { graphql, gql } from "lightning/uiGraphQLApi";

// eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unresolved-parent-class-reference
export default class AccountRelatedContacts extends NavigationMixin(
  LightningElement,
) {
  @api recordId;

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
    if (data && data.uiapi && data.uiapi.query && data.uiapi.query.Account) {
      const accounts = data.uiapi.query.Account.edges;
      if (accounts && accounts[0]) {
        this.contacts = accounts[0].node.Contacts.edges.map((e) => e.node);
      }
    }
  }
  contacts;

  get graphqlVariables() {
    return {
      recordId: this.recordId,
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
