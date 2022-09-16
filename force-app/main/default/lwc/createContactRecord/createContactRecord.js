import { LightningElement, api } from 'lwc';

import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class CreatContactRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    titleField = TITLE_FIELD;
    firstNameField = FIRSTNAME_FIELD;
    lastNameField = LASTNAME_FIELD;
    phoneField = PHONE_FIELD;
    emailField = EMAIL_FIELD;

    title = '';
    firstName = '';
    lastName = '';
    phone = '';
    email = '';

    onSuccess(event) {
        console.log('Created contact', event.detail);
        // Dismiss modal on success
        this.dismiss(event);
    }

    onError(event) {
        console.error('Error creating Contact', event);
    }

    dismiss(event) {
        console.log('Dismissing modal', event.detail);
        // NOTE: history.back() is only available on 240+ -- use NavigationMixin.Navigate for pre-240 solutions
        history.back();
    }
}
