import { LightningElement, api } from 'lwc';
import { getLocationService } from "lightning/mobileCapabilities";

export default class GpsSample extends LightningElement {
    @api currentLocation;
    // Internal component state
    locationService;
   
    locationButtonDisabled = false;
    requestInProgress = false;
    fetchedOnce = false;
    buttonText = "Get Current Location";
    lastError = "";
    
    // When component is initialized, detect whether to enable Location button
    connectedCallback() {
        this.locationService = getLocationService();
        if (this.locationService == null || !this.locationService.isAvailable()) {
            this.locationButtonDisabled = true;
        }
    }

    handleGetCurrentLocationClick(event) {
        // Reset current location
        this.currentLocation = null;

        if(this.locationService != null && this.locationService.isAvailable()) {
            // After the first make the UI appearance different(remove instruction, change button text).
            this.fetchedOnce = true;

            // Configure options for location request
            const locationOptions = {
                enableHighAccuracy: true
            }

            // Show an "indeterminate progress" spinner before we start the request
            this.requestInProgress = true;
            this.lastError = "";
            
            // Make the request
            // Uses anonymous function to handle results or errors
            this.locationService
                .getCurrentPosition(locationOptions)
                .then((result)  => {
                    this.currentLocation = result;

                    // result is a Location object
                    console.log(JSON.stringify(result));
                })
                .catch((error) => {
                    this.lastError = JSON.stringify(error);

                    // Handle errors here
                    console.error(this.lastError);
                })
                .finally(() => {
                    console.log('#finally');
                    // Remove the spinner
                    this.requestInProgress = false;

                    // Change button text
                    this.buttonText = "Refetch location";
                });
        } else {
            // LocationService is not available
            // Not running on hardware with GPS, or some other context issue
            console.log('Get Location button should be disabled and unclickable.');
            console.log('Somehow it got clicked: ');
            console.log(event);

            // Let user know they need to use a mobile phone with a GPS
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'LocationService Is Not Available',
                    message: 'Make sure to use a mobile phone with a GPS',
                    variant: 'error'
                })
            );
        }
    }

    // Format LocationService result Location object as a simple string
    get currentLocationAsString() {
        return `Lat: ${this.currentLocation.coords.latitude}, Long: ${this.currentLocation.coords.longitude}`;
    }
}