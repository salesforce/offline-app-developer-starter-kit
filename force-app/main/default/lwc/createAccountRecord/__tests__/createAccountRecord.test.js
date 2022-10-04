import { createElement } from 'lwc';
import CreateAccountRecord from 'c/createAccountRecord';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

describe('c-create-account-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file, so, reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.restoreAllMocks()
    });

    it('should go back when clicking cancel button', () => {
        // setup
        const element = createElement('c-create-account-record', {
            is: CreateAccountRecord
        })
        document.body.appendChild(element)

        // use a spy to ensure we called back()
        const backSpy = jest.spyOn(window.history, 'back')

        const cancelButton = element.shadowRoot.querySelector('lightning-button[data-id="cancel"]')
        cancelButton.click()

        expect(backSpy).toHaveBeenCalled()
    })

    it('should populate correctly and have buttons, message, and input fields', () => {
        const RECORD_ID_INPUT = '0011700000pJRRSAA4'
        const OBJECT_API_NAME = 'Account'

        const INPUT_FIELDS = [
            NAME_FIELD,
            PHONE_FIELD,
            WEBSITE_FIELD,
            INDUSTRY_FIELD,
            TYPE_FIELD
        ];

        // setup
        const element = createElement('c-create-account-record', {
            is: CreateAccountRecord
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
        const element = createElement('c-create-account-record', {
            is: CreateAccountRecord
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
