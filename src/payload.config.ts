// import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite' // Add this
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Pool, neonConfig } from '@neondatabase/serverless' // Added for WebSocket support
import ws from 'ws' // Added for Node.js WebSocket support
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})
console.log('--- DEBUG: IS SECRET LOADED? ---', process.env.PAYLOAD_SECRET ? 'YES' : 'NO')
import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

neonConfig.webSocketConstructor = ws 

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
/*   db: postgresAdapter({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL || '',
    }),
  }), */
  db: sqliteAdapter({
    client: {
      url: 'file:./stinky.db',
    },
  }),
  sharp,
  plugins: [],
})
