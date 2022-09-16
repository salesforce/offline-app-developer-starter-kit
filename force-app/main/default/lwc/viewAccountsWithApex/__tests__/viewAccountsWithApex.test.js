import { createElement } from 'lwc';
import ViewAccountsWithApex from 'c/viewAccountsWithApex';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

// Realistic data with a list of accounts
const mockGetAccountList = require('./data/getAccountList.json');

// Mock getAccountList Apex wire adapter
jest.mock(
    '@salesforce/apex/AccountController.getAccountList',
    () => {
        const {
            createApexTestWireAdapter
        } = require('@salesforce/sfdx-lwc-jest');
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
    { virtual: true }
);

describe('c-view-accounts-with-apex', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    async function flushPromises() {
        return Promise.resolve();
    }

    describe('getAccountList @wire', () => {
        it('renders 2 records when data returned', async () => {
            // Create initial element
            const element = createElement('c-view-accounts-with-apex', {
                is: ViewAccountsWithApex
            });
            document.body.appendChild(element);

            // Emit data from @wire
            getAccountList.emit(mockGetAccountList);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Select elements for validation
            const detailEls = element.shadowRoot.querySelectorAll('p');
            expect(detailEls.length).toBe(mockGetAccountList.length);
            expect(detailEls[0].textContent).toBe(mockGetAccountList[0].Name);
        });
        it('shows error panel element when error returned', async () => {
            // Create initial element
            const element = createElement('c-view-accounts-with-apex', {
                is: ViewAccountsWithApex
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getAccountList.error();

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const errorPanelEl =
                element.shadowRoot.querySelector('c-error-panel');
            expect(errorPanelEl).not.toBeNull();
        });
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('c-view-accounts-with-apex', {
            is: ViewAccountsWithApex
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountList.emit(mockGetAccountList);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        // Create initial element
        const element = createElement('c-view-accounts-with-apex', {
            is: ViewAccountsWithApex
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getAccountList.error();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
