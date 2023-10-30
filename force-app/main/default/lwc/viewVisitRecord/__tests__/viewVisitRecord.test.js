import { createElement } from "lwc";
import ViewVisitRecord from "c/viewVisitRecord";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Visit__c.Name";
import START_TIME__C_FIELD from "@salesforce/schema/Visit__c.Start_Time__c";
import END_TIME__C_FIELD from "@salesforce/schema/Visit__c.End_Time__c";
import PRIORITY__C_FIELD from "@salesforce/schema/Visit__c.Priority__c";
import STATUS__C_FIELD from "@salesforce/schema/Visit__c.Status__c";
import ADDRESS__C_FIELD from "@salesforce/schema/Visit__c.Address__c";

const mockGetRecord = require("./data/getRecord.json");

describe("c-view-visit-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-view-visit-record", {
      is: ViewVisitRecord,
    });
    element.recordId = "0011700000pJRRSAA4";
    element.objectApiName = "Visit";
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
      NAME_FIELD,
      START_TIME__C_FIELD,
      END_TIME__C_FIELD,
      PRIORITY__C_FIELD,
      STATUS__C_FIELD,
      ADDRESS__C_FIELD,
    ]);

    // check draft list
    // Uncomment if using the c-draft-details-list component
    // const draftEdits = element.shadowRoot.querySelector("c-draft-details-list");
    // expect(draftEdits).not.toBeNull();
  });
});
