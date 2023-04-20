# Contributing Guidelines

Thank you for considering contributing to Offline App Developer Starter Kit! We welcome contributions from everyone. Before you get started, please take a moment to review the following guidelines.

## Getting Started

To contribute to this project, you should use a fork and a pull request workflow:

1. Fork the [Offline App Developer Starter Kit repository](https://github.com/salesforce/offline-app-developer-starter-kit) on GitHub.
2. Read the setup and deploy instructions in the [README.md][readme]
3. Clone your fork to your local machine.
4. Create a new branch to work on. It's a best practice to use branch names that describe the feature or bug you are working on. For example, `feature/add-new-component`.
5. Ensure all tests run and your new code is covered by running `npm test`
6. Ensure there are no new eslint issues by running `npm run lint`
7. Make your changes and commit them. Be sure to write descriptive commit messages.
8. Push your changes to your fork on GitHub.
9. Open a pull request against the `main` branch of the original repository if the new feature is compatible with the current version of Salesforce Lightning Web Components. If the new feature is for a future version of Salesforce, this should be submitted against another branch which can be merged into `main` at a later date.

## Guidelines

To ensure that your contribution is accepted quickly, please follow these guidelines:

- Code should be well-documented and easy to understand.
- Code should have good unit test coverage.
- Before submitting a pull request, make sure that your changes are properly tested.
- If you are contributing a new feature, please provide documentation and usage examples in the [README.md][readme] file.
- If you are fixing a bug, please provide a description of the bug and how you fixed it.
- Pull requests should be small and focused on a single feature or bug fix. Larger pull requests should be split into smaller ones.

### New Lightning Web Components

If you are creating a new Lightning Web Component, please ensure the meta.xml file contains a masterLabel and description element.

## Code of Conduct

This project has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [Code of Conduct][conduct] before contributing.

[readme]: https://github.com/salesforce/offline-app-developer-starter-kit/blob/main/README.md
[conduct]: https://github.com/salesforce/offline-app-developer-starter-kit/blob/main/CODE_OF_CONDUCT.md