import { createElement } from 'lwc';
import CreateContactRecord from 'c/createContactRecord';
import { createRecord } from 'lightning/uiRecordApi';

describe('c-create-contact-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should correctly call createRecord on button click', () => {
        const element = createElement('c-create-contact-record', {
            is: CreateContactRecord
        });
        document.body.appendChild(element);
        const createButton = element.shadowRoot.querySelector('lightning-button');
            
        createButton.click();

        expect(createRecord).toBeCalledTimes(1);
    });
});