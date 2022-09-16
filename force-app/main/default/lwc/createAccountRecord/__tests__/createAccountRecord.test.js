import { createElement } from 'lwc';
import CreateAccountRecord from 'c/createAccountRecord';
import { createRecord } from 'lightning/uiRecordApi';

describe('c-create-account-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file, so, reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should correctly call createRecord on button click', () => {
        const element = createElement('c-create-account-record', {
            is: CreateAccountRecord
        });
        document.body.appendChild(element);
        const createButton = element.shadowRoot.querySelector('lightning-button');
            
        createButton.click();

        expect(createRecord).toBeCalledTimes(1);
    });
});
