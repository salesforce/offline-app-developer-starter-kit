import { LightningElement, api } from "lwc";

export default class RecordHeader extends LightningElement {
  @api recordName;
  @api objectApiName;

  // Optional property to set the icon name. Otherwise uses standard icon
  @api iconName;

  get cardIconName() {
    return `${
      this.iconName ? this.iconName : `standard:${
        this.objectApiName ? this.objectApiName.toLowerCase() : ""
      }`
    }`;
  }
}
