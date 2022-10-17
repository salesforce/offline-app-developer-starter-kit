import { createElement } from 'lwc'
import ViewAccountRecord from 'c/viewAccountRecord'
import { getRecord } from 'lightning/uiRecordApi'

const mockGetRecord = require("./data/getRecord.json")

describe('c-view-account-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild)
        }
    })

    it('should correctly populate record fields', () => {
        const element = createElement('c-view-account-record', {
            is: ViewAccountRecord
        })
        document.body.appendChild(element)

        // Initialize this to a value, as .toLowerCase() is called on it
        element.objectApiName = "cardIconName"

        // Emit mock record into the wired field
        // eslint-disable-next-line @lwc/lwc/no-unexpected-wire-adapter-usages
        getRecord.emit(mockGetRecord)

        // Resolve a promise to wait for a re-render of the new content
        return Promise.resolve().then(() => {
            const nameField = element.shadowRoot.querySelector(
                'lightning-layout-item[class="record-name"]'
            )

            const nameFieldMock = mockGetRecord.fields.Name.value
            
            expect(nameField.textContent).toBe(nameFieldMock)
        })
    })
})