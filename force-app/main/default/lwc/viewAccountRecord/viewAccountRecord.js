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

  get fields() {
    return [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD, INDUSTRY_FIELD, TYPE_FIELD];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
