import { createElement } from "lwc";
import FileUpload from "c/fileUpload";

describe("c-file-upload", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.clearAllMocks();
  });

  it("should show select files button", async () => {
    // setup
    const element = createElement("c-file-upload", {
      is: FileUpload,
    });
    document.body.appendChild(element);

    // test
    // verify select files button is shown
    const selectButton = element.shadowRoot.querySelector("lightning-input");
    expect(selectButton.label).toBe("Select file to upload");
    // verify upload button is not shown
    const uploadButton = element.shadowRoot.querySelector("button.slds-button");
    expect(uploadButton).toBeNull();
  });

  it("should show upload button upon selecting files", async () => {
    // setup
    const element = createElement("c-file-upload", {
      is: FileUpload,
    });
    document.body.appendChild(element);

    // mock the change event on file button
    const event = new CustomEvent("change", {
      detail: { files: [{ name: "file.jpg" }] },
    });
    element.shadowRoot.querySelector("lightning-input").dispatchEvent(event);
    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();

    // test
    // verify upload button is shown
    const uploadButton = element.shadowRoot.querySelector("button.slds-button");
    expect(uploadButton).not.toBeNull();
    // verify file name is shown correctly
    const title = element.shadowRoot.querySelectorAll("p")[1];
    expect(title.textContent).toBe("file.jpg");
  });
});
