# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Salesforce Offline App Developer Starter Kit — example Lightning Web Components (LWC) and quick actions for the Salesforce Mobile Offline App. Uses Lightning Data Service (LDS) wire adapters for data access (not Apex) because Apex is server-side and unavailable offline.

## Commands

```bash
npm install                  # Install dependencies (Node >=22, managed via Volta)
npm run lint                 # ESLint across force-app/**/*.{js,html}
npm run test                 # Run all Jest unit tests (alias for test:unit)
npm run test:unit:watch      # Watch mode
npm run test:unit:coverage   # With coverage report
npm run prettier:verify      # Check formatting
npm run prettier             # Auto-format JS files
```

Run a single test file:
```bash
npx sfdx-lwc-jest -- --testPathPattern="viewAccountRecord"
```

Deploy to org:
```bash
sfdx force:source:deploy --sourcepath ./force-app/main/default
```

## Architecture

All source lives under `force-app/main/default/`:

- **`lwc/`** — Lightning Web Components. Each component follows the view/edit/create pattern per sObject (e.g., `viewAccountRecord`, `editAccountRecord`, `createAccountRecord`). Tests live in `__tests__/` within each component directory with mock data in `__tests__/data/`.
- **`quickActions/`** — Quick action metadata XML files. Naming convention is strict: `<ObjectType>.view.quickAction-meta.xml`, `<ObjectType>.edit.quickAction-meta.xml`, `<ObjectType>.create.quickAction-meta.xml` (exact casing matters).
- **`classes/`** — Apex classes (`AccountController` — example of calling Apex from LWC, but Apex is unavailable offline).
- **`objects/`** — Custom object definitions (`StarterKitCustomObject__c`).

### Shared/Utility Components

- `commonStyles` — shared CSS (imported by view/edit/create components)
- `draftDetailsList` — debug component showing offline draft state (usually commented out in production)
- `recordHeader` — reusable header for record views
- `errorPanel` / `ldsUtils` — error display and LDS utility helpers
- `scanBarcode` / `scanBarcodeLookup` — mobile barcode scanner integration
- `locationService` — geolocation service
- `fileUpload` — file upload component

### LWC Component Pattern

- **View components**: Wire `getRecord` with `@salesforce/schema` field imports, expose via `@api recordId` and `@api objectApiName`
- **Edit components**: Same pattern plus `lightning-record-edit-form`, dismiss via `history.back()`
- **Create components**: Use `lightning-record-edit-form` in create mode

### Testing

- Uses `@salesforce/sfdx-lwc-jest` with `@sa11y/jest` for accessibility assertions
- Wire adapter mocks: use `.emit()` to simulate data (e.g., `getRecord.emit(mockData)`)
- `lightning/mobileCapabilities` is mocked at `lwc/__mocks__/lightning/mobileCapabilities.js`
- DOM cleanup required in `afterEach` (jsdom instance shared across tests in a file)
- `.forceignore` excludes `__tests__/` and `__mocks__/` from org deployments

### Linting

ESLint config at `lwc/.eslintrc.json` extends `@salesforce/eslint-config-lwc/recommended` and `@salesforce/lwc-graph-analyzer/recommended`. The graph analyzer plugin validates offline compatibility of wire adapters.

## CI

Three GitHub Actions workflows run on push/PR: `prettier`, `lint`, and `run-tests` (tests run on Ubuntu + Windows, Node 22 + 24).
