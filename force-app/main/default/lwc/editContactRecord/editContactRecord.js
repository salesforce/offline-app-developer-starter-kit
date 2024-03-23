import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";

export default class EditContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get nameField() {
    return CONTACT_NAME_FIELD;
  }

  get titleField() {
    return CONTACT_TITLE_FIELD;
  }

  get accountField() {
    return CONTACT_ACCOUNT_FIELD;
  }

  get phoneField() {
    return CONTACT_PHONE_FIELD;
  }

  get emailField() {
    return CONTACT_EMAIL_FIELD;
  }

  get mobileField() {
    return CONTACT_MOBILE_FIELD;
  }

  @wire(getRecord, { recordId: "$recordId", fields: [CONTACT_NAME_FIELD] })
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
    console.log("Updated contact", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // TODO: Can we use window.history.back() here?
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }
}
