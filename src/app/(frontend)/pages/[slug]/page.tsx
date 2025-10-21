import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

export default async function PageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
      pageType: {
        equals: 'standard', // Only get standard slug-based pages
      },
    },
    limit: 1,
  })

  if (result.docs.length === 0) {
    notFound()
  }

  const page = result.docs[0]

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>{page.title}</h1>
      {page.content && (
        <div style={{ lineHeight: '1.6', fontSize: '16px' }}>
          {extractTextFromLexical(page.content)}
        </div>
      )}
      {!page.content && <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No content available</p>}
    </div>
  )
}

// Generate static params for standard pages only
export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'standard',
      },
    },
    limit: 100,
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (result.docs.length === 0) {
    return {
      title: 'Page Not Found',
    }
  }

  const page = result.docs[0]

  return {
    title: page.title,
  }
}
