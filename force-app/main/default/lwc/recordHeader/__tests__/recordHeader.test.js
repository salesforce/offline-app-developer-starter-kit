import { createElement } from "lwc";
import RecordHeader from "c/recordHeader";

describe("c-record-header", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", async () => {
    const element = createElement("c-record-header", {
      is: RecordHeader,
    });
    element.recordName = "recordName";
    element.objectApiName = "apiName";

    document.body.appendChild(element);

    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();
    const iconField = element.shadowRoot.querySelector(
      'lightning-icon[data-id="iconId"]'
    );
    expect(iconField.iconName).toBe(
      "standard:" + element.objectApiName.toLowerCase()
    );

    const nameField = element.shadowRoot.querySelector(
      'lightning-layout-item[data-id="nameId"]'
    );
    expect(nameField.textContent).toBe(element.recordName);

    const objectField = element.shadowRoot.querySelector(
      'lightning-layout-item[data-id="objectApiNameId"]'
    );
    expect(objectField.textContent).toBe(element.objectApiName);
  });
});
