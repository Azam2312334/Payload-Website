// export-payload-data.rest.js
// Usage: node export-payload-data.rest.js
// Exports all Payload collections using the REST API. Requires local Payload server running.
// Set PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD, and PAYLOAD_API_URL in your .env or environment.

const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD;
const COLLECTIONS = ['users', 'media', 'cars', 'manufacturers', 'pages'];

async function login() {
  const res = await axios.post(`${API_URL}/users/login`, {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });
  return res.data.token;
}

async function exportAll() {
  const token = await login();
  const exportData = {};
  for (const collection of COLLECTIONS) {
    const res = await axios.get(`${API_URL}/${collection}?limit=10000`, {
      headers: { Authorization: `JWT ${token}` },
    });
    exportData[collection] = res.data;
    console.log(`Exported ${res.data.docs.length} from ${collection}`);
  }
  fs.writeFileSync('payload-export.json', JSON.stringify(exportData, null, 2));
  console.log('Export complete: payload-export.json');
}

exportAll().catch(e => {
  console.error(e);
  process.exit(1);
});
