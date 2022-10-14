// set up some default mock behavior. tests can reset these to other behavior if needed
const mockIsAvailable = jest.fn().mockReturnValue(true)
const mockBeginCapture = jest.fn(() => Promise.resolve({ value: "some-barcode" }))
const mockEndCapture = jest.fn()

const mockBarcodeScannerFactory = {
    isAvailable: mockIsAvailable,
    created: new Date().toLocaleTimeString(),
    barcodeTypes: {
        EAN_8: 'ean8',
        EAN_13: 'ean13',
        UPC_A: 'upca',
        UPC_E: 'upce',
        QR: 'qr'
    },
    beginCapture: mockBeginCapture,
    endCapture: mockEndCapture
}

export function getBarcodeScanner() {
    return mockBarcodeScannerFactory
}