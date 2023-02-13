import { LightningElement, api, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";

import { graphql, gql } from "lightning/uiGraphQLApi";

export default class AccountRelatedContacts extends NavigationMixin(
  LightningElement
) {
  @api recordId;

  // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_graphql_relationships
  @wire(graphql, {
    query: gql`
      query accountWithChildContacts($recordId: ID) {
        uiapi {
          query {
            Account(where: { Id: { eq: $recordId } })
              @category(name: "recordQuery") {
              edges {
                node {
                  Contacts(first: 5) @category(name: "childRelationship") {
                    edges {
                      node {
                        Id
                        Name @category(name: "StringValue") {
                          value
                        }
                        Phone @category(name: "StringValue") {
                          value
                        }
                        Email @category(name: "StringValue") {
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
    `,
    variables: "$graphqlVariables",
    operationName: "accountWithChildContacts",
  })
  graphqlResult({ data /* errors */ }) {
    this.contactsData = data;
  }
  contactsData;

  get graphqlVariables() {
    return {
      recordId: this.recordId,
    };
  }

  get contacts() {
    if (!this.contactsData) return null;
    const accounts = this.contactsData.uiapi.query.Account.edges;
    if (!accounts || !accounts[0]) return null;
    const contacts = accounts[0].node.Contacts.edges.map((e) => e.node);
    return contacts;
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
