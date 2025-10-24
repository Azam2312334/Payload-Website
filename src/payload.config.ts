// storage-adapter-import-placeholder
import 'dotenv/config';
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cars } from './collections/Cars'
import { Manufacturers } from './collections/Manufacturers'
import { Pages } from './collections/Pages'
import { Header } from './collections/globals/Header'
import { Footer } from './collections/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Determine database adapter selection safely during CI/build
const databaseUri = process.env.DATABASE_URI || ''
const isLocalDb = /(127\.0\.0\.1|localhost)/.test(databaseUri)
const runningInBuildEnv = !!process.env.VERCEL || !!process.env.CI || !!process.env.GITHUB_ACTIONS

// Default original behavior
let isProd = process.env.NODE_ENV === 'production' || process.env.DATABASE_TYPE === 'postgres'

// If we're running in a CI/build environment (Vercel, GitHub Actions, etc.)
// and the DATABASE_URI points to localhost, avoid using Postgres during the build
// because the build environment cannot reach a local DB (causes ECONNREFUSED).
if (runningInBuildEnv && isLocalDb) {
  // Log for visibility in build logs
  // eslint-disable-next-line no-console
  console.log('DEBUG: Detected build environment and local DATABASE_URI — using sqlite adapter for the build to avoid ECONNREFUSED')
  isProd = false
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Cars, Manufacturers, Pages],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isProd
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || '',
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || '',
        },
      }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
