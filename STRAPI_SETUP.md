# Strapi CMS Setup Guide

This guide will help you set up and use Strapi CMS for managing all content in the Live Academia website.

## 📋 Overview

Strapi is now the primary CMS for Live Academia, replacing Sanity. All content is visually editable through Strapi's admin panel at `http://localhost:1337/admin`.

## 🚀 Quick Start

### 1. Start Strapi (First Time)

```bash
cd cms
npm run develop
```

This will:
- Start Strapi on `http://localhost:1337`
- Open the admin panel at `http://localhost:1337/admin`
- Prompt you to create an admin user (first time only)

### 2. Create Admin User

On first launch, you'll be asked to create an admin account:
- Email: your-email@example.com
- Password: (choose a strong password)
- First Name: Your Name
- Last Name: Your Last Name

**Important**: Save these credentials securely!

### 3. Configure API Token

After creating your admin user:

1. Navigate to: **Settings > API Tokens > Create new API Token**
2. Configure the token:
   - **Name**: "Next.js Frontend"
   - **Token type**: "Read-only"
   - **Token duration**: "Unlimited"
3. Click **Save**
4. **Copy the token** (it will only be shown once!)
5. Add to your `.env.local`:
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-token-here
   ```

### 4. Configure Permissions (Public Access)

For public content to be accessible without authentication:

1. Go to: **Settings > Users & Permissions Plugin > Roles > Public**
2. Enable the following permissions:
   - **Global-setting**: `find`
   - **Homepage**: `find`
   - **Unit**: `find`, `findOne`
   - **Plan**: `find`, `findOne`
   - **Modality**: `find`, `findOne`
   - **Benefit**: `find`, `findOne`
   - **Testimonial**: `find`, `findOne`
   - **Contact-page**: `find`
   - **About-page**: `find`
   - **Trabalhe-conosco-page**: `find`
   - **Day-use-page**: `find`
3. Click **Save**

### 5. Start Next.js

```bash
# In the root directory
pnpm dev
```

Your Next.js app will now fetch content from Strapi!

## 📂 Content Structure

### Singletons (Single Pages)
- **Global Settings** - Site-wide settings (logo, SEO, contact info)
- **Homepage** - All homepage sections
- **Contact Page** - Contact page content
- **About Page** - About/Sobre page content
- **Trabalhe Conosco Page** - Careers page content
- **Day Use Page** - Day use page content

### Collections (Multiple Items)
- **Units** - Gym locations (35+ units)
- **Plans** - Membership plans
- **Modalities** - Class types (Aulas Coletivas)
- **Benefits** - Gym benefits
- **Testimonials** - Customer testimonials

## ✏️ Editing Content

### Editing a Singleton (e.g., Homepage)

1. Go to **Content Manager** in the left sidebar
2. Click on **Homepage** (under "Single Types")
3. Edit the content in the visual editor
4. Click **Save** (top right)
5. Click **Publish** (if using draft mode)
6. Changes are live immediately!

### Adding a New Unit

1. Go to **Content Manager > Unit** (under "Collection Types")
2. Click **Create new entry**
3. Fill in the fields:
   - Name: "Nova Unidade"
   - Slug: "nova-unidade" (auto-generated)
   - Address, City, State, etc.
   - Upload photos (Main Photo, Background, Gallery)
   - Add features (click "+ Add an entry")
   - Add plans available at this unit
   - Set Order (for display order)
   - Check "Active" to make it visible
4. Click **Save**
5. Click **Publish**

### Uploading Media

1. Go to **Media Library** in the sidebar
2. Click **Add new assets**
3. Drag & drop or select files
4. Add Alternative Text for SEO
5. Click **Upload**

## 🔄 Data Migration from Sanity

We've created scripts to help migrate your existing Sanity data to Strapi:

```bash
# Run the migration script
pnpm strapi:migrate
```

This will:
- Fetch all content from Sanity
- Transform it to Strapi format
- Upload to Strapi via API
- Generate a migration report

**Important**: Review the migration report carefully before going live!

## 🛠️ Strapi Commands

```bash
cd cms

