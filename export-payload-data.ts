import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
;(async () => {
  // Dynamically import the ES module config
  const configModule = await import('./src/payload.config')
  const payloadConfig = configModule.default

  const payloadInstance = await getPayload({
    config: payloadConfig,
  })

  const collections = ['users', 'media', 'cars', 'manufacturers', 'pages']
  const exportData: Record<string, any> = {}

  for (const collection of collections) {
    exportData[collection] = await payloadInstance.find({ collection: collection as any, limit: 10000 })
  }

  fs.writeFileSync('payload-export.json', JSON.stringify(exportData, null, 2))
  console.log('Export complete: payload-export.json')
  process.exit(0)
})()
