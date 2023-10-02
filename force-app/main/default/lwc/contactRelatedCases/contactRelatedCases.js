import { LightningElement, api, wire } from "lwc";
import { graphql, gql } from "lightning/uiGraphQLApi";

// eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-unresolved-parent-class-reference
export default class ContactRelatedCases extends LightningElement {
  @api recordId;
  cases;

  get casesQuery() {
    if (!this.recordId) return undefined;

    return gql`
      query fetchCases($recordId: ID) {
        uiapi {
          query {
            Contact(where: { Id: { eq: $recordId } }) {
              edges {
                node {
                  Cases {
                    edges {
                      node {
                        Id
                        OwnerId {
                          value
                        }
                        CaseNumber {
                          value
                        }
                        Reason {
                          value
                        }
                        Subject {
                          value
                        }
                        Status {
                          value
                        }
                        Priority {
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
    query: "$casesQuery",
    variables: "$graphqlVariables",
    operationName: "fetchCases",
  })
  graphqlResult({ data, errors }) {
    console.log("data", data);
    console.log("errors", errors);

    this.cases = null;
    const contacts = data?.uiapi?.query?.Contact?.edges;
    if (contacts && contacts[0]) {
      this.cases = contacts[0].node.Cases.edges.map((e) => e.node);
    }
  }

  get graphqlVariables() {
    return {
      recordId: this.recordId,
    };
  }
}
