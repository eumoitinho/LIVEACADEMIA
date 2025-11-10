# Strapi Troubleshooting Guide

Common issues and solutions for Strapi CMS setup in Live Academia.

## Error: Node.js Version Mismatch (better-sqlite3)

**Error Message:**
```
Error: The module 'better-sqlite3' was compiled against a different Node.js version
NODE_MODULE_VERSION 141 vs NODE_MODULE_VERSION 127
```

**Cause:** Native modules need to be rebuilt for your Node.js version.

**Solutions:**

### Solution 1: Rebuild Native Modules (Recommended)
```bash
# From project root
pnpm strapi:rebuild

# Or manually
cd cms
npm rebuild better-sqlite3
```

### Solution 2: Reinstall Dependencies
```bash
cd cms
rm -rf node_modules package-lock.json
npm install
```

### Solution 3: Use Correct Node Version
Strapi v5 requires Node.js 18.x, 20.x, or 22.x

Check your version:
```bash
node --version
```

If you're using a different version, switch using nvm:
```bash
nvm install 20
nvm use 20
cd cms
npm install
```

---

## Port 1337 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::1337
```

**Solutions:**

### Kill the Process
```bash
# Find process using port 1337
lsof -ti:1337 | xargs kill -9

# Or on Windows
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

### Change Port
Edit `cms/.env`:
```bash
PORT=1338
```

---

## Database Locked

**Error Message:**
```
Error: SQLITE_BUSY: database is locked
```

**Solution:**
```bash
cd cms
rm -rf .tmp/data.db-shm .tmp/data.db-wal
npm run develop
```

---

## Cannot Access Admin Panel

**Issue:** Admin panel doesn't load at http://localhost:1337/admin

**Solutions:**

1. **Check if Strapi is running:**
   ```bash
   curl http://localhost:1337/_health
   ```

2. **Clear browser cache** or try incognito mode

3. **Rebuild admin panel:**
   ```bash
   cd cms
   npm run build
   npm run develop
   ```

4. **Check console for errors:**
   - Open browser DevTools (F12)
   - Check Console tab for JavaScript errors

---

## API Returns 403 Forbidden

**Issue:** Content API returns 403 when fetching data

**Cause:** Permissions not configured correctly

**Solution:**

1. Go to **Settings > Users & Permissions Plugin > Roles > Public**
2. Enable permissions for your content types:
   - ✅ `find`
   - ✅ `findOne`
3. Click **Save**
4. Restart Strapi

---

## Content Not Showing in Next.js

**Issue:** Strapi content doesn't appear in Next.js app

**Checklist:**

1. **Verify Strapi is running:**
   ```bash
   curl http://localhost:1337/api/units
   ```

2. **Check environment variables** in `.env.local`:
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-token-here
   ```

3. **Verify content is published:**
   - Content Manager → Select entry → Check "Published" status

4. **Check permissions** (see "API Returns 403" above)

5. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

## Images Not Loading

**Issue:** Media/images don't display in Next.js

**Solutions:**

1. **Check image URL:**
   ```typescript
   import { getStrapiMediaUrl } from '@/lib/strapi';
   const imageUrl = getStrapiMediaUrl(image.data.attributes.url);
   console.log(imageUrl); // Should log full URL
   ```

2. **Add domain to Next.js config:**

   Edit `next.config.mjs`:
   ```javascript
   const nextConfig = {
     images: {
       domains: ['localhost'],
       remotePatterns: [
         {
           protocol: 'http',
           hostname: 'localhost',
           port: '1337',
           pathname: '/uploads/**',
         },
       ],
     },
   };
   ```

3. **Verify file exists:**
   - Check `cms/public/uploads/` directory
   - Visit URL directly in browser

---

## Cannot Create Admin User

**Issue:** First-time setup doesn't show admin creation

**Solution:**

Delete database and restart:
```bash
cd cms
rm -rf .tmp/data.db .tmp/data.db-shm .tmp/data.db-wal
npm run develop
```

---

## TypeScript Errors with Strapi Types

**Issue:** TypeScript errors when using Strapi content

**Solutions:**

1. **Import types:**
   ```typescript
   import type { Unit, Homepage } from '@/types/strapi';
   ```

2. **Type the response:**
   ```typescript
   const response = await getUnits();
   const units = response.data as Unit[];
   ```

3. **Regenerate types** (if schema changed):
   - Types are in `types/strapi.ts`
   - Update manually or regenerate based on Strapi schema

---

## Slow Performance

**Issue:** Strapi or admin panel is slow

**Solutions:**

1. **Enable production mode:**
   ```bash
   cd cms
   npm run build
   NODE_ENV=production npm run start
   ```

2. **Optimize populate queries:**
   ```typescript
   // Bad: Over-fetching
   const response = await fetchStrapi({
     endpoint: 'units',
     query: { populate: '*' }
   });

   // Good: Selective population
   const response = await fetchStrapi({
     endpoint: 'units',
     query: {
       populate: {
         mainPhoto: true,
         features: true
       }
     }
   });
   ```

3. **Add pagination:**
   ```typescript
   const response = await fetchStrapi({
     endpoint: 'units',
     query: {
       pagination: {
         page: 1,
         pageSize: 10
       }
     }
   });
   ```

---

## Migration Issues

**Issue:** Problems migrating from Sanity

**Solutions:**

1. **Check Sanity connection:**
   ```bash
   # Test Sanity API
   curl https://your-project.sanity.io/v1/data/query/production
   ```

2. **Verify data format** matches Strapi schema

3. **Migrate in batches** instead of all at once

4. **Manual migration** for complex content

---

## CORS Errors

**Issue:** CORS errors when accessing Strapi API

**Solution:**

Edit `cms/config/middlewares.ts`:
```typescript
export default [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.NEXT_PUBLIC_SITE_URL,
        'https://your-production-domain.com'
      ],
      headers: '*',
    },
  },
  // ... other middlewares
];
```

Restart Strapi after changes.

---

## Getting More Help

1. **Check logs:**
   ```bash
   cd cms
   npm run develop --debug
   ```

2. **Strapi Documentation:**
   - https://docs.strapi.io

3. **Strapi Discord:**
   - https://discord.strapi.io

4. **Project Documentation:**
   - `STRAPI_SETUP.md` - Setup guide
   - `STRAPI_MIGRATION_GUIDE.md` - Migration guide
   - `CLAUDE.md` - Project overview

---

## Quick Reference: Useful Commands

```bash
# Start Strapi
pnpm strapi:dev

# Rebuild native modules
pnpm strapi:rebuild

# Build admin panel
pnpm strapi:build

# Check Strapi health
curl http://localhost:1337/_health

# Clear Next.js cache
rm -rf .next && pnpm dev

# Check Strapi logs
cd cms && npm run develop --debug

# Reset database (development only!)
cd cms && rm -rf .tmp/data.db*
```

---

**Still having issues?** Check the error message carefully and search in Strapi docs or contact the dev team.
