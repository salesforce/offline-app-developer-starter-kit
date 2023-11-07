import { createElement } from "lwc";
import CreateStarterKitCustomObjectRecord from "c/createStarterKitCustomObjectRecord";

import NAME_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Name";
import START_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Start_Time__c";
import END_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.End_Time__c";
import PRIORITY__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Priority__c";
import STATUS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Status__c";
import ADDRESS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Address__c";

describe("c-create-starter-kit-custom-object-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.restoreAllMocks();
  });

  it("should go back when clicking cancel button", () => {
    // setup
    const element = createElement("c-create-starter-kit-custom-object-record", {
      is: CreateStarterKitCustomObjectRecord,
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

  it("should populate correctly and have buttons, message, and input fields", () => {
    const OBJECT_API_NAME = "StarterKitCustomObject__c";

    const INPUT_FIELDS = [
      NAME_FIELD,
      START_TIME__C_FIELD,
      END_TIME__C_FIELD,
      PRIORITY__C_FIELD,
      STATUS__C_FIELD,
      ADDRESS__C_FIELD,
    ];

    // setup
    const element = createElement("c-create-starter-kit-custom-object-record", {
      is: CreateStarterKitCustomObjectRecord,
    });
    document.body.appendChild(element);

    // test
    const form = element.shadowRoot.querySelector("lightning-record-edit-form");
    expect(form.recordId).toBeUndefined();
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
  });

  it("should go back after success", () => {
    // setup
    const element = createElement("c-create-starter-kit-custom-object-record", {
      is: CreateStarterKitCustomObjectRecord,
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
