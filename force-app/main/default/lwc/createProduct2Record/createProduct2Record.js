import { LightningElement, api, track } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from "@salesforce/schema/Product2.Name";
import PRODUCTCODE_FIELD from "@salesforce/schema/Product2.ProductCode";
import DESCRIPTION_FIELD from "@salesforce/schema/Product2.Description";
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
import ISACTIVE_FIELD from "@salesforce/schema/Product2.IsActive";

export default class CreateProduct2Record extends LightningElement {
  @api recordId;
  @api objectApiName;

  @track scannedBarcode = "";
  @track isScanning = false;
  @track scannerAvailable = false;

  barcodeScanner;

  connectedCallback() {
    this.barcodeScanner = getBarcodeScanner();
    this.scannerAvailable = this.barcodeScanner.isAvailable();
  }

  get nameField() {
    return NAME_FIELD;
  }

  get productCodeField() {
    return PRODUCTCODE_FIELD;
  }

  get descriptionField() {
    return DESCRIPTION_FIELD;
  }

  get familyField() {
    return FAMILY_FIELD;
  }

  get isActiveField() {
    return ISACTIVE_FIELD;
  }

  get initialValue() {
    return "";
  }

  get productCodeValue() {
    return this.scannedBarcode;
  }

  async handleScanBarcode() {
    if (!this.scannerAvailable) {
      this.showToast(
        "Error",
        "Barcode scanner is not available on this device",
        "error"
      );
      return;
    }

    try {
      this.isScanning = true;
      const scanOptions = {
        barcodeTypes: [
          this.barcodeScanner.barcodeTypes.EAN_13,
          this.barcodeScanner.barcodeTypes.EAN_8,
          this.barcodeScanner.barcodeTypes.UPC_A,
          this.barcodeScanner.barcodeTypes.UPC_E,
          this.barcodeScanner.barcodeTypes.CODE_128,
          this.barcodeScanner.barcodeTypes.CODE_39,
          this.barcodeScanner.barcodeTypes.QR,
        ],
        instructionText: "Scan the product barcode",
        successText: "Barcode scanned successfully!",
        showSuccessCheckMark: true,
      };

      const scannedBarcodes = await this.barcodeScanner.scan(scanOptions);

      if (scannedBarcodes && scannedBarcodes.length > 0) {
        this.scannedBarcode = scannedBarcodes[0].value;
        this.updateProductCodeField();
        this.showToast("Success", "Barcode scanned successfully", "success");
      }
    } catch (error) {
      console.error("Barcode scanning error:", error);
      this.showToast(
        "Error",
        "Failed to scan barcode: " + error.message,
        "error"
      );
    } finally {
      this.isScanning = false;
    }
  }

  updateProductCodeField() {
    const productCodeField = this.template.querySelector(
      '[data-field="productCode"]'
    );
    if (productCodeField) {
      productCodeField.value = this.scannedBarcode;
    }
  }

  onSuccess(event) {
    console.log("Created product", event.detail);
    this.showToast("Success", "Product created successfully", "success");
    this.dismiss(event);
  }

  onError(event) {
    console.error("Error creating product", event.detail);
    this.showToast("Error", "Failed to create product", "error");
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }
}
