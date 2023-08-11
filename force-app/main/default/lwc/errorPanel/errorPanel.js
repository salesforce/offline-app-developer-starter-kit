import { LightningElement, api } from "lwc";
import { reduceErrors } from "c/ldsUtils";

export default class ErrorPanel extends LightningElement {
  /** Single or array of LDS errors */
  @api errors;

  /** Generic / user-friendly message */
  @api friendlyMessage = "An error occurred";

  viewDetails = false;

  get errorMessages() {
    // eslint-disable-next-line @salesforce/lwc-graph-analyzer/no-call-expression-references-unsupported-namespace
    return reduceErrors(this.errors);
  }

  handleShowDetailsClick() {
    this.viewDetails = !this.viewDetails;
  }
}
