import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

export default class EditAccountRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = NAME_FIELD;
  phoneField = PHONE_FIELD;
  websiteField = WEBSITE_FIELD;
  industryField = INDUSTRY_FIELD;
  typeField = TYPE_FIELD;

  @wire(getRecord, { recordId: "$recordId", fields: [NAME_FIELD] })
  record;

  get name() {
    return this.record &&
      this.record.data &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }

  onSuccess(event) {
    console.log("Updated account", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    window.history.back();
  }
}
