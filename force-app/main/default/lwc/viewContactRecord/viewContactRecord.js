import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import NAME from "@salesforce/schema/Account.Name";
const fields = [NAME];

export default class ViewContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  @wire(getRecord, { recordId: "$recordId", fields })
  record;

  get cardIconName() {
    if (!this.objectApiName) return "standard:record";
    return `standard:${this.objectApiName.toLowerCase()}`;
  }

  get name() {
    return this.record &&
      this.record.data &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }
}