# Development (with hot reload)
npm run develop

# Production build
npm run build
npm run start

# Deploy to Strapi Cloud
npm run deploy
```

## 📊 Content Types & Fields

### Homepage Sections

**Hero Section**:
- Background Image
- Title 1, 2, 3 ("Transforme.", "Evolua.", "Viva.")
- Description
- Rating, Label, Subscribers Count
- Primary & Secondary CTAs
- Footer Text

**About Section**:
- Badge, Title, Description
- Image
- Stats (value, label)
- Highlights (text items)

**Benefits Section**:
- Badge, Title, Description
- Benefits (relation to Benefit collection)

**Plans Section**:
- Badge, Title, Description
- Plans (relation to Plan collection)

*(See full schema documentation in `/cms/src/api/` directories)*

### Units Fields

- Name, Slug
- Address, City, State, ZIP
- Phone, WhatsApp, Email
- Type (diamante, premium, tradicional, inauguracao)
- Description (rich text)
- Opening Hours
- Features (list)
- Photos (Main, Background, Gallery)
- Plans (embedded)
- Order, Active, Featured
- Código Unidade, Chave Pública (for Pacto API)

### Plans Fields

- Plan ID, Name
- Description
- Price, Price Label, Period
- Features (list)
- CTA Text & URL
- Highlight, Popular, Badge
- Gradient Colors, Icon
- Order, Active

## 🎨 Customization

### Adding a New Content Type

1. Go to **Content-Type Builder** in Strapi admin
2. Click **Create new collection type**
3. Enter the name (e.g., "Event")
4. Add fields:
   - Click **+ Add another field**
   - Select field type (Text, Rich text, Media, etc.)
   - Configure field options
5. Click **Save**
6. Restart Strapi

### Adding a New Field to Existing Type

1. Go to **Content-Type Builder**
2. Click on the content type (e.g., "Unit")
3. Click **+ Add another field**
4. Select field type and configure
5. Click **Finish** then **Save**
6. Restart Strapi

## 🔐 Security Best Practices

✅ **DO**:
- Use strong admin passwords
- Rotate API tokens regularly
- Keep Strapi updated
- Use environment variables for secrets
- Enable rate limiting in production

❌ **DON'T**:
- Commit `.env` files with secrets
- Share admin credentials
- Expose Strapi admin panel publicly without SSL
- Use default credentials

## 🐛 Troubleshooting

### Strapi won't start

**Error**: "Port 1337 is already in use"
```bash
# Kill the process using port 1337
lsof -ti:1337 | xargs kill -9
```

**Error**: "Database locked"
```bash
# Remove the SQLite lock
rm cms/.tmp/data.db-shm cms/.tmp/data.db-wal
```

### Content not showing in Next.js

1. Check API token is set in `.env.local`
2. Verify permissions are enabled (Settings > Roles > Public)
3. Check content is published (not draft)
4. Clear Next.js cache: `rm -rf .next`
5. Check Strapi is running on port 1337

### Media not loading

1. Check media exists in Media Library
2. Verify `NEXT_PUBLIC_STRAPI_URL` is correct
3. Check file permissions in `cms/public/uploads/`

## 📚 Additional Resources

- **Strapi Documentation**: https://docs.strapi.io
- **Content-Type Builder**: https://docs.strapi.io/user-docs/content-type-builder
- **Media Library**: https://docs.strapi.io/user-docs/media-library
- **User Roles**: https://docs.strapi.io/user-docs/users-roles-permissions

## 🚢 Deployment

See `docs/strapi-deployment.md` for production deployment instructions.

## 💡 Tips & Tricks

1. **Use Components** for reusable content blocks (e.g., Button, Stat, Highlight)
2. **Set Default Values** in the Content-Type Builder to speed up content creation
3. **Use Relations** to link content (e.g., Homepage → Plans)
4. **Enable Draft/Publish** for content review workflows
5. **Use Media Folders** to organize assets by type
6. **Set up Webhooks** to trigger rebuilds on content changes

---

Need help? Check the `CLAUDE.md` file or contact the development team.
