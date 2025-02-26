import { LightningElement, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphqlApi";

export default class KidsBook extends LightningElement {
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, { query: "$bookQuery", variables: {} })
  graphqlQueryResult({ error, data }) {
    if (data) {
      this.results = data.uiapi.query.Book__c.edges.map((edge) => edge.node);
    }
    this.errors = error;
  }

  get bookQuery() {
    return gql`
      query BookList {
        uiapi {
          query {
            Book__c {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Chapter1__c {
                    value
                  }

                  Chapter2__c {
                    value
                  }

                  Chapter3__c {
                    value
                  }

                  Chapter4__c {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;
  }
}
