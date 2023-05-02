import { createElement } from "lwc";
import ViewAccountRecord from "c/viewAccountRecord";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

jest.mock("c/accountRelatedContacts");
const mockGetRecord = require("./data/getRecord.json");

describe("c-view-account-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-view-account-record", {
      is: ViewAccountRecord,
    });
    element.recordId = "0011700000pJRRSAA4";
    element.objectApiName = "Account";
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
      PHONE_FIELD,
      WEBSITE_FIELD,
      INDUSTRY_FIELD,
      TYPE_FIELD,
    ]);

    // check draft list
    const draftEdits = element.shadowRoot.querySelector("c-draft-details-list");
    expect(draftEdits).not.toBeNull();
  });
});
