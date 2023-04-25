import { LightningElement, api } from "lwc";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";

export default class CreateContactRecord extends LightningElement {
  @api recordId;
  @api objectApiName;

  nameField = OPPORTUNITY_NAME_FIELD;
  accountField = OPPORTUNITY_ACCOUNT_FIELD;
  closeDateField = OPPORTUNITY_CLOSE_DATE_FIELD;
  amountField = OPPORTUNITY_AMOUNT_FIELD;
  ownerField = OPPORTUNITY_OWNER_FIELD;

  name = "";
  account = "";
  closeDate = "";
  amount = "";
  owner = "";

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
