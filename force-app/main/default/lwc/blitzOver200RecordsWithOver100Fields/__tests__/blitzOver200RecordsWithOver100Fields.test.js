import { createElement } from 'lwc';
import BlitzOver200RecordsWithOver100Fields from 'c/blitzOver200RecordsWithOver100Fields';

describe('c-blitz-over200-records-with-over100-fields', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-blitz-over200-records-with-over100-fields', {
            is: BlitzOver200RecordsWithOver100Fields
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});