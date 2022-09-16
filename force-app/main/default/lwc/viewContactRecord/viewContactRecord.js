import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const FIELDS = [
    TITLE_FIELD,
    FIRSTNAME_FIELD,
    LASTNAME_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD,
];

export default class ViewContactRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;

    get name() {
        return (this.recordDataExists && this.record.data.fields && this.record.data.fields.Name) ?
        this.record.data.fields.Name.value :
        "";
    }

    get cardIconName() {
        return 'standard:'+this.objectApiName.toLowerCase();
    }

    // Helper functionality to verify existence of record and its data in HTML checks
    get recordDataExists() {
        return (this.record && this.record.data)
    }
}