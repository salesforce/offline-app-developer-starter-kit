import { LightningElement, api } from "lwc";

import NAME_FIELD from "@salesforce/schema/Visit__c.Name";
import START_TIME__C_FIELD from "@salesforce/schema/Visit__c.Start_Time__c";
import END_TIME__C_FIELD from "@salesforce/schema/Visit__c.End_Time__c";
import PRIORITY__C_FIELD from "@salesforce/schema/Visit__c.Priority__c";
import STATUS__C_FIELD from "@salesforce/schema/Visit__c.Status__c";
import ADDRESS__C_FIELD from "@salesforce/schema/Visit__c.Address__c";

export default class CreateVisit__cRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = NAME_FIELD;
  start_Time__cField = START_TIME__C_FIELD;
  end_Time__cField = END_TIME__C_FIELD;
  priority__cField = PRIORITY__C_FIELD;
  status__cField = STATUS__C_FIELD;
  address__cField = ADDRESS__C_FIELD;

  name = "";
  start_Time__c = "";
  end_Time__c = "";
  priority__c = "";
  status__c = "";
  address__c = "";

  onSuccess(event) {
    console.log("Created Visit__c", event.detail);
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
