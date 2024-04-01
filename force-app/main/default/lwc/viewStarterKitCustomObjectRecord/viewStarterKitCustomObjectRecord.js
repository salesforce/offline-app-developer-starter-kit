import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Name";
import START_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Start_Time__c";
import END_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.End_Time__c";
import PRIORITY__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Priority__c";
import STATUS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Status__c";
import ADDRESS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Address__c";

export default class ViewStarterKitCustomObject__cRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      NAME_FIELD,
      START_TIME__C_FIELD,
      END_TIME__C_FIELD,
      PRIORITY__C_FIELD,
      STATUS__C_FIELD,
      ADDRESS__C_FIELD,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
