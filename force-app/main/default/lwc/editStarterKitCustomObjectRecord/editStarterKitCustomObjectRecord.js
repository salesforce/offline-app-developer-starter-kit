import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import NAME_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Name";
import START_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Start_Time__c";
import END_TIME__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.End_Time__c";
import PRIORITY__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Priority__c";
import STATUS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Status__c";
import ADDRESS__C_FIELD from "@salesforce/schema/StarterKitCustomObject__c.Address__c";

export default class EditStarterKitCustomObject__cRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get nameField() {
    return NAME_FIELD;
  }

  get start_Time__cField() {
    return START_TIME__C_FIELD;
  }

  get end_Time__cField() {
    return END_TIME__C_FIELD;
  }

  get priority__cField() {
    return PRIORITY__C_FIELD;
  }

  get status__cField() {
    return STATUS__C_FIELD;
  }

  get address__cField() {
    return ADDRESS__C_FIELD;
  }

  @wire(getRecord, { recordId: "$recordId", fields: [NAME_FIELD] })
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
    console.log("Updated StarterKitCustomObject__c", event.detail);
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
