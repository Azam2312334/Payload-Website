import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const result = await payload.find({
      collection: 'pages',
      where: {
        pageType: {
          equals: 'digitalContent',
        },
      },
      limit: 1,
      depth: 2,
    })
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(
      { error: 'Digital Content page is not available (table missing)' },
      { status: 500 },
    )
  }
}
