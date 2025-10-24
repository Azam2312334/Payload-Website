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

const isProd = process.env.NODE_ENV === 'production' || process.env.DATABASE_TYPE === 'postgres'

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
