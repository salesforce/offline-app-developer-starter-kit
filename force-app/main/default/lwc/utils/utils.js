import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_PHONE_FIELD from "@salesforce/schema/Account.Phone";
import ACCOUNT_WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_TYPE_FIELD from "@salesforce/schema/Account.Type";

import CONTACT_OBJECT from "@salesforce/schema/Contact";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_TITLE_FIELD from "@salesforce/schema/Contact.Title";
import CONTACT_ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import CONTACT_PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import CONTACT_MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";
import CONTACT_CONTACT_OWNER_FIELD from "@salesforce/schema/Contact.OwnerId";

import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";
import OPPORTUNITY_NAME_FIELD from "@salesforce/schema/Opportunity.Name";
import OPPORTUNITY_ACCOUNT_FIELD from "@salesforce/schema/Opportunity.AccountId";
import OPPORTUNITY_CLOSE_DATE_FIELD from "@salesforce/schema/Opportunity.CloseDate";
import OPPORTUNITY_AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import OPPORTUNITY_OWNER_FIELD from "@salesforce/schema/Opportunity.OwnerId";
// import OPPORTUNITY_SCORE_FIELD from "@salesforce/schema/Opportunity.IqScore"; not exposed

const fieldsForCompactLayout = (objectApiName) => {
  if (objectApiName === ACCOUNT_OBJECT.objectApiName) {
    return [
      ACCOUNT_NAME_FIELD,
      ACCOUNT_PHONE_FIELD,
      ACCOUNT_WEBSITE_FIELD,
      ACCOUNT_INDUSTRY_FIELD,
      ACCOUNT_TYPE_FIELD,
    ];
  } else if (objectApiName === CONTACT_OBJECT.objectApiName) {
    return [
      CONTACT_NAME_FIELD,
      CONTACT_TITLE_FIELD,
      CONTACT_ACCOUNT_FIELD,
      CONTACT_PHONE_FIELD,
      CONTACT_EMAIL_FIELD,
      CONTACT_MOBILE_FIELD,
      CONTACT_CONTACT_OWNER_FIELD,
    ];
  } else if (objectApiName === OPPORTUNITY_OBJECT.objectApiName) {
    return [
      OPPORTUNITY_NAME_FIELD,
      OPPORTUNITY_ACCOUNT_FIELD,
      OPPORTUNITY_CLOSE_DATE_FIELD,
      OPPORTUNITY_AMOUNT_FIELD,
      OPPORTUNITY_OWNER_FIELD,
    ];
  }

  // default
  return [];
};

export { fieldsForCompactLayout };
