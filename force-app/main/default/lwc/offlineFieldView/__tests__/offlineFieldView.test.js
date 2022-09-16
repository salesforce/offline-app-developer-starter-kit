import { createElement } from 'lwc';
import OfflineFieldView from 'c/offlineFieldView';
import { formatForDisplay } from "../offlineFieldView";

const mockGetRecord = require("./data/getRecord.json");

describe('formatForDisplay', () => {
  test('formats UTC date', () => {
    expect(formatForDisplay('2022-06-10T21:03:00Z')).toBe('6/10/2022, 2:03:00 PM');
  })
  
  test('formats UTC date with milliseconds', () => {
    expect(formatForDisplay('2022-06-10T21:03:00.000Z')).toBe('6/10/2022, 2:03:00 PM');
  })  
  
  test('does not modify regular text', () => {
    expect(formatForDisplay('die Wahrheit')).toBe('die Wahrheit');
  })  
})

describe('c-offline-field-view', () => {
  afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
      }
  });

  it('should correctly format UTC date time fields', () => {
      const element = createElement('c-offline-field-view', {
          is: OfflineFieldView
      });
      document.body.appendChild(element);
      element.record = { data: mockGetRecord };
      element.label = "Time";
      element.name = "Time";
      
      // Resolve a promise to wait for a re-render of the new content
      return Promise.resolve().then(() => {
          const timeField = element.shadowRoot.querySelector(
              '.field-value'
          );
          expect(timeField.textContent).toBe('6/10/2022, 2:03:00 PM');
      });
  });


  it('should not modify regular text fields', () => {
    const element = createElement('c-offline-field-view', {
        is: OfflineFieldView
    });
    document.body.appendChild(element);
    element.record = { data: mockGetRecord };
    element.label = "Phone";
    element.name = "Phone";
    
    // Resolve a promise to wait for a re-render of the new content
    return Promise.resolve().then(() => {
        const phoneField = element.shadowRoot.querySelector(
            '.field-value'
        );
        expect(phoneField.textContent).toBe('123-456-7890');
    });
  });
});