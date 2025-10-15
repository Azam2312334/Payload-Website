import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import Link from 'next/link'

import config from '@/payload.config'
import './styles.css'

// Helper function to extract text from Lexical richText content
function extractTextFromLexical(content: any): string {
  if (!content || !content.root || !content.root.children) {
    return ''
  }

  const extractText = (node: any): string => {
    if (node.text) {
      return node.text
    }
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ')
    }
    return ''
  }

  return content.root.children.map(extractText).join('\n')
}

// Helper function to get the correct URL based on pageType
function getPageUrl(page: any): string {
  switch (page.pageType) {
    case 'home':
      return '/'
    case 'about':
      return '/about'
    case 'standard':
    default:
      return `/pages/${page.slug}`
  }
}

export default async function HomePage() {
  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })

    // Fetch pages from the pages collection
    const pagesData = await payload.find({
      collection: 'pages',
      limit: 10,
    })

    const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

    return (
      <div className="home">
        <div className="content">
          <picture>
            <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
            <Image
              alt="Payload Logo"
              height={65}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
              width={65}
            />
          </picture>
          {!user && <h1>Welcome to your new project.</h1>}
          {user && <h1>Welcome back, {user.email}</h1>}
          <div className="links">
            <a
              className="admin"
              href={payloadConfig.routes.admin}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to admin panel
            </a>
            <a
              className="docs"
              href="https://payloadcms.com/docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Documentation
            </a>
          </div>
        </div>

        {/* Pages Section */}
        {pagesData.docs.length > 0 && (
          <div style={{ width: '100%', maxWidth: '800px', margin: '40px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Pages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {pagesData.docs.map((page: any) => (
                <div
                  key={page.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '20px',
                  }}
                >
                  <h3 style={{ marginBottom: '12px' }}>
                    <Link href={getPageUrl(page)}>{page.title}</Link>
                  </h3>

                  {page.content && (
                    <div style={{ opacity: 0.8, fontSize: '14px', lineHeight: '1.6' }}>
                      {extractTextFromLexical(page.content)}
                    </div>
                  )}

                  {!page.content && (
                    <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No content available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="footer">
          <p>Update this page by editing</p>
          <a className="codeLink" href={fileURL}>
            <code>app/(frontend)/page.tsx</code>
          </a>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading homepage:', error)
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Error loading page</h1>
        <p>Please check the server logs for details.</p>
      </div>
    )
  }
}
