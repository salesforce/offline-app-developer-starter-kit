import { LightningElement, api } from "lwc";
import { getLocationService } from "lightning/mobileCapabilities";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LocationService extends LightningElement {
  @api currentLocation;
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
          // iOS error message can contain unescaped double quotes. Replace them with single quote.
          const message = error.message.replace(/\"/g, "'");

          // Show error message in a toast
          this.dispatchEvent(
            new ShowToastEvent({
              message: `${message}`,
              variant: "error",
            })
          );

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
      // Let user know they need to use a mobile phone with a GPS
      this.dispatchEvent(
        new ShowToastEvent({
          message: "Make sure to use a device with GPS",
          variant: "error",
        })
      );
    }
  }
}
