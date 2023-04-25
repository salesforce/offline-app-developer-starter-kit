import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";

export default class ViewOpportunityRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get fields() {
    return [
      OPPORTUNITY_NAME_FIELD,
      OPPORTUNITY_ACCOUNT_FIELD,
      OPPORTUNITY_CLOSE_DATE_FIELD,
      OPPORTUNITY_AMOUNT_FIELD,
      OPPORTUNITY_OWNER_FIELD,
    ];
  }

  @wire(getRecord, { recordId: "$recordId", fields: "$fields" })
  record;

  get name() {
    return this.record?.data?.fields?.Name?.value ?? "";
  }
}
