# Contributing to Bookbridge Dashboard

Thanks for your interest in contributing to Bookbridge Dashboard! This is a personal project, but I welcome contributions from the community.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submission Guidelines](#submission-guidelines)
- [Code Guidelines](#code-guidelines)
- [Contact](#contact)

## Getting Started

This is a personal project that I maintain in my spare time. While I appreciate contributions, please understand that:

- Response times may vary depending on my availability
- I may be selective about which features/changes to accept
- The project direction is ultimately guided by my vision and needs

### Ways to Help

- 🐛 **Bug Reports**: Found something broken? Let me know!
- 💡 **Feature Suggestions**: Have an idea? I'd love to hear it!
- 📝 **Documentation**: Help improve [README](README.md), comments, or examples
- 🔧 **Bug Fixes**: Small fixes are always welcome
- ✨ **Small Features**: Simple enhancements that fit the project scope

## How to Contribute

### Reporting Issues

Before opening an issue, please:
- Check if the issue already exists
- Provide clear steps to reproduce the problem
- Include your environment details (OS, versions, etc.)
- Add screenshots if it helps explain the issue

### Suggesting Features

I'm open to feature suggestions! Please:
- Explain the use case and why it would be valuable
- Keep suggestions aligned with the project's purpose
- Understand that I may not implement every suggestion

### Contributing Code

For code contributions:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes** following the code guidelines
4. **Test your changes** thoroughly
5. **Submit a pull request** with a clear description

## Development Setup

### Prerequisites

- NodeJs (version v18.18.0+)
- Firebase account (Firestore, Auth, Storage)
- Cloudinary account

### Quick Start

```bash
# Fork and clone the repo
git clone [https://github.com/deaneeth/bookbridge-dashboard]
cd bookbridge-dashboard

# Install dependencies
npm install

# Add your Firebase config to `.env.local`
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# (other required variables)

# Start the dev server
npm run dev
```

## Submission Guidelines

### Pull Requests

Keep PRs focused and manageable:
- **One feature/fix per PR** - easier to review and merge
- **Clear title and description** - explain what and why
- **Test your changes** - make sure everything works
- **Follow existing code style** - consistency is key
- **Update docs if needed** - help others understand your changes

### Commit Messages

Use clear, descriptive commit messages:
```
Add user input validation
Fix navbar responsive design
Update README installation steps
```

No need for fancy commit conventions - just be clear and concise!

## Code Guidelines

### General Principles

- **Keep it simple** - prefer readable code over clever code
- **Follow existing patterns** - maintain consistency with the codebase
- **Comment when necessary** - explain the "why" not the "what"
- **Test important functionality** - especially for bug fixes

### Code Style

- Follow the existing code formatting in the project
- Use meaningful variable and function names
- Keep functions small and focused
- Remove unused code and imports

### File Structure

Please maintain the existing project structure and naming conventions.

## What I'm Looking For

### ✅ Great Contributions

- Bug fixes with clear explanations
- Small, focused improvements
- Documentation updates
- Performance optimizations
- Code cleanup and refactoring

### ⚠️ Please Discuss First

- Large feature additions
- Breaking changes
- Major architectural changes
- New dependencies

### ❌ Not Suitable

- Changes that don't align with project goals
- Overly complex solutions for simple problems
- Features that significantly increase maintenance burden

## Contact

This is a personal project, so communication is informal:

- **Issues**: Use GitHub issues for bugs and feature requests
- **Quick questions**: Feel free to open a discussion
- **Direct contact**: dnethusahan.h05@gmail.com (for urgent matters only)

### Response Time

Since this is a personal project:
- I'll try to respond to issues within a few days
- PR reviews may take up to a week
- Complex features might take longer to evaluate

## Project Status

**Current Status**: [Active Development / Maintenance Mode / Experimental]

**My Focus**: [Brief description of what you're currently working on or prioritizing]

## Recognition

Contributors will be:
- Mentioned in the commit/PR
- Added to a contributors section if the project grows
- Given credit in release notes for significant contributions

## License

By contributing, you agree that your contributions will be licensed under the same license as this project: [LICENSE](LICENSE).

---

## Final Notes

This project reflects my personal interests and learning journey. While I welcome contributions, I reserve the right to decline changes that don't fit my vision for the project. 

That said, I genuinely appreciate anyone who takes the time to contribute, whether through code, bug reports, or suggestions. Thank you! 🙏

**Questions?** Don't hesitate to open an issue or discussion!