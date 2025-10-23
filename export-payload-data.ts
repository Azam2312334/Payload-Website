import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// Define required fields for each collection
const requiredFields: Record<string, string[]> = {
  users: ['email'],
  pages: ['slug'],
  // Add more collections and their required fields as needed
}

;(async () => {
  // Dynamically import the ES module config
  const configModule = await import('./src/payload.config')
  const payloadConfig = configModule.default

  const payload = await getPayload({ config: payloadConfig })

  const collections = ['users', 'media', 'cars', 'manufacturers', 'pages']
  const exportData: Record<string, any> = {}
  const skipped: Record<string, any[]> = {}

  for (const collection of collections) {
    const result = await payload.find({ collection: collection as any, limit: 10000 })
    let docs = result.docs

    // Validate required fields
    if (requiredFields[collection]) {
      const validDocs = []
      const skippedDocs = []
      for (const doc of docs) {
        const missing = requiredFields[collection].filter((f) => !doc[f])
        if (missing.length === 0) {
          validDocs.push(doc)
        } else {
          skippedDocs.push({ doc, missingFields: missing })
        }
      }
      docs = validDocs
      skipped[collection] = skippedDocs
    }

    // Optionally skip media metadata (since files can't be exported/imported as JSON)
    if (collection === 'media') {
      docs = docs.map((doc: any) => {
        // Remove file-specific fields
        delete doc.filename
        delete doc.mimeType
        delete doc.filesize
        delete doc.url
        return doc
      })
    }

    exportData[collection] = { docs }
  }

  fs.writeFileSync('payload-export.json', JSON.stringify(exportData, null, 2))
  fs.writeFileSync('payload-export-skipped.json', JSON.stringify(skipped, null, 2))
  console.log('Export complete: payload-export.json')
  console.log('Skipped records (see payload-export-skipped.json):', skipped)
  process.exit(0)
})()
