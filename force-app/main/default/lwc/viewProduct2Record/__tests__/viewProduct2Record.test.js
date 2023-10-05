import { createElement } from "lwc";
import ViewProduct2Record from "c/viewProduct2Record";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Product2.Name";
import PRODUCTCODE_FIELD from "@salesforce/schema/Product2.ProductCode";
import ISACTIVE_FIELD from "@salesforce/schema/Product2.IsActive";
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
import DESCRIPTION_FIELD from "@salesforce/schema/Product2.Description";

jest.mock("c/scanBarcodeLookUp");
const mockGetRecord = require("./data/getRecord.json");

describe("c-view-product2-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-view-product2-record", {
      is: ViewProduct2Record,
    });
    element.recordId = "0011700000pJRRSAA4";
    element.objectApiName = "Product2";
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
      PRODUCTCODE_FIELD,
      ISACTIVE_FIELD,
      FAMILY_FIELD,
      DESCRIPTION_FIELD,
    ]);

    // check draft list
    const draftEdits = element.shadowRoot.querySelector("c-draft-details-list");
    // Uncomment if using the c-draft-details-list component
    // expect(draftEdits).not.toBeNull();
  });
});
