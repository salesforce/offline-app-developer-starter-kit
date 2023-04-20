import { fieldsForCompactLayout } from "c/utils";
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

describe("c-utils", () => {
  afterEach(() => {});

  function foundField(array, field) {
    const found = array.find(
      (obj) =>
        obj.objectApiName === field.objectApiName &&
        obj.fieldApiName === field.fieldApiName
    );
    return found !== undefined;
  }

  it("Returns correct fields for Account", () => {
    const fields = fieldsForCompactLayout(ACCOUNT_OBJECT.objectApiName);

    // Assert
    expect(fields.length).toBe(5);
    expect(foundField(fields, ACCOUNT_NAME_FIELD)).toBeTruthy();
    expect(foundField(fields, ACCOUNT_PHONE_FIELD)).toBeTruthy();
    expect(foundField(fields, ACCOUNT_WEBSITE_FIELD)).toBeTruthy();
    expect(foundField(fields, ACCOUNT_INDUSTRY_FIELD)).toBeTruthy();
    expect(foundField(fields, ACCOUNT_TYPE_FIELD)).toBeTruthy();
  });

  it("Returns correct fields for Contact", () => {
    const fields = fieldsForCompactLayout(CONTACT_OBJECT.objectApiName);

    // Assert
    expect(fields.length).toBe(7);
    expect(foundField(fields, CONTACT_NAME_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_TITLE_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_ACCOUNT_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_PHONE_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_EMAIL_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_MOBILE_FIELD)).toBeTruthy();
    expect(foundField(fields, CONTACT_CONTACT_OWNER_FIELD)).toBeTruthy();
  });

  it("Returns correct fields for Opportunity", () => {
    const fields = fieldsForCompactLayout(OPPORTUNITY_OBJECT.objectApiName);

    // Assert
    expect(fields.length).toBe(5);
    expect(foundField(fields, OPPORTUNITY_NAME_FIELD)).toBeTruthy();
    expect(foundField(fields, OPPORTUNITY_ACCOUNT_FIELD)).toBeTruthy();
    expect(foundField(fields, OPPORTUNITY_CLOSE_DATE_FIELD)).toBeTruthy();
    expect(foundField(fields, OPPORTUNITY_AMOUNT_FIELD)).toBeTruthy();
    expect(foundField(fields, OPPORTUNITY_OWNER_FIELD)).toBeTruthy();
  });

  it("Returns empty list for unknown object type", () => {
    const fields = fieldsForCompactLayout("UNKNOWN");

    // Assert
    expect(fields.length).toBe(0);
  });
});
