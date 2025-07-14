import { createElement } from "lwc";
import CreateProduct2Record from "c/createProduct2Record";

import NAME_FIELD from "@salesforce/schema/Product2.Name";
import PRODUCTCODE_FIELD from "@salesforce/schema/Product2.ProductCode";
import DESCRIPTION_FIELD from "@salesforce/schema/Product2.Description";
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
import ISACTIVE_FIELD from "@salesforce/schema/Product2.IsActive";

// Mock the barcode scanner
jest.mock("lightning/mobileCapabilities", () => ({
  getBarcodeScanner: jest.fn(() => ({
    isAvailable: jest.fn(() => true),
    scan: jest.fn(() =>
      Promise.resolve([{ value: "123456789012", type: "ean13" }])
    ),
    barcodeTypes: {
      EAN_13: "ean13",
      EAN_8: "ean8",
      UPC_A: "upca",
      UPC_E: "upce",
      CODE_128: "code128",
      CODE_39: "code39",
      QR: "qr",
    },
  })),
}));

describe("c-create-product2-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.restoreAllMocks();
  });

  it("should render correctly with barcode scanner available", () => {
    const element = createElement("c-create-product2-record", {
      is: CreateProduct2Record,
    });
    document.body.appendChild(element);

    // Check if barcode scanner section is rendered
    const scannerSection = element.shadowRoot.querySelector(
      ".barcode-scanner-section"
    );
    expect(scannerSection).not.toBeNull();

    // Check if scan button is present
    const scanButton = element.shadowRoot.querySelector(
      "lightning-button[label='Scan Barcode']"
    );
    expect(scanButton).not.toBeNull();
    expect(scanButton.disabled).toBe(false);
  });

  it("should populate form with correct fields", () => {
    const element = createElement("c-create-product2-record", {
      is: CreateProduct2Record,
    });
    document.body.appendChild(element);

    // Check if form is rendered
    const form = element.shadowRoot.querySelector("lightning-record-edit-form");
    expect(form).not.toBeNull();
    expect(form.objectApiName).toBe("Product2");

    // Check if all required input fields are present
    const inputFields = element.shadowRoot.querySelectorAll(
      "lightning-input-field"
    );
    expect(inputFields.length).toBe(5); // Name, ProductCode, Description, Family, IsActive

    // Check if cancel and submit buttons are present
    const cancelButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="cancel"]'
    );
    const submitButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="submit"]'
    );
    expect(cancelButton).not.toBeNull();
    expect(submitButton).not.toBeNull();
    expect(submitButton.type).toBe("submit");
  });

  it("should go back when clicking cancel button", () => {
    const element = createElement("c-create-product2-record", {
      is: CreateProduct2Record,
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
    const element = createElement("c-create-product2-record", {
      is: CreateProduct2Record,
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
