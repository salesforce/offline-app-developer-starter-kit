import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";
import CONTACT_OWNER_FIELD from "@salesforce/schema/Contact.OwnerId";

export default class ViewContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      CONTACT_NAME_FIELD,
      CONTACT_TITLE_FIELD,
      CONTACT_ACCOUNT_FIELD,
      CONTACT_PHONE_FIELD,
      CONTACT_EMAIL_FIELD,
      CONTACT_MOBILE_FIELD,
      CONTACT_OWNER_FIELD,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
