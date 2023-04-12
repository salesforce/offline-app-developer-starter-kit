import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import NAME_FIELD from "@salesforce/schema/Contact.Name";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import MAILINGADDRESS_FIELD from "@salesforce/schema/Contact.MailingAddress";
import DEPARTMENT_FIELD from "@salesforce/schema/Contact.Department";

export default class ViewContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      NAME_FIELD,
      TITLE_FIELD,
      PHONE_FIELD,
      EMAIL_FIELD,
      MAILINGADDRESS_FIELD,
      DEPARTMENT_FIELD,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get cardIconName() {
    return `standard:${
      this.objectApiName ? this.objectApiName.toLowerCase() : "record"
    }`;
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
