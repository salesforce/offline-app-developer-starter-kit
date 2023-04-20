import { createElement } from "lwc";
import ViewRecord from "c/viewRecord";
import { getRecord } from "lightning/uiRecordApi";

const mockGetRecord = require("./data/getRecord.json");

describe("c-view-record", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate record fields", () => {
    const element = createElement("c-view-record", {
      is: ViewRecord,
    });
    element.objectApiName = "objectApiName";
    document.body.appendChild(element);

    // Emit mock record into the wired field
    // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
    getRecord.emit(mockGetRecord);

    // Resolve a promise to wait for a re-render of the new content
    return Promise.resolve().then(() => {
      const objectField = element.shadowRoot.querySelector(
        'lightning-layout-item[data-id="objectApiNameId"]'
      );
      expect(objectField.textContent).toBe(element.objectApiName);

      const nameField = element.shadowRoot.querySelector(
        'lightning-layout-item[data-id="nameId"]'
      );
      expect(nameField.textContent).toBe(mockGetRecord.fields.Name.value);

      const iconField = element.shadowRoot.querySelector(
        'lightning-icon[data-id="iconId"]'
      );
      expect(iconField.iconName).toBe(
        "standard:" + element.objectApiName.toLowerCase()
      );

      // our sample data also has 2 draft edits (name and phone)
      const draftEdits = element.shadowRoot.querySelectorAll("li");
      expect(draftEdits[0].textContent).toBe("Name=Old Name");
      expect(draftEdits[1].textContent).toBe("Phone=+1-719-555-1212");
    });
  });
});
