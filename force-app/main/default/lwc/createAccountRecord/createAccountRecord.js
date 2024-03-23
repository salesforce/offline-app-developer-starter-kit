import { LightningElement, api } from "lwc";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

export default class CreateAccountRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get nameField() {
    return NAME_FIELD;
  }

  get phoneField() {
    return PHONE_FIELD;
  }

  get websiteField() {
    return WEBSITE_FIELD;
  }

  get industryField() {
    return INDUSTRY_FIELD;
  }

  get typeField() {
    return TYPE_FIELD;
  }

  get initialValue() {
    return "";
  }

  onSuccess(event) {
    console.log("Created account", event.detail);
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
