import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import TYPE_FIELD from "@salesforce/schema/Account.Type";

export default class ViewAccountRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  fields = [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD, INDUSTRY_FIELD, TYPE_FIELD];

  @wire(getRecord, { recordId: "$recordId", fields: fields })
  record;

  get name() {
    return this.recordDataExists &&
      this.record.data.fields &&
      this.record.data.fields.Name
      ? this.record.data.fields.Name.value
      : "";
  }

  get draftDetails() {
    if (
      !(
        this.recordDataExists &&
        this.record.data.drafts &&
        this.record.data.drafts.serverValues
      )
    ) {
      return null;
    }

    // flatten the serverValues
    const draftChanges = this.record.data.drafts.serverValues;
    const serverChanges = Object.keys(draftChanges).map((key) => ({
      fieldName: key,
      ...draftChanges[key],
    }));

    return serverChanges;
  }

  get cardIconName() {
    return "standard:" + this.objectApiName.toLowerCase();
  }

  get recordDataExists() {
    return this.record && this.record.data;
  }
}
