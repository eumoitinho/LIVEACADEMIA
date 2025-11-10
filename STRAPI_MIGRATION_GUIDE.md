# Migration Guide: Sanity → Strapi

This guide explains how to migrate from Sanity CMS to Strapi CMS for the Live Academia project.

## Why Migrate to Strapi?

✅ **Better Visual Editing**: Strapi offers a more intuitive WYSIWYG editor
✅ **Self-Hosted**: Full control over your data and infrastructure
✅ **No Vendor Lock-in**: Open source with no pricing tiers
✅ **Better Media Management**: Advanced media library with folders and tags
✅ **Customizable**: Extend with custom plugins and middleware
✅ **GraphQL & REST**: Support for both API types

## Migration Overview

The migration involves:
1. ✅ **Content Type Creation** - All Sanity schemas recreated in Strapi
2. ⏳ **Data Migration** - Transfer existing content from Sanity to Strapi
3. ⏳ **Code Updates** - Update all components to use Strapi instead of Sanity
4. ⏳ **Testing** - Verify all pages work correctly
5. ⏳ **Deployment** - Deploy Strapi and update production

## Content Type Mapping

### Sanity → Strapi Content Types

| Sanity Schema | Strapi Content Type | Status |
|---------------|---------------------|--------|
| `globalSettings` | `global-setting` (singleton) | ✅ Created |
| `homepage` | `homepage` (singleton) | ✅ Created |
| `unit` | `unit` (collection) | ✅ Created |
| `plan` | `plan` (collection) | ✅ Created |
| `modality` | `modality` (collection) | ✅ Created |
| `benefit` | `benefit` (collection) | ✅ Created |
| `testimonial` | `testimonial` (collection) | ✅ Created |
| `contactPage` | `contact-page` (singleton) | ✅ Created |
| `aboutPage` | `about-page` (singleton) | ✅ Created |
| `trabalheConoscoPage` | `trabalhe-conosco-page` (singleton) | ✅ Created |
| `dayUsePage` | `day-use-page` (singleton) | ✅ Created |

## Step-by-Step Migration

### Phase 1: Setup (✅ Complete)

1. ✅ Install Strapi
2. ✅ Create all content types
3. ✅ Configure API permissions
4. ✅ Create Next.js integration library

### Phase 2: Data Migration (⏳ In Progress)

#### Option A: Manual Migration (Recommended for small datasets)

1. **Start Strapi**:
   ```bash
   pnpm strapi:dev
   ```

2. **Open both admin panels**:
   - Sanity: http://localhost:3333
   - Strapi: http://localhost:1337/admin

3. **Migrate content manually** (copy-paste):
   - Global Settings
   - Homepage sections
   - Units (35+)
   - Plans
   - Modalities
   - Benefits
   - Testimonials
   - All pages

#### Option B: Automated Migration (Coming Soon)

We're creating a migration script to automate this:

```bash
pnpm strapi:migrate
```

This will:
- Fetch all content from Sanity
- Transform to Strapi format
- Upload via Strapi API
- Generate migration report

### Phase 3: Code Updates (⏳ To Do)

Update each page to use Strapi instead of Sanity:

#### Before (Sanity):
```typescript
import { client } from '@/lib/sanity';

const units = await client.fetch(`*[_type == "unit"]`);
```

#### After (Strapi):
```typescript
import { getUnits } from '@/lib/strapi';

const response = await getUnits();
const units = response.data;
```

#### Files to Update:

- [ ] `app/page.tsx` - Homepage
- [ ] `app/unidades/page.tsx` - Units listing
- [ ] `app/unidades/[slug]/page.tsx` - Unit detail
- [ ] `app/planos/page.tsx` - Plans page
- [ ] `app/aulas-coletivas/page.tsx` - Modalities page
- [ ] `app/contato/page.tsx` - Contact page
- [ ] `app/sobre/page.tsx` - About page
- [ ] `app/trabalhe-conosco/page.tsx` - Careers page
- [ ] `app/day-use/page.tsx` - Day use page
- [ ] `components/*-section.tsx` - All section components
- [ ] `components/layout/header.tsx` - Header (global settings)
- [ ] `components/layout/footer.tsx` - Footer (global settings)

