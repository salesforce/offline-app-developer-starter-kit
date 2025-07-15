import { createElement } from "lwc";
import FieldTechnicianCheckIn from "c/fieldTechnicianCheckIn";
import {
  getBiometricsService,
  getLocationService,
} from "lightning/mobileCapabilities";

describe("c-field-technician-check-in", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file, so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it("renders biometric authentication step initially", () => {
    // Mock services
    const mockBiometricsService = {
      isAvailable: jest.fn().mockReturnValue(true),
      isBiometricsReady: jest.fn().mockResolvedValue(true),
      checkUserIsDeviceOwner: jest.fn().mockResolvedValue(true),
    };

    const mockLocationService = {
      isAvailable: jest.fn().mockReturnValue(true),
      getCurrentPosition: jest.fn().mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      }),
    };

    getBiometricsService.mockReturnValue(mockBiometricsService);
    getLocationService.mockReturnValue(mockLocationService);

    // Create component
    const element = createElement("c-field-technician-check-in", {
      is: FieldTechnicianCheckIn,
    });
    element.recordId = "08p000000000001";
    element.objectApiName = "ServiceAppointment";
    document.body.appendChild(element);

    // Verify biometric step is shown
    const biometricStep = element.shadowRoot.querySelector(
      '[data-id="biometric-step"]'
    );
    expect(biometricStep).toBeTruthy();

    const startButton = element.shadowRoot.querySelector(
      '[data-id="start-checkin-button"]'
    );
    expect(startButton).toBeTruthy();
  });

  it("shows error when biometric service is not available", () => {
    // Mock biometric service as unavailable
    const mockBiometricsService = {
      isAvailable: jest.fn().mockReturnValue(false),
    };

    getBiometricsService.mockReturnValue(mockBiometricsService);
    getLocationService.mockReturnValue(null);

    // Create component
    const element = createElement("c-field-technician-check-in", {
      is: FieldTechnicianCheckIn,
    });
    element.recordId = "08p000000000001";
    element.objectApiName = "ServiceAppointment";
    document.body.appendChild(element);

    // Verify error message is shown
    const errorMessage = element.shadowRoot.querySelector(
      '[data-id="error-message"]'
    );
    expect(errorMessage).toBeTruthy();
  });

  it("handles successful biometric authentication", async () => {
    // Mock services
    const mockBiometricsService = {
      isAvailable: jest.fn().mockReturnValue(true),
      isBiometricsReady: jest.fn().mockResolvedValue(true),
      checkUserIsDeviceOwner: jest.fn().mockResolvedValue(true),
    };

    const mockLocationService = {
      isAvailable: jest.fn().mockReturnValue(true),
    };

    getBiometricsService.mockReturnValue(mockBiometricsService);
    getLocationService.mockReturnValue(mockLocationService);

    // Create component
    const element = createElement("c-field-technician-check-in", {
      is: FieldTechnicianCheckIn,
    });
    element.recordId = "08p000000000001";
    element.objectApiName = "ServiceAppointment";
    document.body.appendChild(element);

    // Click start check-in button
    const startButton = element.shadowRoot.querySelector(
      '[data-id="start-checkin-button"]'
    );
    startButton.click();

    // Wait for promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify biometric service was called
    expect(mockBiometricsService.isBiometricsReady).toHaveBeenCalledWith({
      permissionRequestTitle: "Check-in Authentication",
      permissionRequestBody:
        "Please authenticate to complete your check-in process.",
      additionalSupportedPolicies: ["PIN_CODE"],
    });

    expect(mockBiometricsService.checkUserIsDeviceOwner).toHaveBeenCalledWith({
      permissionRequestTitle: "Check-in Authentication",
      permissionRequestBody:
        "Please authenticate to complete your check-in process.",
      additionalSupportedPolicies: ["PIN_CODE"],
    });
  });

  it("handles location service when available", async () => {
    // Mock services
    const mockBiometricsService = {
      isAvailable: jest.fn().mockReturnValue(true),
      isBiometricsReady: jest.fn().mockResolvedValue(true),
      checkUserIsDeviceOwner: jest.fn().mockResolvedValue(true),
    };

    const mockLocationService = {
      isAvailable: jest.fn().mockReturnValue(true),
      getCurrentPosition: jest.fn().mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      }),
    };

    getBiometricsService.mockReturnValue(mockBiometricsService);
    getLocationService.mockReturnValue(mockLocationService);

    // Create component
    const element = createElement("c-field-technician-check-in", {
      is: FieldTechnicianCheckIn,
    });
    element.recordId = "08p000000000001";
    element.objectApiName = "ServiceAppointment";
    document.body.appendChild(element);

    // Trigger biometric success to show location prompt
    await element.handleStartCheckIn();

    // Wait for DOM update
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify location service is available
    expect(mockLocationService.isAvailable).toHaveBeenCalled();
  });
});
