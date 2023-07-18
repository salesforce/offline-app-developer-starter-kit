import { LightningElement, api } from "lwc";

export default class RecordHeader extends LightningElement {
  @api recordName;
  @api objectApiName;
  @api iconName;

  get cardIconName() {
    return `standard:${
      this.iconName
        ? this.iconName
        : this.objectApiName
        ? this.objectApiName.toLowerCase()
        : ""
    }`;
  }
}

