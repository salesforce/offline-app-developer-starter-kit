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

  nameField = NAME_FIELD;
  start_Time__cField = START_TIME__C_FIELD;
  end_Time__cField = END_TIME__C_FIELD;
  priority__cField = PRIORITY__C_FIELD;
  status__cField = STATUS__C_FIELD;
  address__cField = ADDRESS__C_FIELD;

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
