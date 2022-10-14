import { LightningElement, track } from 'lwc'
import { getBarcodeScanner } from 'lightning/mobileCapabilities'

export default class ScanBarcode extends LightningElement {
    scanner
    @track scannedBarcode = null
    @track errorCode = null

    connectedCallback() {
        this.scanner = getBarcodeScanner()
        if (this.scanner == null || !this.scanner.isAvailable()) {
            console.warn('Scanner not initialized!')
        }
    }

    doScan() {
        if (this.scanner && this.scanner.isAvailable()) {
            console.log('starting scan...')
            const scanningOptions = {
                barcodeTypes: [
                    this.scanner.barcodeTypes.EAN_8,
                    this.scanner.barcodeTypes.EAN_13,
                    this.scanner.barcodeTypes.UPC_A,
                    this.scanner.barcodeTypes.UPC_E,
                    this.scanner.barcodeTypes.QR
                ],
                instructionText: 'Scan a barcode',
                successText: 'Scanning complete.',
                scannerSize: 'XLARGE',
                cameraFacing: 'BACK',
                showSuccessCheckMark: true
            }
            this.scanner
                .beginCapture(scanningOptions)
                .then((result) => {
                    console.log('successfully scanned', result)
                    this.errorCode = null
                    this.scannedBarcode = result.value
                })
                .catch((error) => {
                    console.error('scan error', error)
                    console.error(this.errorCode)
                    this.errorCode = error.code
                    console.error(this.errorCode)
                    this.scannedBarcode = null
                })
                .finally(() => {
                    console.log('scan complete')
    
                    // Clean up by ending capture,
                    // whether we completed successfully or had an error
                    this.scanner.endCapture()
                });    
        } else {
            console.log('Scanner not initialized!')
            this.errorCode = 'SCANNER_NOT_INITIALIZED'
            this.scannedBarcode = null
        }
    }
}
