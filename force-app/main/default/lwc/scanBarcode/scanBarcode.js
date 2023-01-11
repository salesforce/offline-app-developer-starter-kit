import { LightningElement, track } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";

export default class ScanBarcode extends LightningElement {
  scanner;
  @track scannedBarcode = null;
  @track errorCode = null;

  connectedCallback() {
    this.scanner = getBarcodeScanner();
    if (this.scanner == null || !this.scanner.isAvailable()) {
      console.warn("Scanner not initialized!");
    }
  }

  doScan() {
    if (this.scanner && this.scanner.isAvailable()) {
      console.log("starting scan...");
      const scanningOptions = {
        barcodeTypes: [
          this.scanner.barcodeTypes.EAN_8,
          this.scanner.barcodeTypes.EAN_13,
          this.scanner.barcodeTypes.UPC_A,
          this.scanner.barcodeTypes.UPC_E,
          this.scanner.barcodeTypes.QR,
        ],
        instructionText: "Scan a barcode",
        successText: "Scanning complete.",
        scannerSize: "XLARGE", // defines the scanner camera view size (e.g SMALL, MEDIUM, LARGE, XLARGE, FULLSCREEN)
        cameraFacing: "BACK", // defines which device camera to use (e.g FRONT, BACK)
        showSuccessCheckMark: true, // visually show a check mark in the scanner native UI after successfully scanning a barcode
        vibrateOnSuccess: true, // vibrate the device after successfully scanning a barcode
        manualConfirmation: false, // set to TRUE in order to wait for the user to manually confirm the selected barcode
        previewBarcodeData: true, // preview the barcode data in the scanner native UI
      };
      this.scanner
        .beginCapture(scanningOptions)
        .then((result) => {
          console.log("successfully scanned", result);
          this.errorCode = null;
          this.scannedBarcode = result.value;
        })
        .catch((error) => {
          console.error("scan error", error);
          console.error(this.errorCode);
          this.errorCode = error.code;
          console.error(this.errorCode);
          this.scannedBarcode = null;
        })
        .finally(() => {
          console.log("scan complete");

          // Clean up by ending capture,
          // whether we completed successfully or had an error
          this.scanner.endCapture();
        });
    } else {
      console.log("Scanner not initialized!");
      this.errorCode = "SCANNER_NOT_INITIALIZED";
      this.scannedBarcode = null;
    }
  }
}
