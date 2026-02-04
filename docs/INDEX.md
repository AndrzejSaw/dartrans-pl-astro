# 📚 Documentation Index

Welcome to the DARTRANS & HENZEL project documentation. This index helps you quickly find the information you need.

---

## 🚀 Getting Started

### New to the Project?

1. **Start here:** [README.md](../README.md) - Project overview and quick start
2. **For developers:** [docs/QUICKSTART-RU.md](QUICKSTART-RU.md) - Quick reference guide (Russian)
3. **For Copilot users:** [docs/COPILOT-EXAMPLES.md](COPILOT-EXAMPLES.md) - How to work with GitHub Copilot

### Essential Documentation

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [.github/copilot-instructions.md](../.github/copilot-instructions.md) | Complete project reference for GitHub Copilot | Before starting any development |
| [README.md](../README.md) | Project setup and overview | First time setup |

---

## 📖 Core Documentation

### 🧩 Component Development
**[docs/COMPONENTS.md](COMPONENTS.md)**

Learn about:
- All Astro components in the project
- Component props and interfaces
- Usage examples and patterns
- Component interaction flow
- Best practices for creating new components

**Read when:**
- Creating new UI components
- Modifying existing components
- Understanding component architecture
- Need component examples

### 🔌 API Development
**[docs/API.md](API.md)**

Learn about:
- API endpoint specifications
- Request/response schemas
- Zod validation rules
- Rate limiting implementation
- CRM integration details
- Security patterns

**Read when:**
- Creating new API endpoints
- Debugging API issues
- Implementing form validation
- Working with CRM integration
- Setting up rate limiting

### 🎨 Styling & Design
**[docs/STYLING.md](STYLING.md)**

Learn about:
- Design system tokens
- Tailwind CSS usage patterns
- DaisyUI component library
- Typography scale
- Color palette
- Responsive design
- Animation patterns

**Read when:**
- Styling new components
- Customizing existing styles
- Working with forms and buttons
- Creating responsive layouts
- Implementing animations

---

## 🤖 GitHub Copilot Resources

### Main Reference
**[.github/copilot-instructions.md](../.github/copilot-instructions.md)**

Comprehensive guide for GitHub Copilot containing:
- Project overview and business context
- Complete tech stack details
- Architecture and data flow
- Code standards and conventions
- Common patterns and anti-patterns
- Performance optimization rules
- Security best practices

**This is the primary file that GitHub Copilot uses to understand your project.**

### Practical Examples
**[docs/COPILOT-EXAMPLES.md](COPILOT-EXAMPLES.md)**

Real-world examples of:
- How to ask Copilot for help
- Component creation prompts
- API development examples
- Debugging strategies
- Refactoring patterns
- Code explanation requests

**Use this for:**
- Learning effective prompts
- Getting better Copilot suggestions
- Understanding expected outputs
- Common development scenarios

---

## 🎯 Quick Reference by Task

### I want to...

