import { LightningElement, track, wire } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import { graphql, gql } from "lightning/uiGraphQLApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ScanBarcodeLookup extends LightningElement {
  scanner;
  @track scannedBarcode = null;
  @track errorMessage = null;
  scanButtonDisabled = false;

  connectedCallback() {
    this.myScanner = getBarcodeScanner();
    if (this.myScanner == null || !this.myScanner.isAvailable()) {
      this.scanButtonDisabled = true;
    }
  }

  get productQuery() {
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

  // https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_graphql_relationships
  //
  // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-wire-adapter-of-resource-cannot-be-primed
  @wire(graphql, {
    query: "$productQuery",
    variables: "$graphqlVariables",
    operationName: "productBarcodeLookup",
  })
  graphqlResult({ data /* errors */ }) {
    console.log("data", data);
    if (data) {
      const { edges } = data.uiapi.query.Product2;
      const product = edges && edges[0];
      this.productId = product && product.node.Id;
    } else {
      this.productId = "";
    }
    if (!this.productId && this.scannedBarcode) {
      this.errorMessage = `Could not find product with code ${this.scannedBarcode}`;
    }
  }
  productId;

  get graphqlVariables() {
    return {
      upc: this.scannedBarcode,
    };
  }

  handleBeginScanClick(event) {
    this.scannedBarcode = "";

    if (this.myScanner != null && this.myScanner.isAvailable()) {
      const scanningOptions = {
        barcodeTypes: [this.myScanner.barcodeTypes.QR],
        instructionText: "Scan a QR Code",
        successText: "Scanning complete.",
      };
      this.myScanner
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

          if (error.code == "userDismissedScanner") {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Scanning Cancelled",
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
          console.log("#finally");

          this.myScanner.endCapture();
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
