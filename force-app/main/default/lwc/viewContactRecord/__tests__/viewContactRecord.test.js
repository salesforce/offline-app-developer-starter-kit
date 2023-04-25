import { createElement } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ViewContactRecord from "c/viewContactRecord";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";
import CONTACT_OWNER_FIELD from "@salesforce/schema/Contact.OwnerId";

const mockGetRecord = require("./data/getRecord.json");

describe("c-view-contact-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-view-contact-record", {
      is: ViewContactRecord,
    });
    element.recordId = "0031700000pJRRSAA4";
    element.objectApiName = "Contact";
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
      CONTACT_NAME_FIELD,
      CONTACT_TITLE_FIELD,
      CONTACT_ACCOUNT_FIELD,
      CONTACT_PHONE_FIELD,
      CONTACT_EMAIL_FIELD,
      CONTACT_MOBILE_FIELD,
      CONTACT_OWNER_FIELD,
    ]);

    // check draft list
    const draftEdits = element.shadowRoot.querySelector("c-draft-details-list");
    expect(draftEdits).not.toBeNull();
  });
});
