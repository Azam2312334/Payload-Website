// import-payload-data-rest.js
// Usage: node import-payload-data-rest.js
// Requires: PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD, PAYLOAD_API_URL in .env

const fs = require('fs')
const axios = require('axios')
require('dotenv').config()

const collections = ['users', 'media', 'cars', 'manufacturers', 'pages']

async function login() {
  const { data } = await axios.post(`${process.env.PAYLOAD_API_URL}/users/login`, {
    email: process.env.PAYLOAD_ADMIN_EMAIL,
    password: process.env.PAYLOAD_ADMIN_PASSWORD,
  })
  return data.token
}

async function importAll() {
  const token = await login()
  const importData = JSON.parse(fs.readFileSync('payload-export.json', 'utf-8'))
  for (const collection of collections) {
    const items = importData[collection]?.docs || []
    for (const item of items) {
      // Remove system fields
      delete item.id
      delete item._id
      delete item.createdAt
      delete item.updatedAt
      try {
        await axios.post(`${process.env.PAYLOAD_API_URL}/${collection}`, item, {
          headers: { Authorization: `JWT ${token}` },
        })
      } catch (e) {
        console.error(`Error importing to ${collection}:`, e.response?.data || e.message)
      }
    }
    console.log(`Imported ${items.length} items to ${collection}`)
  }
  console.log('Import complete.')
}

importAll().catch((e) => {
  console.error(e)
  process.exit(1)
})
