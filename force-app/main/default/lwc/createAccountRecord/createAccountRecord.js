import { LightningElement, api } from "lwc";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

export default class CreateAccountRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = NAME_FIELD;
  phoneField = PHONE_FIELD;
  websiteField = WEBSITE_FIELD;
  industryField = INDUSTRY_FIELD;
  typeField = TYPE_FIELD;

  name = "";
  phone = "";
  website = "";
  industry = "";
  type = "";

  onSuccess(event) {
    console.log("Created account", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    window.history.back();
  }
}
