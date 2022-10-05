import { LightningElement, api, wire } from 'lwc'
import { getRecord } from 'lightning/uiRecordApi'

import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'

const FIELDS = [
    FIRSTNAME_FIELD,
    LASTNAME_FIELD
]

export default class EditContactRecord extends LightningElement {
    @api recordId
    @api objectApiName

    titleField = TITLE_FIELD
    firstNameField = FIRSTNAME_FIELD
    lastNameField = LASTNAME_FIELD
    phoneField = PHONE_FIELD
    emailField = EMAIL_FIELD

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    record

    get fullName() {
        var first = (this.record && this.record.data && this.record.data.fields && this.record.data.fields.FirstName) ?
        (this.record.data.fields.FirstName.value + " ") : // append a space after first name
        ""

        var last = (this.record && this.record.data && this.record.data.fields && this.record.data.fields.LastName) ?
        this.record.data.fields.LastName.value :
        ""
        return first + last
    }

    onSuccess(event) {
        console.log('Updated Contact', event.detail)
        // Dismiss modal on success
        this.dismiss(event)
    }

    dismiss(event) {
        console.log('Dismissing modal', event.detail)
        history.back()
    }
}
