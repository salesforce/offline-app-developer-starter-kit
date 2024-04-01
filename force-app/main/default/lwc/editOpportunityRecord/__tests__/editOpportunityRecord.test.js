import { createElement } from "lwc";
import EditOpportunityRecord from "c/editOpportunityRecord";
import { getRecord } from "lightning/uiRecordApi";

import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_STAGENAME_FIELD from "@salesforce/schema/Opportunity.StageName";

const mockRecord = require("./data/getRecord.json");

describe("c-edit-opportunity-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate form and name field", () => {
    const RECORD_ID = "006abcdefghijklmno";
    const OBJECT_API_NAME = "Opportunity";

    const element = createElement("c-edit-opportunity-record", {
      is: EditOpportunityRecord,
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
      OPPORTUNITY_NAME_FIELD,
      OPPORTUNITY_ACCOUNT_FIELD,
      OPPORTUNITY_CLOSE_DATE_FIELD,
      OPPORTUNITY_AMOUNT_FIELD,
      OPPORTUNITY_STAGENAME_FIELD,
    ];

    const form = element.shadowRoot.querySelector("lightning-record-edit-form");
    expect(form.recordId).toBe(RECORD_ID);
    expect(form.objectApiName).toBe(OBJECT_API_NAME);

    const submitButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="submit"]',
    );
    expect(submitButton.type).toBe("submit");

    const cancelButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="cancel"]',
    );
    expect(cancelButton.type).toBe("button");

    const message = element.shadowRoot.querySelector("lightning-messages");
    expect(message).not.toBeNull();

    // get the input fields and ensure they are in the correct order
    const outputFieldNames = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input-field"),
    ).map((outputField) => outputField.fieldName);
    expect(outputFieldNames).toEqual(INPUT_FIELDS);

    // Resolve a promise to wait for a re-render of the new content to include the name value
    // that is built after the @wire executes.
    return Promise.resolve().then(() => {
      const displayName = element.shadowRoot.querySelector(
        'lightning-layout-item[data-id="name"]',
      );

      const mockedName = mockRecord.fields.Name.value;

      // eslint-disable-next-line @lwc/lwc/no-inner-html
      expect(displayName.innerHTML).toContain(mockedName);
    });
  });

  it("should go back when clicking cancel button", () => {
    const element = createElement("c-edit-opportunity-record", {
      is: EditOpportunityRecord,
    });
    document.body.appendChild(element);

    // use a spy to ensure we called back()
    const backSpy = jest.spyOn(window.history, "back");

    const cancelButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="cancel"]',
    );
    cancelButton.click();

    expect(backSpy).toHaveBeenCalled();
  });

  it("should go back after success", () => {
    const element = createElement("c-edit-opportunity-record", {
      is: EditOpportunityRecord,
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
