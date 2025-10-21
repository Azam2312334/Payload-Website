import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'

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

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: {
      pageType: {
        equals: 'about',
      },
    },
    limit: 1,
    depth: 2, // Important: This fetches the related media/icon data
  })

  if (result.docs.length === 0) {
    return <div>About page not found</div>
  }

  const page = result.docs[0]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>{page.title}</h1>

      {page.aboutBlocks?.map((block: any, index: number) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <div key={index} style={{ marginBottom: '40px', textAlign: 'center' }}>
                {block.backgroundImage && typeof block.backgroundImage === 'object' && (
                  <Image
                    src={block.backgroundImage.url || ''}
                    alt={block.backgroundImage.alt || ''}
                    width={1200}
                    height={400}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                )}
                <h2 style={{ fontSize: '2.5rem', marginTop: '20px' }}>{block.heading}</h2>
                {block.subheading && (
                  <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{block.subheading}</p>
                )}
              </div>
            )

          case 'contentSection':
            return (
              <div key={index} style={{ marginBottom: '40px' }}>
                {block.heading && <h2 style={{ marginBottom: '16px' }}>{block.heading}</h2>}
                {block.content && (
                  <div style={{ lineHeight: '1.6' }}>{extractTextFromLexical(block.content)}</div>
                )}
              </div>
            )

          case 'featuresGrid':
            return (
              <div key={index} style={{ marginBottom: '40px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {block.features?.map((feature: any, featureIndex: number) => (
                    <div
                      key={featureIndex}
                      style={{
                        padding: '24px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      {feature.icon && typeof feature.icon === 'object' && feature.icon.url && (
                        <Image
                          src={feature.icon.url}
                          alt={feature.icon.alt || feature.title || 'Feature icon'}
                          width={80}
                          height={80}
                          style={{ margin: '0 auto 16px', borderRadius: '8px' }}
                        />
                      )}
                      {feature.title && <h3 style={{ marginBottom: '12px' }}>{feature.title}</h3>}
                      {feature.description && <p style={{ opacity: 0.8 }}>{feature.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