#### Create a new component
1. Read: [COMPONENTS.md - Component Creation Checklist](COMPONENTS.md#component-creation-checklist)
2. Reference: [STYLING.md - Component Patterns](STYLING.md#component-patterns)
3. Ask Copilot: *"Create a [component name] following project patterns"*

#### Add a new API endpoint
1. Read: [API.md - API Routes](API.md#api-routes)
2. Check: [API.md - Security](API.md#security)
3. Ask Copilot: *"Create API endpoint for [feature] with validation and rate limiting"*

#### Style a component
1. Read: [STYLING.md - Tailwind Best Practices](STYLING.md#tailwind-best-practices)
2. Check: [STYLING.md - DaisyUI Components](STYLING.md#daisyui-components)
3. Ask Copilot: *"Style this component following project design system"*

#### Fix a bug
1. Check: [COPILOT-EXAMPLES.md - Debugging](COPILOT-EXAMPLES.md#debugging)
2. Ask Copilot: *"Debug [issue] in [component/file]"*

#### Optimize code
1. Check: [copilot-instructions.md - Performance](../.github/copilot-instructions.md#performance-optimization)
2. Ask Copilot: *"Optimize this code following project patterns"*

#### Understand existing code
1. Ask Copilot: *"Explain [component/function] in this project"*
2. Reference: Relevant docs section

---

## 📋 Documentation Standards

### When to Update Documentation

Update documentation when you:
- Add new components
- Create new API endpoints
- Introduce new patterns
- Change design system
- Add dependencies
- Modify architecture

### Documentation Files to Update

| Change Type | Files to Update |
|-------------|-----------------|
| New component | `COMPONENTS.md` |
| New API endpoint | `API.md` |
| New styling pattern | `STYLING.md` |
| New development pattern | `copilot-instructions.md` |
| Project structure change | `README.md`, `copilot-instructions.md` |

---

## 🔍 Find by Topic

### Architecture
- **Overview:** [copilot-instructions.md - Architecture](../.github/copilot-instructions.md#architecture)
- **Data Flow:** [API.md - Request Flow](API.md#architecture)

### Business Logic
- **Requirements:** [copilot-instructions.md - Business Context](../.github/copilot-instructions.md#business-context)
- **Forms:** [COMPONENTS.md - LeadForm](COMPONENTS.md#leadformastro)
- **Validation:** [API.md - Validation Rules](API.md#validation-rules-zod)

### Design System
- **Colors:** [STYLING.md - Color Palette](STYLING.md#color-palette)
- **Typography:** [STYLING.md - Typography](STYLING.md#typography)
- **Components:** [STYLING.md - Component Patterns](STYLING.md#component-patterns)

### Performance
- **Overview:** [copilot-instructions.md - Performance](../.github/copilot-instructions.md#performance-optimization)
- **Images:** [STYLING.md - Images](STYLING.md) (search for "Image")
- **Fonts:** [STYLING.md - Font Loading](STYLING.md#font-loading)

### Security
- **API Security:** [API.md - Security](API.md#security)
- **Rate Limiting:** [API.md - Rate Limiting](API.md#rate-limiting)
- **Validation:** [API.md - Validation](API.md#validation-rules-zod)

### Analytics
- **GTM Setup:** [copilot-instructions.md - Analytics](../.github/copilot-instructions.md#analytics--tracking)
- **Events:** [COMPONENTS.md - GTM Tracking](COMPONENTS.md) (search for "GTM")

---

## 🌍 Language Guide

### Main Documentation (English)
All technical documentation is in English:
- `.github/copilot-instructions.md`
- `docs/COMPONENTS.md`
- `docs/API.md`
- `docs/STYLING.md`
- `docs/COPILOT-EXAMPLES.md`

### Quick Reference (Russian)
- `docs/QUICKSTART-RU.md` - Quick start guide in Russian

### Why English?
- International development team
- GitHub Copilot works best with English
- Industry standard for technical docs
- Better compatibility with AI tools

---

## 📞 Support

### Documentation Issues
If you find:
- Missing information
- Outdated content
- Errors or typos
- Unclear explanations

Please update the relevant file and commit the change.

### Getting Help

1. **Check documentation first** - Use this index to find relevant docs
2. **Ask GitHub Copilot** - Use examples from COPILOT-EXAMPLES.md
3. **Review existing code** - Look for similar implementations
4. **Refer to external docs** - Links provided in each document

---

## 🔗 External Resources

### Official Documentation
- **Astro:** https://docs.astro.build
- **Tailwind CSS:** https://tailwindcss.com/docs
- **DaisyUI:** https://daisyui.com/components
- **Alpine.js:** https://alpinejs.dev
- **Zod:** https://zod.dev

### GitHub Copilot
- **Official Docs:** https://docs.github.com/en/copilot
- **Best Practices:** https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/

---

## 📅 Documentation Maintenance

### Last Major Update
**Date:** February 4, 2026  
**Version:** 1.0  
**Maintainer:** Development Team

### Update Frequency
- **After major features:** Update relevant docs immediately
- **Monthly review:** Check for outdated content
- **Before releases:** Verify all docs are current

### Documentation Versioning
Documentation follows project version in `package.json`:
- **Current Version:** 0.0.1
- **Last Docs Update:** 2026-02-04

---

## ✅ Documentation Checklist

Before starting development, ensure you've:
- [ ] Read README.md
- [ ] Reviewed .github/copilot-instructions.md
- [ ] Checked relevant docs (Components/API/Styling)
- [ ] Understood project patterns
- [ ] Set up environment variables
- [ ] Tested GitHub Copilot integration

---

**Quick Links:**
[README](../README.md) | 
[Copilot Guide](../.github/copilot-instructions.md) | 
[Components](COMPONENTS.md) | 
[API](API.md) | 
[Styling](STYLING.md) | 
[Examples](COPILOT-EXAMPLES.md)
