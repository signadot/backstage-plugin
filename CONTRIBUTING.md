# Contributing to the Signadot Backstage Plugin

We welcome contributions to the Signadot Backstage plugin! This document outlines the process for contributing to the project, including how to report bugs, suggest features, and submit pull requests.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn package manager
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/backstage-plugin.git
   cd backstage-plugin
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running the Plugin Locally

You can serve the plugin in isolation for development:

```bash
yarn start
```

This provides quicker iteration speed and faster startup with hot reloads. The development setup can be found in the `/dev` directory.

## How to Contribute

### Reporting Bugs

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details**:
   - Backstage version
   - Node.js version
   - Browser (if applicable)
   - Operating system
5. **Screenshots or logs** if relevant

Create a new issue using the "Bug report" template and fill out all the requested information.

### Suggesting Features

We welcome feature suggestions! When proposing new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and why it would be valuable
3. **Provide examples** of how the feature would work
4. **Consider the impact** on existing functionality

Create a new issue using the "Feature request" template.

### Submitting Pull Requests

#### Before Submitting

1. **Ensure your code follows the project's coding standards**
2. **Add tests** for new functionality
3. **Update documentation** as needed
4. **Run the test suite** to ensure nothing is broken:
   ```bash
   yarn test
   ```
5. **Run linting** to check code quality:
   ```bash
   yarn lint
   ```

#### Pull Request Process

1. **Create a descriptive title** that clearly explains what the PR does
2. **Write a detailed description** including:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Any breaking changes
3. **Link related issues** using keywords like "Fixes #123" or "Closes #456"
4. **Request review** from maintainers
5. **Address feedback** promptly and thoroughly

#### Code Style Guidelines

- Follow the existing code style and patterns
- Use TypeScript for type safety
- Write clear, self-documenting code
- Add JSDoc comments for public APIs
- Use meaningful variable and function names
- Keep functions small and focused

### Testing

#### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

#### Writing Tests

- Write unit tests for new components and utilities
- Test both happy path and edge cases
- Use descriptive test names
- Mock external dependencies appropriately
- Aim for good test coverage

### Documentation

When contributing, please ensure:

- **README.md** is updated if you add new features or change existing behavior
- **Code comments** explain complex logic
- **Type definitions** are clear and well-documented
- **Examples** are provided for new features

## Community Guidelines

### Code of Conduct

This project follows the [Backstage Code of Conduct](https://github.com/backstage/backstage/blob/master/CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

### Communication

- **Be respectful** and constructive in all interactions
- **Be patient** with maintainers and other contributors
- **Ask questions** if something is unclear
- **Help others** when you can

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Signadot Community**: Join our [Slack community](https://signadotcommunity.slack.com/join/shared_invite/zt-1estxm8pv-qfiaNfiFFCaW~eUlXsVoEQ#/shared-invite/email) for real-time help

## Release Process

### Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Schedule

- Releases are made as needed based on contributions
- Security fixes are prioritized and released quickly
- Feature releases are planned based on community feedback

## Recognition

Contributors will be recognized in:
- Release notes
- CONTRIBUTORS.md file
- Project documentation

## Questions?

If you have any questions about contributing, please:

1. Check this document first
2. Search existing issues and discussions
3. Create a new issue with the "Question" label
4. Join our [Slack community](https://signadotcommunity.slack.com/join/shared_invite/zt-1estxm8pv-qfiaNfiFFCaW~eUlXsVoEQ#/shared-invite/email)

Thank you for contributing to the Signadot Backstage plugin! 🚀
