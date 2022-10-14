import { createElement } from 'lwc'
import ErrorPanel from 'c/errorPanel'

describe('c-error-panel', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild)
        }
    })

    it('displays a default friendly message', () => {
        const MESSAGE = 'An error occurred'

        // Create initial element
        const element = createElement('c-error-panel', {
            is: ErrorPanel
        })
        document.body.appendChild(element)

        const messageEl = element.shadowRoot.querySelector('span')
        expect(messageEl.textContent).toBe(MESSAGE)
    })

    it('displays a custom friendly message', () => {
        const MESSAGE = 'Errors are bad'

        // Create initial element
        const element = createElement('c-error-panel', {
            is: ErrorPanel
        })
        element.friendlyMessage = MESSAGE
        document.body.appendChild(element)

        const messageEl = element.shadowRoot.querySelector('span')
        expect(messageEl.textContent).toBe(MESSAGE)
    })

    it('does not have a show details link when there are no errors passed', () => {
        // Create initial element
        const element = createElement('c-error-panel', {
            is: ErrorPanel
        })
        document.body.appendChild(element)

        const linkEl = element.shadowRoot.querySelector('a')
        expect(linkEl).toBeNull()
    })

    it('shows details of error message when button is clicked', async () => {
        // Create initial element
        const element = createElement('c-error-panel', {
            is: ErrorPanel
        })
        element.errors = [
            { message: "a" },
            { message: "b" }
        ]

        document.body.appendChild(element)

        const linkEl = element.shadowRoot.querySelector('a')
        linkEl.click()

        await Promise.resolve()

        const errorEls = element.shadowRoot.querySelectorAll('p')
        expect(errorEls.length).toBe(2)
        expect(errorEls[0].textContent).toBe(element.errors[0].message)
        expect(errorEls[1].textContent).toBe(element.errors[1].message)
    })
})