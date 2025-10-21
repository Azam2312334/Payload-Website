# Digital Content Page Export

**Generated:** 2025-10-15 13:58:36

## Contents

- Main page: pages/digitalcontent.jsx
- Translations: locales/digitalcontent/ (EN + MS)
- Images: 2 files
- PDFs: 6 files
- Components: 1 folders
- Config files: 3 files

## Installation

1. Copy files to your Next.js 15 project
2. Install dependencies:
   ```bash
   npm install i18next@^25.5.3 react-i18next@^15.1.3 next-i18next@^15.3.0
   ```

3. Update import paths if needed
4. Test at: http://localhost:3000/digitalcontent

## Breaking Changes for Next.js 15

### Link Components (IMPORTANT!)
Change all Link components:

```jsx
// OLD (Next 12)
<Link href="/page">
  <a>Click me</a>
</Link>

// NEW (Next 15)
<Link href="/page">
  Click me
</Link>
```

### i18n Configuration
- Update i18n initialization in _app.js
- Use config files from config/ folder

## Need Help?

See EXPORT_TO_NEXTJS15_GUIDE.md in parent folder for detailed migration guide.

Contact: clic@mdec.com.my
