import { createElement } from "lwc";
import { graphql } from "lightning/uiGraphQLApi";
import ContactRelatedCases from "c/contactRelatedCases";

const mockGraphQL = require("./data/graphql.json");
const mockGraphQLEmpty = require("./data/graphql-empty.json");

describe("c-contact-related-cases", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.restoreAllMocks();
  });

  it("should populate correctly and have related case info", async () => {
    // setup
    const element = createElement("c-contact-related-cases", {
      is: ContactRelatedCases,
    });
    element.recordId = "0011700000pJRRSAA4";

    document.body.appendChild(element);

    graphql.emit(mockGraphQL);
    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();

    // test
    const title = element.shadowRoot.querySelector("h3");

    // verify Subject
    expect(title.textContent).toBe("Test Case");

    const details = element.shadowRoot.querySelectorAll("dd");

    // verify OwnerId
    expect(details[0].textContent).toBe("DEF");
    // verify CaseNumber
    expect(details[1].textContent).toBe("123");
    // verify Status
    expect(details[2].textContent).toBe("New");
    // verify Priority
    expect(details[3].textContent).toBe("Low");
    // verify Reason
    expect(details[4].textContent).toBe("Complex functionality");
  });

  it("should handle an incomplete graphql response", async () => {
    // setup
    const element = createElement("c-contact-related-cases", {
      is: ContactRelatedCases,
    });
    element.recordId = "0011700000pJRRSAA4";

    document.body.appendChild(element);

    graphql.emit(mockGraphQLEmpty);
    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();

    // test
    const title = element.shadowRoot.querySelector("h3");
    expect(title).toBe(null);
  });
});
