import { createElement } from 'lwc';
import EditAccountRecord from 'c/editAccountRecord';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

const mockGetRecord = require("./data/getRecord.json");

describe('c-edit-account-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should correctly populate record fields', () => {
        const element = createElement('c-edit-account-record', {
            is: EditAccountRecord
        });
        document.body.appendChild(element);

        // Emit mock record into the wired field
        getRecord.emit(mockGetRecord);

        // Resolve a promise to wait for a re-render of the new content
        return Promise.resolve().then(() => {
            const nameField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Name"]'
            );
            const phoneField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Phone"]'
            );
            const websiteField = element.shadowRoot.querySelector(
                'lightning-input[data-field="Website"]'
            );

            const nameFieldMock = mockGetRecord.fields.Name.value;
            const phoneFieldMock = mockGetRecord.fields.Phone.value;
            const websiteFieldMock = mockGetRecord.fields.Website.value;
            
            expect(nameField.value).toBe(nameFieldMock);
            expect(phoneField.value).toBe(phoneFieldMock);
            expect(websiteField.value).toBe(websiteFieldMock);
        });
    });
    it('should update record on Save button click', () => {
        const element = createElement('c-edit-account-record', {
            is: EditAccountRecord
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