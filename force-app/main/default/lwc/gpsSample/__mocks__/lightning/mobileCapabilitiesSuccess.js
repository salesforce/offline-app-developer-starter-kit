// set up some default mock behavior. tests can reset these to other behavior if needed
const mockIsAvailable = jest.fn().mockReturnValue(true);
const mockGetCurrentPosition = jest.fn(() =>
  Promise.resolve({
    coords: {
      latitude: 10,
      longitude: 10
    }
  })
);

const mockLocationServiceFactory = {
  isAvailable: mockIsAvailable,
  getCurrentPosition: mockGetCurrentPosition
};

export function getLocationService() {
  return mockLocationServiceFactory;
}
