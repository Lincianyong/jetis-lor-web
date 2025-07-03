// sanity.config.js
export default defineConfig({
  name: 'jetis-lor',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // ... rest of your config
})