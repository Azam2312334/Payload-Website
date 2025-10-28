// export-payload-data.cjs
// Run this script with: node export-payload-data.cjs
// Exports all Payload collections to payload-export.json

const { createPayload } = require('payload')
const fs = require('fs')
require('dotenv').config()

;(async () => {
  // Dynamically import the ES module config
  const configModule = await import('./src/payload.config.ts')
  const payloadConfig = configModule.default

  const payload = await createPayload({
    config: payloadConfig,
    local: true,
    secret: process.env.PAYLOAD_SECRET,
  })

  const collections = ['users', 'media', 'cars', 'manufacturers', 'pages']
  const exportData = {}

  for (const collection of collections) {
    exportData[collection] = await payload.find({ collection, limit: 10000 })
  }

  fs.writeFileSync('payload-export.json', JSON.stringify(exportData, null, 2))
  console.log('Export complete: payload-export.json')
  process.exit(0)
})()

// Environment variables should be set in a .env file, not in this script.
