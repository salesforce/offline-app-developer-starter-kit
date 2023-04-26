import { createElement } from "lwc";
import CreateOpportunityRecord from "c/createOpportunityRecord";

import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";

describe("c-create-opportunity-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.restoreAllMocks();
  });

  it("should go back when clicking cancel button", () => {
    // setup
    const element = createElement("c-create-opportunity-record", {
      is: CreateOpportunityRecord,
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

  it("should populate correctly and have buttons, message, and input fields", () => {
    const OBJECT_API_NAME = "Opportunity";

    const INPUT_FIELDS = [
      OPPORTUNITY_NAME_FIELD,
      OPPORTUNITY_ACCOUNT_FIELD,
      OPPORTUNITY_CLOSE_DATE_FIELD,
      OPPORTUNITY_AMOUNT_FIELD,
      OPPORTUNITY_OWNER_FIELD,
    ];

    // setup
    const element = createElement("c-create-opportunity-record", {
      is: CreateOpportunityRecord,
    });
    document.body.appendChild(element);

    // test
    const form = element.shadowRoot.querySelector("lightning-record-edit-form");
    expect(form.recordId).toBeUndefined();
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
  });

  it("should go back after success", () => {
    // setup
    const element = createElement("c-create-opportunity-record", {
      is: CreateOpportunityRecord,
    });
    document.body.appendChild(element);

    const backSpy = jest.spyOn(window.history, "back");
    const form = element.shadowRoot.querySelector("lightning-record-edit-form");

    // test
    form.dispatchEvent(new CustomEvent("success"));

    return Promise.resolve().then(() => {
      expect(backSpy).toHaveBeenCalled();
    });
  });
});