### Phase 4: Testing (⏳ To Do)

Test each page:

- [ ] Homepage renders correctly
- [ ] All sections display proper content
- [ ] Images load correctly
- [ ] Units listing works
- [ ] Unit detail pages work
- [ ] Plans page shows correct pricing
- [ ] Modalities display correctly
- [ ] Contact form works
- [ ] All CTAs link correctly
- [ ] SEO metadata is correct

### Phase 5: Deployment (⏳ To Do)

1. **Deploy Strapi**:
   - Option A: Strapi Cloud (easiest)
   - Option B: Self-hosted (VPS, Railway, DigitalOcean, etc.)

2. **Update environment variables**:
   ```bash
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
   STRAPI_API_TOKEN=your-production-token
   ```

3. **Deploy Next.js**:
   ```bash
   vercel --prod
   ```

4. **Migrate production data**:
   - Export from Sanity production
   - Import to Strapi production

5. **Test production site**

6. **Update DNS if needed**

## Rollback Plan

If you need to rollback to Sanity:

1. Revert environment variables
2. Deploy previous Next.js version
3. Keep Sanity project running

**Note**: Don't delete Sanity project until Strapi migration is 100% stable in production!

## Data Migration Script (WIP)

We're creating a script to automate data migration. It will:

```typescript
// scripts/migrate-sanity-to-strapi.ts

import { client as sanityClient } from '@/lib/sanity';
import { fetchStrapi } from '@/lib/strapi';

async function migrateUnits() {
  // Fetch from Sanity
  const sanityUnits = await sanityClient.fetch(`*[_type == "unit"]`);

  // Transform & upload to Strapi
  for (const unit of sanityUnits) {
    const strapiUnit = transformUnit(unit);
    await createStrapiUnit(strapiUnit);
  }
}

// ... similar functions for all content types
```

Run with:
```bash
pnpm strapi:migrate
```

## Media Migration

Strapi stores media differently than Sanity:

1. **Download Sanity assets**:
   - Images are stored in Sanity CDN
   - Download all referenced images
   - Save to local folder

2. **Upload to Strapi**:
   - Use Strapi Media Library
   - Upload via API or admin panel
   - Update references in content

3. **Update image URLs**:
   - Replace Sanity CDN URLs
   - Use `getStrapiMediaUrl()` helper

## Post-Migration Checklist

- [ ] All content migrated
- [ ] All images migrated
- [ ] All pages tested
- [ ] SEO verified (meta tags, og:images)
- [ ] Forms working (contact, careers)
- [ ] Analytics tracking verified
- [ ] Performance tested (Lighthouse)
- [ ] Production deployed
- [ ] Monitoring set up
- [ ] Team trained on Strapi
- [ ] Documentation updated

## Training Materials

For content editors:

1. **Strapi Admin Panel**: http://localhost:1337/admin
2. **Guide**: See `STRAPI_SETUP.md`
3. **Video Tutorial**: (Create internal video)
4. **Support**: Contact dev team

## Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Setup | 1 day | ✅ Complete |
| Data Migration | 2-3 days | ⏳ In Progress |
| Code Updates | 3-4 days | ⏳ To Do |
| Testing | 2 days | ⏳ To Do |
| Deployment | 1 day | ⏳ To Do |
| **Total** | **9-11 days** | **~10% Complete** |

## Questions?

Check:
- `STRAPI_SETUP.md` - Setup instructions
- `CLAUDE.md` - Project documentation
- Strapi Docs: https://docs.strapi.io

---

**Status**: ✅ Strapi installed and configured, ready for data migration!
