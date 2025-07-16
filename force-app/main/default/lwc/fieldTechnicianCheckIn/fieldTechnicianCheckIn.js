import { LightningElement, api, track } from "lwc";
import {
  getBiometricsService,
  getLocationService,
} from "lightning/mobileCapabilities";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { updateRecord } from "lightning/uiRecordApi";

// ServiceAppointment fields
import SERVICE_APPOINTMENT_GEOLOCATION_LATITUDE_FIELD from "@salesforce/schema/ServiceAppointment.geolocation__Latitude__s";
import SERVICE_APPOINTMENT_GEOLOCATION_LONGITUDE_FIELD from "@salesforce/schema/ServiceAppointment.geolocation__Longitude__s";
import SERVICE_APPOINTMENT_STATUS_FIELD from "@salesforce/schema/ServiceAppointment.Status";
import SERVICE_APPOINTMENT_ACTUAL_START_TIME_FIELD from "@salesforce/schema/ServiceAppointment.ActualStartTime";

export default class FieldTechnicianCheckIn extends LightningElement {
  @api recordId = "08pKS0000008YzGYAU";
  @api objectApiName;

  @track biometricsService;
  @track locationService;
  @track isProcessing = false;
  @track checkInStep = "biometric"; // 'biometric', 'location', 'completed'
  @track errorMessage = "";
  @track currentLatitude;
  @track currentLongitude;
  @track showLocationPrompt = false;
  @track biometricVerified = false;
  @track locationUpdateEnabled = false;

  connectedCallback() {
    this.initializeServices();
  }

  initializeServices() {
    this.biometricsService = getBiometricsService();
    this.locationService = getLocationService();

    // Check if services are available
    if (!this.biometricsService || !this.biometricsService.isAvailable()) {
      this.errorMessage =
        "Biometric authentication is not available on this device.";
      return;
    }

    if (!this.locationService || !this.locationService.isAvailable()) {
      this.locationUpdateEnabled = false;
    } else {
      this.locationUpdateEnabled = true;
    }
  }

