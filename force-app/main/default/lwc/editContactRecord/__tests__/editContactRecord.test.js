import { createElement } from "lwc";
import EditContactRecord from "c/editContactRecord";
import { getRecord } from "lightning/uiRecordApi";

import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";

const mockRecord = require("./data/getRecord.json");

describe("c-edit-contact-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate form and name field", () => {
    const RECORD_ID = "003abcdefghijklmno";
    const OBJECT_API_NAME = "Contact";

    const element = createElement("c-edit-contact-record", {
      is: EditContactRecord,
    });
    element.recordId = RECORD_ID;
    element.objectApiName = OBJECT_API_NAME;
    document.body.appendChild(element);

    // Emit mock record into the wired field - we have to do this after inserting into DOM
    // for the component to receive updates. We will need to use a promise next to wait for
    // DOM to re-render
    // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
    getRecord.emit(mockRecord);

    // let's ensure that the form is as expected
    const INPUT_FIELDS = [
      CONTACT_NAME_FIELD,
      CONTACT_TITLE_FIELD,
      CONTACT_ACCOUNT_FIELD,
      CONTACT_PHONE_FIELD,
      CONTACT_EMAIL_FIELD,
      CONTACT_MOBILE_FIELD,
    ];

    const form = element.shadowRoot.querySelector("lightning-record-edit-form");
    expect(form.recordId).toBe(RECORD_ID);
    expect(form.objectApiName).toBe(OBJECT_API_NAME);

    const submitButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="submit"]'
    );
    expect(submitButton.type).toBe("submit");

    const cancelButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="cancel"]'
    );
    expect(cancelButton.type).toBe("button");

    const message = element.shadowRoot.querySelector("lightning-messages");
    expect(message).not.toBeNull();

    // get the input fields and ensure they are in the correct order
    const outputFieldNames = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input-field")
    ).map((outputField) => outputField.fieldName);
    expect(outputFieldNames).toEqual(INPUT_FIELDS);

    // Resolve a promise to wait for a re-render of the new content to include the name value
    // that is built after the @wire executes.
    return Promise.resolve().then(() => {
      const displayName = element.shadowRoot.querySelector(
        'lightning-layout-item[data-id="name"]'
      );

      const mockedName = mockRecord.fields.Name.value;

      // eslint-disable-next-line @lwc/lwc/no-inner-html
      expect(displayName.innerHTML).toContain(mockedName);
    });
  });

  it("should go back when clicking cancel button", () => {
    const element = createElement("c-edit-contact-record", {
      is: EditContactRecord,
    });
    document.body.appendChild(element);

    // use a spy to ensure we called back()
    const backSpy = jest.spyOn(window.history, "back");

    const cancelButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="cancel"]'
    );
    cancelButton.click();

    expect(backSpy).toHaveBeenCalled();
  });

  it("should go back after success", () => {
    const element = createElement("c-edit-contact-record", {
      is: EditContactRecord,
    });
    document.body.appendChild(element);

    const backSpy = jest.spyOn(window.history, "back");
    const form = element.shadowRoot.querySelector("lightning-record-edit-form");

    form.dispatchEvent(new CustomEvent("success"));

    return Promise.resolve().then(() => {
      expect(backSpy).toHaveBeenCalled();
    });
  });
});
