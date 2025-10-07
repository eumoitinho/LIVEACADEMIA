import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import schemas from './schemas'

// Use env vars when available; fall back to the known project id and production dataset
const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c9pbklm2') as string
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production') as string

export default defineConfig({
  name: 'default',
  title: 'LIVE Academia CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
})
