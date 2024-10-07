import { LightningElement, api } from "lwc";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";
import CONTACT_OWNER_FIELD from "@salesforce/schema/Contact.OwnerId";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";

export default class CreateContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get nameField() {
    return CONTACT_NAME_FIELD;
  }
  get titleField() {
    return CONTACT_TITLE_FIELD;
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

  get ownerField() {
    return CONTACT_OWNER_FIELD;
  }

  get accountField() {
    return CONTACT_ACCOUNT_FIELD;
  }

  get initialValue() {
    return "";
  }

  selectedId;

  handleChange(event) {
    // capture the selected accountId from the lookup field
    this.selectedId = event.detail.recordId;
    console.log("You selected an account: " + this.selectedId);
  }

  onSubmit(event) {
    // stop the form from submitting; add selectedId to the form fields
    event.preventDefault();
    const fields = event.detail.fields;
    if (this.selectedId) {
      fields[this.accountField.fieldApiName] = this.selectedId;
    }

    // submit the form with the updated fields
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  onSuccess(event) {
    console.log("Created a contact", event.detail);
    // Dismiss modal on success
    this.dismiss(event);
  }

  onError(event) {
    console.error("Failed to create contact", event);
  }

  dismiss(event) {
    console.log("Dismissing modal", event.detail);
    // TODO: Can we use window.history.back() here?
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }
}
