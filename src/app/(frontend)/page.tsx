// import { headers as getHeaders } from 'next/headers.js'
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
    case 'digitalContent':
      return '/digitalcontent'
    case 'standard':
    default:
      return `/pages/${page.slug}`
  }
}

export default async function HomePage() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    // Static export: do not use headers or auth
    const user = null

    // Fetch pages from the pages collection
    let pagesData
    try {
      pagesData = await payload.find({
        collection: 'pages',
        limit: 10,
      })
    } catch (e) {
      console.error('Error fetching pagesData:', e)
      return (
        <div className="home">
          <div className="content">
            <h1>Pages table is missing</h1>
            <p>
              Please create the table/collection and at least one page in the Payload admin panel.
            </p>
          </div>
        </div>
      )
    }

    const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

    try {
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
            <h1>Welcome to your new project.</h1>
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
          {pagesData.docs && pagesData.docs.length > 0 && (
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
    } catch (jsxError) {
      console.error('Error rendering homepage JSX:', jsxError)
      return (
        <div className="home">
          <div className="content">
            <h1>Something went wrong rendering the homepage</h1>
            <p>{String(jsxError)}</p>
          </div>
        </div>
      )
    }
  } catch (err) {
    console.error('Error in HomePage:', err)
    return (
      <div className="home">
        <div className="content">
          <h1>Something went wrong</h1>
          <p>{String(err)}</p>
        </div>
      </div>
    )
  }
}
