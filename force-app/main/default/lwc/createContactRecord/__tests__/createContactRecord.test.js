import { createElement } from 'lwc'
import CreateContactRecord from 'c/createContactRecord'
import { createRecord } from 'lightning/uiRecordApi'

import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'

describe('c-create-contact-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should go back when clicking cancel button', () => {
        // setup
        const element = createElement('c-create-contact-record', {
            is: CreateContactRecord
        })
        document.body.appendChild(element)

        // use a spy to ensure we called back()
        const backSpy = jest.spyOn(window.history, 'back')

        const cancelButton = element.shadowRoot.querySelector('lightning-button[data-id="cancel"]')
        cancelButton.click()

        expect(backSpy).toHaveBeenCalled()
    })

    it('should populate correctly and have buttons, message, and input fields', () => {
        const OBJECT_API_NAME = 'Contact'

        const INPUT_FIELDS = [
            TITLE_FIELD,
            FIRSTNAME_FIELD,
            LASTNAME_FIELD,
            PHONE_FIELD,
            EMAIL_FIELD
        ];

        // setup
        const element = createElement('c-create-contact-record', {
            is: CreateContactRecord
        })
        document.body.appendChild(element)

        // test
        const form = element.shadowRoot.querySelector('lightning-record-edit-form')
        expect(form.recordId).toBeUndefined()
        expect(form.objectApiName).toBe(OBJECT_API_NAME)

        const submitButton = element.shadowRoot.querySelector('lightning-button[data-id="submit"]')
        expect(submitButton.type).toBe('submit')

        const cancelButton = element.shadowRoot.querySelector('lightning-button[data-id="cancel"]')
        expect(cancelButton.type).toBe('button')

        const message = element.shadowRoot.querySelector('lightning-messages')
        expect(message).not.toBeNull()

        // get the input fields and ensure they are in the correct order
        const outputFieldNames = Array.from(
            element.shadowRoot.querySelectorAll('lightning-input-field')
        ).map((outputField) => outputField.fieldName);
        expect(outputFieldNames).toEqual(INPUT_FIELDS);

    })

    it('should go back after success', () => {
        // setup
        const element = createElement('c-create-contact-record', {
            is: CreateContactRecord
        })
        document.body.appendChild(element)

        const backSpy = jest.spyOn(window.history, 'back');
        const form = element.shadowRoot.querySelector('lightning-record-edit-form')

        // test
        form.dispatchEvent(new CustomEvent('success'))

        return Promise.resolve().then(() => {
            expect(backSpy).toHaveBeenCalled()
        });
    });

});
