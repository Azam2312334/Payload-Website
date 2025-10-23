// export-payload-data.js
// Run this script with: node export-payload-data.js
// Exports all Payload collections to payload-export.json

const payload = require('payload')
const fs = require('fs')

require('dotenv').config()

;(async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
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
