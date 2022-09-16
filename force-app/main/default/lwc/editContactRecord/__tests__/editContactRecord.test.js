import { createElement } from 'lwc';
import EditContactRecord from 'c/editContactRecord';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

const mockGetRecord = require("./data/getRecord.json");

describe('c-edit-contact-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should correctly populate record fields', () => {
        const element = createElement('c-edit-contact-record', {
            is: EditContactRecord
        });
        document.body.appendChild(element);

        // Emit mock record into the wired field
        getRecord.emit(mockGetRecord);
        
        // Resolve a promise to wait for a re-render of the new content
        return Promise.resolve().then(() => {
            const titleField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Title"]'
            );
            const firstNameField = element.shadowRoot.querySelector(
                'lightning-input[data-field="FirstName"]'
            );
            const lastNameField = element.shadowRoot.querySelector(
                'lightning-input[data-field="LastName"]'
            );
            const phoneField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Phone"]'
            );
            const emailField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Email"]'
            );

            const titleFieldMock = mockGetRecord.fields.Title.value;
            const firstNameFieldMock = mockGetRecord.fields.FirstName.value;
            const lastNameFieldMock = mockGetRecord.fields.LastName.value;
            const phoneFieldMock = mockGetRecord.fields.Phone.value;
            const emailFieldMock = mockGetRecord.fields.Email.value;
            
            expect(titleField.value).toBe(titleFieldMock);
            expect(firstNameField.value).toBe(firstNameFieldMock);
            expect(lastNameField.value).toBe(lastNameFieldMock);
            expect(phoneField.value).toBe(phoneFieldMock);
            expect(emailField.value).toBe(emailFieldMock);
        });
    });

    it('should update record on Save button click', () => {
        const element = createElement('c-edit-contact-record', {
            is: EditContactRecord
        });
        document.body.appendChild(element);

        // Emit mock record into the wired field
        getRecord.emit(mockGetRecord);

        // Resolve a promise to wait for a re-render of the new content
        return Promise.resolve().then(() => {
            const updateBtn = element.shadowRoot.querySelector('lightning-button');
            
            updateBtn.click();

            expect(updateRecord).toBeCalledTimes(1);
        });
    });
});