import { createElement } from "lwc";
import DraftDetailsList from "c/draftDetailsList";
import { getRecord } from "lightning/uiRecordApi";

const mockGetRecord = require("./data/getRecord.json");

describe("c-draft-details-list", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should correctly populate draft list", async () => {
    const element = createElement("c-draft-details-list", {
      is: DraftDetailsList,
    });
    element.recordId = "abc123";
    element.fields = [];

    document.body.appendChild(element);

    // Emit mock record into the wired field
    // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
    getRecord.emit(mockGetRecord);

    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();
    // our sample data has 2 draft edits (name and phone)
    const draftEdits = element.shadowRoot.querySelectorAll("li");
    expect(draftEdits[0].textContent).toBe("Name=Old Name");
    expect(draftEdits[1].textContent).toBe("Phone=+1-719-555-1212");
  });
});
