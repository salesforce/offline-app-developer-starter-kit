import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Product2.Name";
import PRODUCTCODE_FIELD from "@salesforce/schema/Product2.ProductCode";
import ISACTIVE_FIELD from "@salesforce/schema/Product2.IsActive";
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
import DESCRIPTION_FIELD from "@salesforce/schema/Product2.Description";

export default class ViewProduct2Record extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      NAME_FIELD,
      PRODUCTCODE_FIELD,
      ISACTIVE_FIELD,
      FAMILY_FIELD,
      DESCRIPTION_FIELD,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
