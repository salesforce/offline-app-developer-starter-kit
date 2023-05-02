import { createElement } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ViewOpportunityRecord from "c/viewOpportunityRecord";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";

const mockGetRecord = require("./data/getRecord.json");

describe("c-view-opportunity-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-view-contact-record", {
      is: ViewOpportunityRecord,
    });
    element.recordId = "0061700000pJRRSAA4";
    element.objectApiName = "Opportunity";
    document.body.appendChild(element);

    // Emit mock record into the wired field
    // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
    getRecord.emit(mockGetRecord);

    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();

    // ensure record header exists
    const recordHeader = element.shadowRoot.querySelector("c-record-header");
    expect(recordHeader).not.toBeNull();

    // ensure record form exists and was invoked with expected args
    const formEl = element.shadowRoot.querySelector("lightning-record-form");
    expect(formEl).not.toBeNull();
    expect(formEl.recordId).toBe(element.recordId);
    expect(formEl.objectApiName).toBe(element.objectApiName);
    expect(formEl.fields).toEqual([
      OPPORTUNITY_NAME_FIELD,
      OPPORTUNITY_ACCOUNT_FIELD,
      OPPORTUNITY_CLOSE_DATE_FIELD,
      OPPORTUNITY_AMOUNT_FIELD,
      OPPORTUNITY_OWNER_FIELD,
    ]);

    // check draft list
    const draftEdits = element.shadowRoot.querySelector("c-draft-details-list");
    expect(draftEdits).not.toBeNull();
  });
});
