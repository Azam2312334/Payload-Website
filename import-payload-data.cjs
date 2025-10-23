// import-payload-data.cjs
// Run this script with: node import-payload-data.cjs
// Imports all Payload collections from payload-export.json

const { createPayload } = require('payload');
const fs = require('fs');
require('dotenv').config();

(async () => {
  // Dynamically import the ES module config
  const configModule = await import('./src/payload.config.ts');
  const payloadConfig = configModule.default;

  const payload = await createPayload({
    config: payloadConfig,
    local: true,
    secret: process.env.PAYLOAD_SECRET,
  });

  const data = JSON.parse(fs.readFileSync('payload-export.json', 'utf-8'));
  const collections = Object.keys(data);

  for (const collection of collections) {
    const items = data[collection].docs || [];
    for (const item of items) {
      // Remove system fields that should not be imported
      delete item.id;
      delete item._id;
      delete item.createdAt;
      delete item.updatedAt;
      try {
        await payload.create({ collection, data: item });
      } catch (e) {
        console.error(`Error importing to ${collection}:`, e.message);
      }
    }
    console.log(`Imported ${items.length} items to ${collection}`);
  }
  console.log('Import complete.');
  process.exit(0);
})();