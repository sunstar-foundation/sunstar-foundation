# Sunstar Foundation Website - Project Documentation

## Executive Summary

**Sunstar Foundation Website** is a modern Franklin/Helix-based website project hosted at [https://www.sunstar-foundation.org/](https://www.sunstar-foundation.org/). This is an open-source project built on the Adobe Helix platform, featuring a component-based architecture with reusable blocks, internationalization support (English and Japanese), and comprehensive testing infrastructure.

---

## 1. Project Overview

### 1.1 Project Information
- **Name**: @sunstar/sunstar-foundation
- **Type**: Franklin/Helix Web Project
- **License**: Apache License 2.0
- **Repository**: https://github.com/sunstar-foundation/sunstar-foundation
- **Primary Author**: Adobe
- **Website**: https://www.sunstar-foundation.org/

### 1.2 Environments
- **Preview Environment**: https://main--sunstar-foundation--sunstar-foundation.aem.page/
- **Live/Production Environment**: https://main--sunstar-foundation--sunstar-foundation.aem.live/
- **SharePoint Content Source**: https://sunstarsuisse.sharepoint.com/sites/GlobalSunstarWebsite/Shared%20Documents/websites/sunstar-foundation

### 1.3 Supported Languages
- English (en)
- Japanese (jp - default)

The project automatically detects language from the URL path (`/en` for English, otherwise defaults to Japanese) and provides language-specific content routing.

---

## 2. Technology Stack

### 2.1 Core Platform
- **Framework**: Franklin/Helix (Adobe's Web Platform)
- **Content Management**: SharePoint (via fstab.yaml integration)
- **Runtime Environment**: Node.js

### 2.2 Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @babel/core | 7.22.11 | JavaScript transpilation |
| @babel/eslint-parser | 7.22.11 | ESLint Babel support |
| @web/test-runner | 0.17.1 | Test runner for JavaScript |
| eslint | 8.48.0 | JavaScript linting |
| eslint-config-airbnb-base | 15.0.0 | ESLint configuration standard |
| stylelint | 15.10.3 | CSS linting |
| stylelint-config-standard | 34.0.0 | Stylelint configuration |
| husky | 8.0.3 | Git hooks |
| lint-staged | 14.0.0 | Pre-commit linting |
| chai | 4.3.8 | Testing assertion library |
| sinon | 15.2.0 | Testing mocking/stubbing library |

### 2.3 Production Dependencies
- **fs-extra** (^11.1.1): File system utilities
- **jslinq** (^1.0.22): LINQ-style query library for JavaScript

---

## 3. Project Structure

```
sunstar-foundation/
├── blocks/                 # Reusable UI components
├── scripts/               # Core application scripts
├── styles/                # Global stylesheets
├── ext-libs/              # External JavaScript libraries
├── test/                  # Test files
├── tools/                 # Build and utility tools
├── icons/                 # Icon assets
├── package.json           # Project dependencies & scripts
├── fstab.yaml            # SharePoint content source configuration
├── README.md             # Project overview
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Community code of conduct
├── LICENSE               # Apache 2.0 license
├── head.html             # HTML head template
└── 404.html              # 404 error page
```

### 3.1 Blocks Directory (`blocks/`)

The project contains **42 reusable blocks** organized as follows:

#### Navigation & Structure Blocks
- **breadcrumb**: Breadcrumb navigation trail
- **header**: Main website header with navigation
- **footer**: Website footer
- **tabs**: Tabbed interface component
- **toc**: Table of contents

#### Content Display Blocks
- **hero**: Full-width hero section
- **hero-banner**: Hero banner with media
- **hero-event**: Event-specific hero block
- **hero-career**: Career-specific hero block
- **hero-horizontal-tabs**: Hero with horizontal tabs
- **hero-vertical-tabs**: Hero with vertical tabs
- **text**: Rich text content
- **highlight**: Highlighted/featured content
- **quote**: Quote/testimonial display
- **cards**: Card grid layout
- **list**: List content
- **table** / **standardtable**: Data table display

#### Media & Layout Blocks
- **carousel**: Image/content carousel
- **photo-carousel**: Specialized photo carousel
- **image-collage**: Image collage layout
- **columns**: Multi-column layout
- **overlapping-content**: Content with overlapping layout
- **video-column**: Video with column layout
- **embed**: External content embedding (with lite-yt-embed for YouTube)
- **spacer**: Vertical spacing element

#### Interactive Components
- **form**: Form input handling
- **link** / **link-dropdown**: Link and dropdown navigation
- **modal-fragment**: Modal dialog components
- **consent-manager**: Cookie/consent management
- **tags**: Tag/label display

#### Data & Feed Blocks
- **feed**: General content feed
- **feed-newsroom**: Newsroom-specific feed
- **event-info**: Event information display
- **kv-list**: Key-value list display

#### Specialized Blocks
- **career-apply**: Career application form
- **career-carousel**: Career opportunities carousel
- **fragment**: Fragment/partial content inclusion
- **hidden**: Hidden/conditional content
- **news-banner**: News announcement banner
- **news-banner-test**: Test variant of news banner
- **social**: Social media integration

**Block Structure**: Each block follows a consistent pattern:
- `blockname/blockname.js` - Block logic and decoration
- `blockname/blockname.css` - Block-specific styling
- Some blocks may have additional utility files (e.g., nav-tree-utils.js for header)

### 3.2 Scripts Directory (`scripts/`)

#### Core Application Scripts

**lib-franklin.js** (~894 lines)
- Core Franklin/Helix library imported from the platform
- Provides fundamental utilities and decorators:
  - `sampleRUM()`: Real User Monitoring (RUM) integration
  - `buildBlock()`: Dynamic block creation
  - `loadHeader()` / `loadFooter()`: Template component loading
  - `decorateButtons()`: Button styling enhancement
  - `decorateIcons()`: Icon rendering
  - `decorateSections()`: Section decoration
  - `decorateBlocks()`: Block registration and initialization
  - `decorateTemplateAndTheme()`: Template and theme application
  - `waitForLCP()`: Largest Contentful Paint optimization
  - `loadBlocks()`: Asynchronous block loading
  - `loadCSS()`: Dynamic stylesheet loading
  - `getMetadata()`: Page metadata extraction
  - `fetchPlaceholders()`: Placeholder text fetching
  - `createOptimizedPicture()`: Image optimization

**scripts.js** (~1130 lines)
- Main application entry point and orchestration
- Key features:
  - **LCP Optimization**: Configures blocks that affect Largest Contentful Paint
    - LCP_BLOCKS: hero, hero-banner, hero-horizontal-tabs, hero-vertical-tabs, overlapping-content, carousel, career-hero
    - SKIP_FROM_LCP: breadcrumb
  - **Language Detection & Routing**: 
    - `getLanguage()`: Detects current language from URL
    - `getLanguageFromPath()`: Parses language from pathname
    - `getLanguangeSpecificPath()`: Generates language-prefixed paths
    - Default language: Japanese
  - **External Navigation Mappings**: Configures cross-domain navigation flows
    - Maps navigation from Japanese pages to English (/dentistry) equivalents
    - Maps navigation between domains
  - **Block Initialization**: Decorates and initializes all blocks on page load
  - **Event Handling**: Navigation, form submission, interactive element management

**blocks-utils.js**
- Utility functions for block creation and manipulation
- Shared functionality across multiple blocks

**delayed.js**
- Handles delayed/deferred script loading
- Used for non-critical JavaScript resources

### 3.3 Styles Directory (`styles/`)

- **styles.css**: Main global stylesheet with page layout, typography, and base component styles
- **lazy-styles.css**: Deferred stylesheet for non-critical styles
- **fonts/**: Font asset files (likely Google Fonts or similar)

### 3.4 External Libraries Directory (`ext-libs/`)

- **jslinq/**: Bundled LINQ-to-JavaScript query library
- Managed via `.ext-libs-mapping.json` for version and source tracking
- Accessed via `/ext-libs/[library]/[file]` paths in frontend code

### 3.5 Test Directory (`test/`)

- **test/blocks/**: Block-specific test files
- **test/scripts/**: Script utility test files
- Uses Web Test Runner framework with Chai assertions and Sinon mocking

### 3.6 Tools Directory (`tools/`)

- **tools/actions/copy.js**: File copying utility for managing external dependencies
- **tools/actions/compare.js**: File comparison utility
- **tools/importer/**: Content import tools (likely for SharePoint content)
- **tools/sidekick/**: Adobe Sidekick plugin configuration for content authors

---

## 4. Build & Development Workflow

### 4.1 Package Scripts

```json
{
  "test": "wtr \"./test/**/*.test.js\" --node-resolve --port=2000 --coverage",
  "test:watch": "npm test -- --watch",
  "lint:js": "eslint .",
  "lint:css": "stylelint blocks/**/*.css styles/**/*.css",
  "lint": "npm run lint:js && npm run lint:css",
  "prepare": "husky install",
  "copy": "node ./tools/actions/copy.js",
  "compare": "node ./tools/actions/compare.js"
}
```

### 4.2 Installation & Setup

```bash
# Install dependencies
npm install

# Install Helix CLI globally
npm install -g @adobe/helix-cli

# Start local development server
hlx up
# Opens browser at http://localhost:3000
```

### 4.3 Code Quality

```bash
# Run all linting checks
npm run lint

# Lint only JavaScript
npm run lint:js

# Lint only CSS
npm run lint:css

# Auto-fix linting issues
npx eslint . --fix

# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

### 4.4 Linting Configuration

**ESLint**:
- Configuration: Airbnb base standard (`eslint-config-airbnb-base`)
- Babel support for modern JavaScript
- Runs on: `.js` files (pre-commit via husky)

**Stylelint**:
- Configuration: Standard Stylelint config
- Runs on: `blocks/**/*.css` and `styles/**/*.css`
- Enforces consistent CSS formatting

**Git Hooks** (via Husky):
- Pre-commit hooks run `lint-staged`
- Lints only staged files before commit
- Prevents linting errors from being committed

---

## 5. External Library Management

### 5.1 Adding External JavaScript Libraries

The project provides a systematic approach to adding third-party JavaScript libraries:

#### Step 1: Update package.json
```json
{
  "dependencies": {
    "jslinq": "^1.0.22"
  }
}
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Copy to Frontend Directory
```bash
npm run copy node_modules/jslinq/build ext-libs jslinq
```

#### Step 4: Register in .ext-libs-mapping.json
```json
{
  "name": "jslinq",
  "source": "node_modules/jslinq/build",
  "target": "ext-libs/jslinq"
}
```

#### Step 5: Use in Frontend Code
```javascript
await loadScript('/ext-libs/jslinq/jslinq.min.js');
```

**Rationale**: This approach ensures that only necessary browser-compatible files are shipped to the client, reducing the bundle size and avoiding node_modules bloat in production.

---

## 6. Content Source & SharePoint Integration

### 6.1 Content Configuration (fstab.yaml)

```yaml
mountpoints:
  /: https://sunstarsuisse.sharepoint.com/sites/GlobalSunstarWebsite/Shared%20Documents/websites/sunstar-foundation
```

The project is configured to pull content from a SharePoint document library. This allows content authors to manage website content directly in SharePoint without needing code deployment.

### 6.2 Content Structure
- Pages are authored as Word documents or sheets in SharePoint
- Content is automatically converted to HTML and deployed via Franklin/Helix
- Blocks are defined using special syntax/metadata in the documents

---

## 7. Performance Optimization

### 7.1 Largest Contentful Paint (LCP) Optimization

The project prioritizes rendering of specific blocks to improve LCP metrics:

```javascript
const LCP_BLOCKS = [
  'hero',
  'hero-banner',
  'hero-horizontal-tabs',
  'hero-vertical-tabs',
  'overlapping-content',
  'carousel',
  'career-hero',
];

const SKIP_FROM_LCP = ['breadcrumb'];
const MAX_LCP_CANDIDATE_BLOCKS = 2;
```

**Strategy**:
- Identifies blocks that typically represent meaningful page content
- Prioritizes loading these blocks to improve perceived performance
- Excludes decorative/navigation blocks from LCP consideration

### 7.2 Real User Monitoring (RUM)

- Integrated with Adobe's RUM tracking system
- Captures performance metrics from real users
- Helps identify bottlenecks and optimization opportunities
- Can be toggled on/off via `?rum=on` query parameter

### 7.3 Lazy Loading

- **lazy-styles.css**: Non-critical styles loaded asynchronously
- **delayed.js**: Scripts loaded on-demand, not blocking initial page render

---

## 8. Testing Framework

### 8.1 Test Infrastructure

- **Test Runner**: Web Test Runner (WTR)
- **Assertion Library**: Chai
- **Mocking Library**: Sinon
- **Port**: 2000 (configurable)
- **Coverage**: Enabled by default

### 8.2 Test Organization

```
test/
├── blocks/          # Block-specific unit tests
│   └── [blockname].test.js
└── scripts/         # Script utility tests
    └── [script].test.js
```

### 8.3 Running Tests

```bash
# Single test run with coverage
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm test -- --coverage
```

---

## 9. Visual Testing & CI/CD

### 9.1 Visual Regression Testing

The project implements GitHub Actions-based visual testing:

**Workflow**: `.github/workflows/visual-tests.yaml`

**How It Works**:
- Triggered on every PR submission or modification
- Captures screenshots on the PR branch
- Compares against main branch screenshots
- Fails the PR if significant visual differences are detected

**Screenshot Sources**:
1. **Block Library**: https://main--sunstar-foundation--sunstar-foundation.aem.page/tools/sidekick/library.html
2. **Test Paths**: Configurable list of URLs to capture

**Configuration Example**:
```yaml
env:
  TEST_PATHS: "/ /career/yuya-yoshisue /brands"
```

**Best Practices**:
- Add affected pages to TEST_PATHS when making visual changes
- Ensure adequate coverage before submitting PRs
- Visual changes without test coverage will cause PR rejection

---

## 10. Contributing Guide

### 10.1 Project Standards

**Process**: Commit-then-review
- Approved maintainers can merge immediately
- Changes will be reviewed by others afterward
- Non-maintainers require maintainer approval before merge

### 10.2 Contributing Process

1. **Check for Existing Issues**: Ensure an issue exists in GitHub Issues
2. **Check for PR Conflicts**: Avoid overlapping with existing PRs
3. **Fork Repository**: Create your own fork
4. **Create Feature Branch**: Work on a descriptive branch
5. **Submit Pull Request**: Use PR template from `.github/pull_request_template.md`

### 10.3 PR Requirements

- **Start with Issue ID**: e.g., `#123: Description`
- **Outline Intent**: What the changes intend to accomplish
- **Explain Changes**: How they modify existing code
- **Document Breaking Changes**: Note any breaking changes
- **Add Visual Test Coverage**: Include affected paths in TEST_PATHS
- **Follow Coding Standards**: Must pass `npm run lint`

### 10.4 Coding Standards

**Code Style**:
- JavaScript: ESLint with Airbnb configuration
- CSS: Stylelint with standard configuration
- Automatic formatting: `npx eslint . --fix`

**Commit Messages**:
- Include issue ID: `#123`
- Trivial changes: Use `[trivial]` tag
- Example: `#123: Fix breadcrumb styling [trivial]`

### 10.5 Contributor Requirements

- **Code of Conduct**: Must adhere to Adobe's Code of Conduct (see CODE_OF_CONDUCT.md)
- **Contributor License Agreement**: Required for all third-party contributions
- **Contact**: Report CoC violations to cstaub@adobe.com

---

## 11. Block Architecture & Development

### 11.1 Block Pattern

Each block follows a consistent structure:

```
blockname/
├── blockname.js    # Block decoration and logic
├── blockname.css   # Block-specific styles
└── [optional additional files]
```

### 11.2 Block Lifecycle

1. **HTML Definition**: Block is defined in authored content (Word doc/SharePoint)
2. **Block Registration**: `decorateBlocks()` registers the block with the system
3. **Decoration**: Block's `.js` file is loaded and executed
4. **Styling**: Block-specific CSS is applied
5. **Interaction**: Event handlers and dynamic behavior initialize

### 11.3 Common Block Patterns

**Navigation Blocks**: header, footer, breadcrumb, link-dropdown
- Manage site navigation and user flow
- May have complex nested structures

**Content Blocks**: text, highlight, quote, cards, list
- Display authored content
- Handle markdown/rich text rendering

**Media Blocks**: carousel, photo-carousel, video-column, embed
- Manage images and videos
- Handle responsive sizing and optimization

**Layout Blocks**: columns, spacer, overlapping-content
- Control page layout and spacing
- Use CSS Grid or Flexbox

**Interactive Blocks**: form, modal-fragment, consent-manager, tabs
- Handle user interaction
- Manage state and validation

**Data Blocks**: feed, feed-newsroom, event-info
- Aggregate and display dynamic content
- May fetch data from external sources

### 11.4 Block Examples

**Header Block** (`blocks/header/header.js`):
- Loads top, middle, and bottom navigation
- Handles responsive mobile menu
- Manages mega-dropdowns
- Decorates top nav items
- Implements fixed positioning on scroll

**Hero Block** (`blocks/hero/hero.js`):
- Full-width hero section with optional image
- LCP-optimized (high priority for rendering)
- Often appears above the fold

---

## 12. Language & Internationalization

### 12.1 Language Detection

**Language Extraction** (from URL):
```
/en/about-us      → English
/about-us         → Japanese (default)
/en               → English
/                 → Japanese
```

**API**: `getLanguage()` / `getLanguageFromPath()`

### 12.2 Language-Specific Content

**Path Generation**: `getLanguangeSpecificPath(path)`
- Automatically adds `/en/` prefix for English content
- Returns path unchanged for Japanese

### 12.3 External Navigation

The project manages cross-domain navigation via mappings:

```javascript
const externalNavigationMappings = [
  ['/', '/dentistry'],              // JP home → Dentistry
  ['/grants', '/dentistry'],        // JP grants → Dentistry
  ['/', '/en'],                     // JP home → EN home
  ['/en', '/'],                     // EN home → JP home
];
```

**Use Case**: Links opening in new tabs when navigating between language versions or related properties.

---

## 13. Configuration Files

### 13.1 fstab.yaml
```yaml
mountpoints:
  /: https://sunstarsuisse.sharepoint.com/sites/GlobalSunstarWebsite/Shared%20Documents/websites/sunstar-foundation
```
Maps the root path to the SharePoint content source.

### 13.2 helix-query.yaml
Defines query rules for extracting structured data from content.

### 13.3 helix-sitemap.yaml
Configuration for sitemap generation (SEO).

### 13.4 .ext-libs-mapping.json
Maps external JavaScript libraries to their locations:
```json
[
  {
    "name": "jslinq",
    "source": "node_modules/jslinq/build",
    "target": "ext-libs/jslinq"
  }
]
```

### 13.5 package.json
Defines project metadata, scripts, and dependencies.

---

## 14. Metadata & SEO

### 14.1 Page Metadata

The system extracts metadata from page documents:
- Title (from heading)
- Description
- Keywords
- Robots directives
- Open Graph tags
- Structured data

**Access**: `getMetadata(name)` utility function

### 14.2 Robots Configuration

- `robots.txt`: Standard robots exclusion file
- Configured per `helix-query.yaml`

### 14.3 Sitemap

- `sitemap-index.xml`: Index of sitemaps
- Auto-generated via `helix-sitemap.yaml`
- Helps search engines crawl all pages

---

## 15. Error Handling

### 15.1 404 Error Page

- `404.html`: Custom 404 error template
- Displayed when pages are not found
- Can be customized with branding and helpful links

### 15.2 Error Prevention

- Code linting prevents common errors
- Tests catch regressions
- Visual testing prevents UI breaks

---

## 16. Development Workflow Best Practices

### 16.1 Local Development

```bash
# Install dependencies
npm install

# Install Helix CLI
npm install -g @adobe/helix-cli

# Start development server
hlx up

# In another terminal, watch for changes
npm run test:watch

# In another terminal, run linting in watch mode
npm run lint
```

### 16.2 Making Changes

1. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Make Changes**: Edit block files, styles, or scripts
3. **Test Locally**: View changes at http://localhost:3000
4. **Run Linting**: `npm run lint` (or auto-fix with `npx eslint . --fix`)
5. **Run Tests**: `npm test`
6. **Commit Changes**: `git commit -m "#123: Your feature description"`
7. **Push to Fork**: `git push origin feature/your-feature-name`
8. **Create PR**: Submit PR with description and affected test paths

### 16.3 Code Review Checklist

- [ ] Code passes linting (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] New visual changes included in TEST_PATHS
- [ ] PR starts with issue ID
- [ ] Breaking changes documented
- [ ] Follows Airbnb style guide
- [ ] No console warnings/errors

---

## 17. Troubleshooting

### 17.1 Common Issues

**Issue**: `hlx up` command not found
- **Solution**: Install Helix CLI: `npm install -g @adobe/helix-cli`

**Issue**: Linting errors on commit
- **Solution**: Run `npm run lint` and fix issues, or use `npx eslint . --fix`

**Issue**: Tests fail in CI
- **Solution**: Run locally with `npm test`, check coverage

**Issue**: Block not rendering
- **Solution**: Check block structure, verify block.js exists, check console errors

### 17.2 Debugging

- **Browser DevTools**: F12 to inspect elements and debug JavaScript
- **Console Logs**: Use `console.log()` for debugging (will be visible in browser console)
- **Network Tab**: Check for failed resource loads
- **Performance Tab**: Profile rendering performance

---

## 18. Project Statistics

| Metric | Value |
|--------|-------|
| Total Blocks | 42 |
| Core Scripts | 4 (lib-franklin.js, scripts.js, blocks-utils.js, delayed.js) |
| Supported Languages | 2 (English, Japanese) |
| Development Dependencies | 16+ |
| Production Dependencies | 2 |
| Environments | 2 (Preview, Live) |
| Test Port | 2000 |
| CSS Linting Coverage | blocks/**, styles/** |
| JS Linting Coverage | entire repo |

---

## 19. Key Concepts & Terminology

| Term | Definition |
|------|-----------|
| **Block** | Reusable UI component consisting of HTML markup and JS/CSS logic |
| **Fragment** | Partial page content that can be included in multiple pages |
| **Decoration** | Process of enhancing HTML with behavior and styling |
| **LCP** | Largest Contentful Paint - web performance metric |
| **RUM** | Real User Monitoring - production performance tracking |
| **Helix** | Adobe's Web Platform for content and code management |
| **Franklin** | Helix's content delivery framework |
| **fstab** | File system table mapping content sources |
| **Sidekick** | Content authoring tool integrated with Franklin |

---

## 20. Resources & Links

### Official Documentation
- [Adobe Helix Documentation](https://www.hlx.live/)
- [Helix CLI Repository](https://github.com/adobe/helix-cli)
- [Franklin Project Boilerplate](https://github.com/adobe/helix-project-boilerplate)

### Community
- [GitHub Repository](https://github.com/sunstar-foundation/sunstar-foundation)
- [Issue Tracker](https://github.com/sunstar-foundation/sunstar-foundation/issues)
- [Project Website](https://www.sunstar-foundation.org/)

### Tools & Services
- [Real User Monitoring (RUM)](https://rum.hlx.page/)
- [Adobe Sidekick](https://www.aem.live/)
- [SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint)

---

## Conclusion

The Sunstar Foundation Website is a well-structured, modern web project built on Franklin/Helix. It demonstrates best practices in:
- Component-based architecture
- Code quality and linting
- Performance optimization
- Testing and visual regression detection
- Internationalization support
- Content management integration
- Collaborative development workflows

The project welcomes contributions following open development principles and maintains high code quality standards through automated tooling and review processes.

---

**Document Version**: 1.0  
**Last Updated**: February 3, 2026  
**Scope**: Complete project documentation covering architecture, development, testing, and contribution guidelines
