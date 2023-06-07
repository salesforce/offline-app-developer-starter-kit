import { createElement } from "lwc";
import { graphql } from "lightning/uiGraphQLApi";
import AccountRelatedContacts from "c/accountRelatedContacts";

const mockGraphQL = require("./data/graphql.json");

describe("c-account-related-contacts", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.restoreAllMocks();
  });

  it("should populate correctly and have related contact info", async () => {
    // setup
    const element = createElement("c-account-related-contacts", {
      is: AccountRelatedContacts,
    });
    element.recordId = "0011700000pJRRSAA4";

    document.body.appendChild(element);

    graphql.emit(mockGraphQL);
    // Resolve a promise to wait for a re-render of the new content
    await Promise.resolve();

    // test
    const title = element.shadowRoot.querySelector("h3");
    expect(title.textContent).toBe("Marc Benioff");

    const details = element.shadowRoot.querySelectorAll("dd");
    expect(details[0].textContent).toBe("415-555-5555");
    expect(details[1].textContent).toBe("marc@salesforce.com");
  });
});
