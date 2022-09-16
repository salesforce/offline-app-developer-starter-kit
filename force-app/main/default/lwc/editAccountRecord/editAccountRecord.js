import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

const FIELDS = [
    NAME_FIELD
];

export default class EditAccountRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    nameField = NAME_FIELD;
    phoneField = PHONE_FIELD;
    websiteField = WEBSITE_FIELD;
    industryField = INDUSTRY_FIELD;
    typeField = TYPE_FIELD;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record;

    get name() {
        return (this.record && this.record.data && this.record.data.fields && this.record.data.fields.Name) ?
            this.record.data.fields.Name.value :
            "";
    }

    onSuccess(event) {
        console.log('Updated account', event.detail);
        // Dismiss modal on success
        this.dismiss(event);
    }

    onError(event) {
        console.error('Error updating Account', event);
    }

    dismiss(event) {
        console.log('Dismissing modal', event.detail);
        // NOTE: history.back() is only available on 240+ -- use NavigationMixin.Navigate for pre-240 solutions
        history.back();
    }
}
