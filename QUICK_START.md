# Quick Start Guide - Digital Content Page

## ✨ What You Have Now

### 📁 Files Created/Updated

```
✅ src/collections/blocks/DigitalContentBlocks.ts  (NEW)
   - 10 Payload CMS block definitions

✅ src/collections/Pages.ts  (UPDATED)
   - Added digitalContent page type
   - Imported Digital Content blocks

✅ src/app/(frontend)/digitalcontent/page.tsx  (NEW)
   - Frontend rendering page
   - Fetches and displays all blocks

✅ DIGITAL_CONTENT_IMPLEMENTATION.md  (NEW)
   - Complete implementation guide
```

---

## 🚀 Quick Start (5 Steps)

### 1️⃣ Start Development Server
```bash
npm run dev
```

### 2️⃣ Open Payload Admin
Navigate to: `http://localhost:3000/admin`

### 3️⃣ Create the Page
1. Go to **Pages** → **Create New**
2. Fill in:
   - **Title**: `Digital Content`
   - **Slug**: `digitalcontent`
   - **Page Type**: `Custom Layout - Digital Content`
3. Click **Save**

### 4️⃣ Add Your First Block
1. Scroll to **Blocks** section
2. Click **Add Block**
3. Choose `Digital Content Hero`
4. Fill in:
   - **Banner Text**: "Pushing Malaysia's Digital Creators to New Heights"
   - **Banner Description**: "Shining the spotlight on creativity"
   - **Background Image**: Upload an image
5. Click **Save**

### 5️⃣ View Your Page
Navigate to: `http://localhost:3000/digitalcontent`

---

## 🎨 Available Blocks

When adding blocks in Payload admin, you'll see these options:

### For About Page (existing):
- `hero` - Hero banner
- `contentSection` - Content with heading
- `featuresGrid` - Features grid

### For Digital Content Page (new):
- `digitalContentHero` - Hero with CTA
- `focusArea` - 4 focus areas grid
- `globalChampion` - Text + image
- `nationalImpact` - Statistics display
- `industrySize` - Company counts
- `ourHighlights` - Highlight cards
- `programmesInitiatives` - Programme cards
- `ourPublications` - PDF downloads
- `getInTouch` - Contact CTA
- `faq` - FAQ section

---

## 📸 Content from Original Site

Reference the original content here:
- **JSON**: `digitalcontent-export/locales/digitalcontent/en.json`
- **Images**: `digitalcontent-export/public/images/digital-content/`
- **PDFs**: `digitalcontent-export/public/pdf/digitalcontent/`

---

## 🎯 Recommended Block Order

Add blocks in this sequence for best layout:

1. **digitalContentHero** (Hero banner)
2. **focusArea** (4 focus areas)
3. **globalChampion** (About section)
4. **nationalImpact** (Statistics)
5. **industrySize** (Company counts)
6. **ourHighlights** (6 highlight cards)
7. **programmesInitiatives** (8 programmes)
8. **ourPublications** (6 PDF reports)
9. **getInTouch** (Contact CTA)
10. **faq** (Optional - FAQ)

---

## 💡 Pro Tips

### Uploading Media
- Upload all images to **Media** collection first
- Then reference them in blocks
- Use descriptive alt text for SEO

### Content Entry
- Copy text from `en.json` file
- Paste into corresponding block fields
- Keep formatting consistent

### Testing
- Save frequently
- Check frontend after each major change
- Test on mobile view

### Performance
- Optimize images before upload
- Use WebP format when possible
- Keep PDFs under 10MB

---

## 🔧 Customization Ideas

### Styling
```typescript
// Add to page.tsx or create CSS module
import styles from './digitalcontent.module.css'
```

### Adding More Fields
Edit `DigitalContentBlocks.ts` to add:
- Colors
- Icons
- Videos
- Custom layouts

### Language Switcher
Enable Payload localization:
```typescript
// In payload.config.ts
localization: {
  locales: ['en', 'ms'],
  defaultLocale: 'en',
}
```

---

## 🐛 Common Issues

### "Page not found"
- ✅ Check page exists in admin
- ✅ Verify slug is `digitalcontent`
- ✅ Ensure pageType is `digitalContent`

### Blocks not showing
- ✅ Save the page after adding blocks
- ✅ Refresh frontend page
- ✅ Check browser console

### Images not loading
- ✅ Upload to Media collection first
- ✅ Select in block image field
- ✅ Check image URL in Media collection

---

## 📞 Need Help?

Check these files:
1. `DIGITAL_CONTENT_IMPLEMENTATION.md` - Full guide
2. `src/collections/blocks/DigitalContentBlocks.ts` - Block definitions
3. `src/app/(frontend)/digitalcontent/page.tsx` - Frontend code
4. `digitalcontent-export/locales/digitalcontent/en.json` - Original content

---

**Ready to go!** 🎉

Start by creating the page in Payload admin, then add blocks one by one.
