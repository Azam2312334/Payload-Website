// import-payload-data.ts
// Run with: npx tsx import-payload-data.ts
// Imports all Payload collections from payload-export.json (ESM/TypeScript compatible)

import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
;(async () => {
  // Dynamically import the ES module config
  const configModule = await import('./src/payload.config')
  const payloadConfig = configModule.default

  const payload = await getPayload({
    config: payloadConfig,
  })

  const data = JSON.parse(fs.readFileSync('payload-export.json', 'utf-8'))
  const collections = Object.keys(data)

  for (const collection of collections) {
    // Skip importing pages if the table does not exist
    if (collection === 'pages') {
      try {
        await payload.find({ collection: 'pages', limit: 1 })
      } catch (e: any) {
        console.warn('Skipping import for pages: table does not exist.')
        continue
      }
    }
    const items = data[collection].docs || []
    let importedCount = 0
    for (const item of items) {
      // Remove system fields that should not be imported
      delete item.id
      delete item._id
      delete item.createdAt
      delete item.updatedAt
      // Skip media records with missing file fields
      if (collection === 'media') {
        if (!item.filename || !item.mimeType) {
          console.warn(`Skipping media record with missing file:`, item)
          continue
        }
      }
      try {
        await payload.create({ collection: collection as any, data: item })
        importedCount++
      } catch (e: any) {
        console.error(`Error importing to ${collection}:`, e.message)
      }
    }
    console.log(`Imported ${importedCount} items to ${collection}`)
  }
  console.log('Import complete.')
  process.exit(0)
})()
