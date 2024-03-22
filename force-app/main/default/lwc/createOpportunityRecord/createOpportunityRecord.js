import { LightningElement, api } from "lwc";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_STAGENAME_FIELD from "@salesforce/schema/Opportunity.StageName";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";

export default class CreateContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  get nameField() {
    return OPPORTUNITY_NAME_FIELD;
  }

  get accountField() {
    return OPPORTUNITY_ACCOUNT_FIELD;
  }

  get closeDateField() {
    return OPPORTUNITY_CLOSE_DATE_FIELD;
  }

  get amountField() {
    return OPPORTUNITY_AMOUNT_FIELD;
  }

  get stageNameField() {
    return OPPORTUNITY_STAGENAME_FIELD;
  }

  get ownerField() {
    return OPPORTUNITY_OWNER_FIELD;
  }

  get initialValue() {
    return "";
  }

  onSuccess(event) {
    console.log("Created opportunity", event.detail);
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
