import { LightningElement, api } from "lwc";

export default class RecordHeader extends LightningElement {
  @api recordName;
  @api objectApiName;

  get cardIconName() {
    return `standard:${
      this.objectApiName ? this.objectApiName.toLowerCase() : ""
    }`;
  }
}
