import { LightningElement, track, wire } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import { graphql, gql } from "lightning/uiGraphQLApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ScanBarcodeLookup extends LightningElement {
  scanner;
  @track scannedBarcode = null;
  @track errorMessage = null;
  scanButtonDisabled = false;
  productId;

  // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_graphql_relationships
  //
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, {
    query: "$productQuery",
    variables: "$graphqlVariables",
    operationName: "productBarcodeLookup",
  })
  graphqlResult({ data, errors }) {
    console.log("data", data);
    console.log("errors", errors);
    if (data) {
      // get the id from the first element if any
      this.productId = data?.uiapi?.query?.Product2?.edges?.shift()?.node?.Id;
    } else {
      this.productId = "";
    }
    if (!this.productId && this.scannedBarcode) {
      this.errorMessage = `Could not find a product with code ${this.scannedBarcode}`;
    }
  }

  connectedCallback() {
    this.scanner = getBarcodeScanner();
    if (!this.scanner?.isAvailable()) {
      this.scanButtonDisabled = true;
    }
  }

  get productQuery() {
    if (!this.scannedBarcode) return undefined;

    return gql`
      query productBarcodeLookup($upc: String) {
        uiapi {
          query {
            Product2(where: { ProductCode: { eq: $upc } }) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;
  }

  get graphqlVariables() {
    return {
      upc: this.scannedBarcode,
    };
  }

  handleBeginScanClick(event) {
    this.scannedBarcode = "";

    if (this.scanner?.isAvailable()) {
      const scanningOptions = {
        barcodeTypes: [this.scanner.barcodeTypes.EAN_13],
        instructionText: "Scan a UPC barcode",
        successText: "Scanning complete.",
      };
      this.scanner
        .beginCapture(scanningOptions)
        .then((result) => {
          console.log(result);

          this.scannedBarcode = result.value;
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Successful Scan",
              message: "Barcode scanned successfully.",
              variant: "success",
            })
          );
        })
        .catch((error) => {
          console.error(error);

          if (error.code === "USER_DISMISSED") {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Scanning Canceled",
                message: "Scanning canceled",
                mode: "sticky",
              })
            );
          } else {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Barcode Scanner Error",
                message: error.message,
                variant: "error",
                mode: "sticky",
              })
            );
          }
        })
        .finally(() => {
          console.log("scan complete");

          this.scanner.endCapture();
        });
    } else {
      console.log(event);

      this.dispatchEvent(
        new ShowToastEvent({
          title: "Barcode Scanner Is Not Available",
          message: "Failed to open barcode scanner",
          variant: "error",
        })
      );
    }
  }
}
