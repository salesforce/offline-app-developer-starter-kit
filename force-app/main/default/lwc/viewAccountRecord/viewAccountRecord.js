import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

const FIELDS = [
    NAME_FIELD,
    PHONE_FIELD,
    WEBSITE_FIELD,
    INDUSTRY_FIELD,
    TYPE_FIELD
];

export default class ViewAccountRecord extends LightningElement {
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