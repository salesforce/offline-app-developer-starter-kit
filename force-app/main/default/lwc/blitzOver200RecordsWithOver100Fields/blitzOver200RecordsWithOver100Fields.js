import {wire, LightningElement } from 'lwc';
import {gql, graphql} from 'lightning/uiGraphQLApi';

export default class BlitzOver200RecordsWithOver100Fields extends LightningElement {
      // graphql query fetch more than 200 records with more than 100 fields
      @wire(graphql, {
        query: gql`
            query OpportunityExample {
                uiapi {
                    query {
                        Opportunity(first: 201) {
                            edges {
                                node {
                                    Id
                                    Name {
                                        value
                                    }
                                    Field1 {
                                        value
                                    }
                                    Field2 {
                                        value
                                    }
                                    Field3 {
                                        value
                                    }
                                    Field4 {
                                        value
                                    }
                                    Field5 {
                                        value
                                    }
                                    Field6 {
                                        value
                                    }
                                    Field7 {
                                        value
                                    }
                                    Field8 {
                                        value
                                    }
                                    Field9 {
                                        value
                                    }
                                    Field10 {
                                        value
                                    }
                                    Field11 {
                                        value
                                    }
                                    Field12 {
                                        value
                                    }
                                    Field13 {
                                        value
                                    }
                                    Field14 {
                                        value
                                    }
                                    Field15 {
                                        value
                                    }
                                    Field16 {
                                        value
                                    }
                                    Field17 {
                                        value
                                    }
                                    Field18 {
                                        value
                                    }
                                    Field19 {
                                        value
                                    }
                                    Field20 {
                                        value
                                    }
                                    Field21 {
                                        value
                                    }
                                    Field22 {
                                        value
                                    }
                                    Field23 {
                                        value
                                    }
                                    Field24 {
                                        value
                                    }
                                    Field25 {
                                        value
                                    }
                                    Field26 {
                                        value
                                    }
                                    Field27 {
                                        value
                                    }
                                    Field28 {
                                        value
                                    }
                                    Field29 {
                                        value
                                    }
                                    Field30 {
                                        value
                                    }
                                    Field31 {
                                        value
                                    }
                                    Field32 {
                                        value
                                    }
                                    Field33 {
                                        value
                                    }
                                    Field34 {
                                        value
                                    }
                                    Field35 {
                                        value
                                    }
                                    Field36 {
                                        value
                                    }
                                    Field37 {
                                        value
                                    }
                                    Field38 {
                                        value
                                    }
                                    Field39 {
                                        value
                                    }
                                    Field40 {
                                        value
                                    }
                                    Field41 {
                                        value
                                    }
                                    Field42 {
                                        value
                                    }
                                    Field43 {
                                        value
                                    }
                                    Field44 {
                                        value
                                    }
                                    Field45 {
                                        value
                                    }
                                    Field46 {
                                        value
                                    }
                                    Field47 {
                                        value
                                    }
                                    Field48 {
                                        value
                                    }
                                    Field49 {
                                        value
                                    }
                                    Field50 {
                                        value
                                    }
                                    Field51 {
                                        value
                                    }
                                    Field52 {
                                        value
                                    }
                                    Field53 {
                                        value
                                    }
                                    Field54 {
                                        value
                                    }
                                    Field55 {
                                        value
                                    }
                                    Field56 {
                                        value
                                    }
                                    Field57 {
                                        value
                                    }
                                    Field58 {
                                        value
                                    }
                                    Field59 {
                                        value
                                    }
                                    Field60 {
                                        value
                                    }
                                    Field61 {
                                        value
                                    }
                                    Field62 {
                                        value
                                    }
                                    Field63 {
                                        value
                                    }
                                    Field64 {
                                        value
                                    }
                                    Field65 {
                                        value
                                    }
                                    Field66 {
                                        value
                                    }
                                    Field67 {
                                        value
                                    }
                                    Field68 {
                                        value
                                    }
                                    Field69 {
                                        value
                                    }
                                    Field70 {
                                        value
                                    }
                                    Field71 {
                                        value
                                    }
                                    Field72 {
                                        value
                                    }
                                    Field73 {
                                        value
                                    }
                                    Field74 {
                                        value
                                    }
                                    Field75 {
                                        value
                                    }
                                    Field76 {
                                        value
                                    }
                                    Field77 {
                                        value
                                    }
                                    Field78 {
                                        value
                                    }
                                    Field79 {
                                        value
                                    }
                                    Field80 {
                                        value
                                    }
                                    Field81 {
                                        value
                                    }
                                    Field82 {
                                        value
                                    }
                                    Field83 {
                                        value
                                    }
                                    Field84 {
                                        value
                                    }
                                    Field85 {
                                        value
                                    }
                                    Field86 {
                                        value
                                    }
                                    Field87 {
                                        value
                                    }
                                    Field88 {
                                        value
                                    }
                                    Field89 {
                                        value
                                    }
                                    Field90 {
                                        value
                                    }
                                    Field91 {
                                        value
                                    }
                                    Field92 {
                                        value
                                    }
                                    Field93 {
                                        value
                                    }
                                    Field94 {
                                        value
                                    }
                                    Field95 {
                                        value
                                    }
                                    Field96 {
                                        value
                                    }
                                    Field97 {
                                        value
                                    }
                                    Field98 {
                                        value
                                    }
                                    Field99 {
                                        value
                                    }
                                    Field100 {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    })
    onResult1() {
    }

    // graphql query fetch 200 records with 2 fields
    @wire(graphql, {
        query: gql`
            query OpportunityExample {
                uiapi {
                    query {
                        Opportunity(first: 200) {
                            edges {
                                node {
                                    Id
                                    Name {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
    })
    onResult2() {
    }
}