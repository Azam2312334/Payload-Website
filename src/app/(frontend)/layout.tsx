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

  // Fetch globals data with error handling
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let headerData = null;
  let footerData = null;
  try {
    headerData = await payload.findGlobal({ slug: 'header', depth: 1 });
  } catch (_e) {
    console.warn('Header global not found, using fallback.');
    headerData = {
      id: 0,
      logo: 0, // must be number or Media
      navigation: [],
      ctaButton: { text: '', url: '' },
      updatedAt: null,
      createdAt: null,
    };
  }
  try {
    footerData = await payload.findGlobal({ slug: 'footer', depth: 1 });
  } catch (_e) {
    console.warn('Footer global not found, using fallback.');
    footerData = {
      id: 0,
      backgroundColor: '#1f2937',
      textColor: '#9ca3af',
      iconColor: '#9ca3af',
      logo: 0, // must be number or Media
      description: '',
      centerImage: 0, // must be number or Media
      columns: [],
      socialLinks: [],
      copyrightText: '',
      updatedAt: null,
      createdAt: null,
    };
  }

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
