import { LightningElement, api } from "lwc";
import { reduceErrors } from "c/ldsUtils";
import inlineMessage from "./templates/inlineMessage.html";

export default class ErrorPanel extends LightningElement {
  /** Single or array of LDS errors */
  @api errors;

  /** Generic / user-friendly message */
  @api friendlyMessage = "An error occurred";

  viewDetails = false;

  get errorMessages() {
    return reduceErrors(this.errors);
  }

  handleShowDetailsClick() {
    this.viewDetails = !this.viewDetails;
  }

  render() {
    return inlineMessage;
  }
}
