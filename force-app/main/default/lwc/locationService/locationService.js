import { LightningElement, track } from "lwc";
import { getLocationService } from "lightning/mobileCapabilities";

export default class LocationService extends LightningElement {
  @track errorMessage;
  @track currentLocation;
  currentLatitude;
  currentLongitude;

  locationService;
  locationButtonDisabled = false;
  requestInProgress = false;
  showInstruction = true;
  buttonInstruction = "Get Current Location";
  buttonText = this.buttonInstruction;
  interstitialMessage = "Fetching your current location...";

  // When the component is initialized, detect whether to enable the button
  connectedCallback() {
    this.locationService = getLocationService();
    if (this.locationService == null || !this.locationService.isAvailable()) {
      this.locationButtonDisabled = true;
    }
    this.locationButtonDisabled = false;
  }

  handleGetCurrentLocationClick(event) {
    if (this.locationService != null && this.locationService.isAvailable()) {
      // Reset current location
      this.currentLocation = null;
      this.currentLatitude = 0;
      this.currentLongitude = 0;

      this.errorMessage = null;

      // Configure options for location request
      const locationOptions = {
        enableHighAccuracy: true,
      };

      // Show an "indeterminate progress" spinner before we start the request
      this.requestInProgress = true;

      // Don't show instruction when the request is in flight
      this.showInstruction = false;

      // Make the request to get the location
      this.locationService
        .getCurrentPosition(locationOptions)
        .then((result) => {
          this.currentLocation = result;
          this.currentLatitude = this.currentLocation.coords.latitude;
          this.currentLongitude = this.currentLocation.coords.longitude;

          // Change the label on the button whenever a request succeeds
          this.buttonText = "Refetch location";
        })
        .catch((error) => {
          switch (error.code) {
            case "LOCATION_SERVICE_DISABLED":
              this.errorMessage = "Location service on the device is disabled."; // Android only
              break;
            case "USER_DENIED_PERMISSION":
              this.errorMessage =
                "User denied permission to use location service on the device.";
              break;
            case "USER_DISABLED_PERMISSION":
              this.errorMessage =
                "Toggle permission to use location service on the device from Settings.";
              break;
            case "SERVICE_NOT_ENABLED":
              this.errorMessage =
                "Location service on the device is not enabled.";
              break;
            case "UNKNOWN_REASON":
            default:
              // iOS error message can contain unescaped double quotes. Replace them with single quote.
              this.errorMessage = error.message.replace(/\"/g, "'");
              break;
          }

          // Show instruction again if the request didn't succeed
          this.showInstruction = true;

          // Show the instruction on the button again after an error
          this.buttonText = this.buttonInstruction;
        })
        .finally(() => {
          // Remove the spinner
          this.requestInProgress = false;
        });
    } else {
      this.errorMessage = "Nimbus location service is not available.";
    }
  }
}
