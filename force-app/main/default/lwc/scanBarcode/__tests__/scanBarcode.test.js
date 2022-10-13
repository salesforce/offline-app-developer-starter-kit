import { createElement } from 'lwc'
import ScanBarcode from 'c/scanBarcode'
import { getBarcodeScanner } from 'lightning/mobileCapabilities'

describe('c-scan-barcode', () => {

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file, so, reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild)
        }

        jest.clearAllMocks()
    })

    it('should have a scan button which captures a barcode when clicked', async () => {
        // setup
        const mockBarcodeScanner = getBarcodeScanner()
        const element = createElement('c-scan-barcode', {
            is: ScanBarcode
        })
        document.body.appendChild(element)

        // test
        const scanButton = element.shadowRoot.querySelector('lightning-button')
        scanButton.click()

        // necessary to wait for finally block to be invoked and dom to be updated
        await new Promise(process.nextTick);

        expect(mockBarcodeScanner.beginCapture).toHaveBeenCalledTimes(1)

        // check to ensure the template was updated with the scanned barcode
        const scannedBarcode = element.shadowRoot.querySelector('span[data-id="result"]')
        expect(scannedBarcode.innerHTML).toBe("some-barcode")

        expect(mockBarcodeScanner.endCapture).toHaveBeenCalledTimes(1)
    })

    it('should have a scan button which handles error condition when clicked', async () => {
        // setup
        // reset beginCapture() mock to return an error
        let mockBarcodeScanner = getBarcodeScanner()
        mockBarcodeScanner.beginCapture = jest.fn(() => Promise.reject({ code: 'some-error' }))

        const element = createElement('c-scan-barcode', {
            is: ScanBarcode
        })
        document.body.appendChild(element)

        // test
        const scanButton = element.shadowRoot.querySelector('lightning-button')
        scanButton.click()

        // necessary to wait for finally block to be invoked and dom to be updated
        await new Promise(process.nextTick);

        expect(mockBarcodeScanner.beginCapture).toHaveBeenCalledTimes(1)

        // check to ensure the template was updated with the scanned barcode
        const errorCode = element.shadowRoot.querySelector('span[data-id="error"]')
        expect(errorCode.innerHTML).toBe('some-error')

        expect(mockBarcodeScanner.endCapture).toHaveBeenCalledTimes(1)
    })

    it('should error when scanner is not available', async () => {
        // setup
        let mockBarcodeScanner = getBarcodeScanner()
        mockBarcodeScanner.isAvailable = jest.fn(() => false)
        
        const element = createElement('c-scan-barcode', {
            is: ScanBarcode
        })
        document.body.appendChild(element)

        // test
        const scanButton = element.shadowRoot.querySelector('lightning-button')
        scanButton.click()

        // necessary to wait for finally block to be invoked and dom to be updated
        await new Promise(process.nextTick);

        expect(mockBarcodeScanner.beginCapture).not.toHaveBeenCalled()
        expect(mockBarcodeScanner.endCapture).not.toHaveBeenCalled()

        // check to ensure the template was updated with the scanned barcode
        const errorCode = element.shadowRoot.querySelector('span[data-id="error"]')
        expect(errorCode.innerHTML).toBe('SCANNER_NOT_INITIALIZED')

        const scannedBarcode = element.shadowRoot.querySelector('span[data-id="result"]')
        expect(scannedBarcode).toBe(null) // should not even be visible in the dom
    })
})