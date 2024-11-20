import { wire, LightningElement, track } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class BlitzOversizeRecord extends LightningElement {
  @track
  records;

  @track
  errors;

  @wire(graphql, { query: "$recordQuery" })
  runGraphQL({ data, errors }) {
    if (data) {
      this.records = data.uiapi.query.Book_c.edges.map((edge) => edge.node);
    }
    this.errors = errors;
  }

  get recordQuery() {
    return gql`
      query {
        uiapi {
          query {
            Book__c {
              edges {
                node {
                  Name {
                    value
                  }
                  Chapter1__c {
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

  getOversizedRecordQuery1() {
    return gql`
      query {
        uiapi {
          query {
            Book__c {
              edges {
                node {
                  Name {
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

  getOversizedRecordQuery2() {
    return gql`
      query {
        uiapi {
          query {
            Book__c {
              edges {
                node {
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
                }
              }
            }
          }
        }
      }
    `;
  }
}
