import React from 'react'
import './styles.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch globals data
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [headerData, footerData] = await Promise.all([
    payload.findGlobal({ slug: 'header', depth: 1 }),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
  ])

  return (
    <html lang="en">
      <body>
        <Header data={headerData} />
        <main style={{ paddingTop: '73px' }}>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  )
}
