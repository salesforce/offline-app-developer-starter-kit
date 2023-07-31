import { LightningElement, api } from "lwc";

export default class RecordHeader extends LightningElement {
  @api recordName;
  @api objectApiName;

  // Optional property to set the icon location. Defaults to "standard"
  @api iconLocation;

  get cardIconName() {
    return `${this.iconLocation ? this.iconLocation : "standard"}:${
      this.objectApiName ? this.objectApiName.toLowerCase() : ""
    }`;
  }
}
