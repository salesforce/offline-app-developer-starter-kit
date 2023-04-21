// set up some default mock behavior. tests can reset these to other behavior if needed
const mockIsAvailable = jest.fn().mockReturnValue(true);

const mockBeginCapture = jest.fn().mockImplementation(() => {
  return Promise.resolve({ value: "some-barcode" });
});

const mockEndCapture = jest.fn();

const mockBarcodeScannerFactory = {
  isAvailable: mockIsAvailable,
  created: new Date().toLocaleTimeString(),
  barcodeTypes: {
    EAN_8: "ean8",
    EAN_13: "ean13",
    UPC_A: "upca",
    UPC_E: "upce",
    QR: "qr",
  },
  beginCapture: mockBeginCapture,
  endCapture: mockEndCapture,
};

const mockGetCurrentPosition = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    coords: {
      latitude: 111.11,
      longitude: 99.99,
    },
  });
});

const mockLocationServiceFactory = {
  isAvailable: mockIsAvailable,
  getCurrentPosition: mockGetCurrentPosition,
};

export function getBarcodeScanner() {
  return mockBarcodeScannerFactory;
}

export function getLocationService() {
  return mockLocationServiceFactory;
}
