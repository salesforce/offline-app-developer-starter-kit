import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_STAGENAME_FIELD from "@salesforce/schema/Opportunity.StageName";

export default class EditOpportunityRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = OPPORTUNITY_NAME_FIELD;
  accountField = OPPORTUNITY_ACCOUNT_FIELD;
  closeDateField = OPPORTUNITY_CLOSE_DATE_FIELD;
  amountField = OPPORTUNITY_AMOUNT_FIELD;
  stageNameField = OPPORTUNITY_STAGENAME_FIELD;

  @wire(getRecord, { recordId: "$recordId", fields: [OPPORTUNITY_NAME_FIELD] })
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
    console.log("Updated opportunity", event.detail);
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