  async handleStartCheckIn() {
    if (!this.biometricsService || !this.biometricsService.isAvailable()) {
      this.showErrorToast(
        "Biometric authentication is not available on this device."
      );
      return;
    }

    try {
      this.isProcessing = true;
      this.errorMessage = "";

      // Check if biometrics is ready
      const biometricsReady = await this.biometricsService.isBiometricsReady({
        permissionRequestTitle: "Check-in Authentication",
        permissionRequestBody:
          "Please authenticate to complete your check-in process.",
        additionalSupportedPolicies: ["PIN_CODE"],
      });

      if (!biometricsReady) {
        this.showErrorToast(
          "Biometric authentication is not set up on this device."
        );
        return;
      }

      // Perform biometric verification
      const isAuthenticated =
        await this.biometricsService.checkUserIsDeviceOwner({
          permissionRequestTitle: "Check-in Authentication",
          permissionRequestBody:
            "Please authenticate to complete your check-in process.",
          additionalSupportedPolicies: ["PIN_CODE"],
        });

      if (isAuthenticated) {
        this.biometricVerified = true;
        this.checkInStep = "location";
        this.showSuccessToast("Biometric verification successful!");

        // Show location prompt if location service is available
        if (this.locationUpdateEnabled) {
          this.showLocationPrompt = true;
        } else {
          // If location not available, proceed with check-in without location
          await this.completeCheckIn();
        }
      } else {
        this.showErrorToast("Biometric verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      this.handleBiometricError(error);
    } finally {
      this.isProcessing = false;
    }
  }

  async handleLocationUpdate() {
    if (!this.locationService || !this.locationService.isAvailable()) {
      this.showErrorToast("Location service is not available on this device.");
      return;
    }

    try {
      this.isProcessing = true;
      this.errorMessage = "";

      const locationOptions = {
        enableHighAccuracy: true,
        permissionRationaleText:
          "Location access is required to update your service appointment location.",
      };

      const result =
        await this.locationService.getCurrentPosition(locationOptions);

      this.currentLatitude = result.coords.latitude;
      this.currentLongitude = result.coords.longitude;

      await this.completeCheckIn(true);
    } catch (error) {
      console.error("Location service error:", error);
      this.handleLocationError(error);
      // Still complete check-in without location update
      await this.completeCheckIn(false);
    } finally {
      this.isProcessing = false;
    }
  }

  async handleSkipLocation() {
    await this.completeCheckIn(false);
  }

  async completeCheckIn(updateLocation = false) {
    try {
      this.isProcessing = true;

      const fields = {
        Id: this.recordId,
        [SERVICE_APPOINTMENT_STATUS_FIELD.fieldApiName]: "In Progress",
        [SERVICE_APPOINTMENT_ACTUAL_START_TIME_FIELD.fieldApiName]:
          new Date().toISOString(),
      };

      // Add location fields if location update is requested and available
      if (updateLocation && this.currentLatitude && this.currentLongitude) {
        fields[SERVICE_APPOINTMENT_GEOLOCATION_LATITUDE_FIELD.fieldApiName] =
          this.currentLatitude;
        fields[SERVICE_APPOINTMENT_GEOLOCATION_LONGITUDE_FIELD.fieldApiName] =
          this.currentLongitude;
      }

      await updateRecord({ fields });

      this.checkInStep = "completed";
      this.showLocationPrompt = false;

      const message =
        updateLocation && this.currentLatitude && this.currentLongitude
          ? "Check-in completed successfully with location update!"
          : "Check-in completed successfully!";

      this.showSuccessToast(message);

      // Navigate back after a short delay
      setTimeout(() => {
        this.handleDismiss();
      }, 2000);
    } catch (error) {
      console.error("Check-in completion error:", error);
      this.showErrorToast("Failed to complete check-in. Please try again.");
    } finally {
      this.isProcessing = false;
    }
  }

  handleBiometricError(error) {
    switch (error.code) {
      case "HARDWARE_NOT_AVAILABLE":
        this.errorMessage =
          "Biometric hardware is not available on this device.";
        break;
      case "NOT_CONFIGURED":
        this.errorMessage =
          "Biometric authentication is not set up on this device.";
        break;
      case "SERVICE_NOT_ENABLED":
        this.errorMessage = "Biometric service is not enabled.";
        break;
      default:
        this.errorMessage =
          error.message || "An error occurred during biometric verification.";
        break;
    }
    this.showErrorToast(this.errorMessage);
  }

  handleLocationError(error) {
    let errorMessage = "";
    switch (error.code) {
      case "LOCATION_SERVICE_DISABLED":
        errorMessage = "Location service is disabled on this device.";
        break;
      case "USER_DENIED_PERMISSION":
        errorMessage =
          "Location permission was denied. You can enable it in settings.";
        break;
      case "USER_DISABLED_PERMISSION":
        errorMessage =
          "Location permission is disabled. Please enable it in device settings.";
        break;
      case "SERVICE_NOT_ENABLED":
        errorMessage = "Location service is not enabled.";
        break;
      default:
        errorMessage =
          error.message || "An error occurred while getting your location.";
        break;
    }
    this.showErrorToast(errorMessage);
  }

  showSuccessToast(message) {
    const event = new ShowToastEvent({
      title: "Success",
      message: message,
      variant: "success",
    });
    this.dispatchEvent(event);
  }

  showErrorToast(message) {
    const event = new ShowToastEvent({
      title: "Error",
      message: message,
      variant: "error",
    });
    this.dispatchEvent(event);
  }

  handleDismiss() {
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }

  get isBiometricStep() {
    return this.checkInStep === "biometric";
  }

  get isLocationStep() {
    return this.checkInStep === "location";
  }

  get isCompleted() {
    return this.checkInStep === "completed";
  }

  get canStartCheckIn() {
    return (
      !this.isProcessing &&
      this.biometricsService &&
      this.biometricsService.isAvailable()
    );
  }

  get showLocationOptions() {
    return (
      this.biometricVerified &&
      this.showLocationPrompt &&
      this.locationUpdateEnabled
    );
  }
}
