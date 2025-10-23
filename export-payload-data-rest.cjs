// export-payload-data-rest.cjs
// Usage: node export-payload-data-rest.cjs
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

async function exportAll() {
  const token = await login()
  const exportData = {}
  for (const collection of collections) {
    const { data } = await axios.get(`${process.env.PAYLOAD_API_URL}/${collection}?limit=10000`, {
      headers: { Authorization: `JWT ${token}` },
    })
    exportData[collection] = data
    console.log(`Exported ${data.docs.length} items from ${collection}`)
  }
  fs.writeFileSync('payload-export.json', JSON.stringify(exportData, null, 2))
  console.log('Export complete: payload-export.json')
}

exportAll().catch((e) => {
  console.error(e)
  process.exit(1)
})
