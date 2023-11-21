import { createElement } from "lwc";
import LocationService from "c/locationService";
import { getLocationService } from "lightning/mobileCapabilities";
import process from "node:process";

describe("c-location-service", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so, reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.clearAllMocks();
  });

  it("should fetch GPS location coordinate", async () => {
    // setup
    const mockLocationService = getLocationService();
    const element = createElement("c-location-service", {
      is: LocationService,
    });
    document.body.appendChild(element);

    // test
    let getCurrentPositionButton =
      element.shadowRoot.querySelector("lightning-button");
    getCurrentPositionButton.click();

    // necessary to wait for finally block to be invoked and dom to be updated
    await new Promise(process.nextTick);

    expect(mockLocationService.getCurrentPosition).toHaveBeenCalledTimes(1);

    // check to ensure the template was updated with the expected latitude and longitude
    const currentLatitude = element.shadowRoot.querySelector(
      'slot[name="latitude"]',
    );
    const currentLongitude = element.shadowRoot.querySelector(
      'slot[name="longitude"]',
    );

    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(currentLatitude.innerHTML).toBe("111.11");

    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(currentLongitude.innerHTML).toBe("99.99");
  });

  it("should error when location service can't fetch position", async () => {
    // setup
    let mockLocationService = getLocationService();
    mockLocationService.getCurrentPosition = jest.fn(() =>
      Promise.reject({ code: "some-error", message: "some error occured!" }),
    );
    const element = createElement("c-location-service", {
      is: LocationService,
    });
    document.body.appendChild(element);

    // test
    const getCurrentPositionButton =
      element.shadowRoot.querySelector("lightning-button");
    getCurrentPositionButton.click();

    // necessary to wait for finally block to be invoked and dom to be updated
    await new Promise(process.nextTick);

    expect(mockLocationService.getCurrentPosition).toHaveBeenCalledTimes(1);

    // check to ensure the template was updated with the error code
    const errorMessage = element.shadowRoot.querySelector(
      'span[data-id="error"]',
    );
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errorMessage.innerHTML).toBe("some error occured!");

    const fetchedPosition = element.shadowRoot.querySelector(
      'span[data-id="result"]',
    );
    expect(fetchedPosition).toBe(null); // should not even be visible in the dom
  });

  it("should error when Nimbus location service can't be found after it was initially detected", async () => {
    // setup
    let mockLocationService = getLocationService();
    mockLocationService.isAvailable = jest.fn().mockResolvedValueOnce(true);
    mockLocationService.isAvailable = jest.fn().mockResolvedValueOnce(false);

    const element = createElement("c-location-service", {
      is: LocationService,
    });
    document.body.appendChild(element);

    // test
    const getCurrentPositionButton =
      element.shadowRoot.querySelector("lightning-button");
    getCurrentPositionButton.click();

    // necessary to wait for finally block to be invoked and dom to be updated
    await new Promise(process.nextTick);

    expect(mockLocationService.getCurrentPosition).toHaveBeenCalledTimes(0);

    // check to ensure the template was updated with the error code
    const errorMessage = element.shadowRoot.querySelector(
      'span[data-id="error"]',
    );
    // eslint-disable-next-line @lwc/lwc/no-inner-html
    expect(errorMessage.innerHTML).toBe(
      "Nimbus location service is not available.",
    );

    const fetchedPosition = element.shadowRoot.querySelector(
      'span[data-id="result"]',
    );
    expect(fetchedPosition).toBe(null); // should not even be visible in the dom
  });
});
