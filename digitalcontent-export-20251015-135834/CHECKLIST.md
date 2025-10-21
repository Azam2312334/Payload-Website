# Migration Checklist

## Pre-Migration
- [ ] Backup your target project
- [ ] Confirm target uses Next.js 15
- [ ] Check if target uses Pages Router or App Router

## File Copy
- [ ] Copy pages/digitalcontent.jsx to target
- [ ] Copy locales/ to target/public/locales/
- [ ] Copy public/images/ to target
- [ ] Copy public/pdf/ to target
- [ ] Copy src/components/ to target
- [ ] Copy src/contexts/ to target

## Code Updates
- [ ] Update all Link components (remove <a> tags)
- [ ] Update import paths
- [ ] Configure i18n
- [ ] Test locally

## Testing
- [ ] Page loads at /digitalcontent
- [ ] No console errors
- [ ] All images display
- [ ] All PDFs download
- [ ] Language switching works (EN/MS)
- [ ] Links work
- [ ] Mobile responsive
- [ ] Build succeeds (npm run build)

## Deployment
- [ ] Test on staging
- [ ] Deploy to production
