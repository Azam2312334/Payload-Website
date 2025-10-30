'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

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

export default function DigitalContentPage() {
  const { lang } = useLanguage()
  const [page, setPage] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPage() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/pages/digital-content')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (!data || !data.docs || data.docs.length === 0) {
          setError('Digital Content page not found')
          setPage(null)
        } else {
          setPage(data.docs[0])
        }
      } catch (e) {
        setError('Digital Content page is not available (table missing)')
        setPage(null)
      }
      setLoading(false)
    }
    fetchPage()
  }, [])

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>Loading...</div>
    )
  }
  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>{error}</h1>
      </div>
    )
  }
  if (!page) return null

  // --- Go Live logic: return nothing if not live yet ---
  const now = new Date()
  if (page.goLiveAt) {
    let goLiveDateTime: Date
    if (page.goLiveTime) {
      const dateStr = page.goLiveAt.slice(0, 10)
      const timeStr = page.goLiveTime.length === 5 ? page.goLiveTime : '00:00'
      goLiveDateTime = new Date(`${dateStr}T${timeStr}:00`)
    } else {
      goLiveDateTime = new Date(page.goLiveAt.slice(0, 10) + 'T00:00:00')
    }
    if (now < goLiveDateTime) {
      return null
    }
  }

  // Helper: check if a block is live
  const isBlockLive = (block: any) => {
    if (!block.goLiveAt) return true
    let goLiveDateTime: Date
    if (block.goLiveTime) {
      const dateStr = block.goLiveAt.slice(0, 10)
      const timeStr = block.goLiveTime.length === 5 ? block.goLiveTime : '00:00'
      goLiveDateTime = new Date(`${dateStr}T${timeStr}:00`)
    } else {
      goLiveDateTime = new Date(block.goLiveAt.slice(0, 10) + 'T00:00:00')
    }
    return now >= goLiveDateTime
  }

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ display: 'none' }}>{page.title}</h1>

      {page.digitalContentBlocks
        ?.filter((block: any) => !block.hideBlock && isBlockLive(block))
        .map((block: any, index: number) => {
          switch (block.blockType) {
            // 1. Digital Content Hero
            case 'digitalContentHero':
              return (
                <section
                  key={index}
                  style={{
                    position: 'relative',
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '80px 20px',
                    overflow: 'hidden',
                  }}
                >
                  {block.backgroundType === 'youtube' && block.youtubeVideoId ? (
                    <iframe
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Hero Background Video"
                      src={`https://www.youtube.com/embed/${block.youtubeVideoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${block.youtubeVideoId}&playsinline=1&disablekb=1&iv_load_policy=3&enablejsapi=1`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100vw',
                        height: '100vh',
                        minWidth: '100vw',
                        minHeight: '100vh',
                        objectFit: 'cover',
                        pointerEvents: 'none',
                        zIndex: -1,
                      }}
                    />
                  ) : (
                    block.backgroundImage &&
                    typeof block.backgroundImage === 'object' && (
                      <Image
                        src={block.backgroundImage.url || ''}
                        alt={block.backgroundImage.alt || 'Hero Banner'}
                        fill
                        style={{ objectFit: 'cover', zIndex: -1 }}
                        priority
                      />
                    )
                  )}
                  {/* Dark overlay for better text readability */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      zIndex: 0,
                    }}
                  />
                  <div
                    style={{
                      maxWidth: '1200px',
                      width: '100%',
                      margin: '0 auto',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div style={{ maxWidth: '600px' }}>
                      <h2
                        style={{
                          fontSize: '3rem',
                          marginBottom: '24px',
                          fontWeight: '600',
                          color: 'white',
                          lineHeight: '1.2',
                        }}
                      >
                        {lang === 'bm' ? block.bannerText_bm : block.bannerText}
                      </h2>
                      <p
                        style={{
                          fontSize: '1.25rem',
                          marginBottom: '32px',
                          color: 'white',
                          lineHeight: '1.6',
                        }}
                      >
                        {lang === 'bm' ? block.bannerDescription_bm : block.bannerDescription}
                      </p>
                      {(lang === 'bm' ? block.ctaText_bm : block.ctaText) && block.ctaLink && (
                        <Link
                          href={block.ctaLink}
                          style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: '#e52a32',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            transition: 'background 0.3s ease',
                          }}
                        >
                          {lang === 'bm' ? block.ctaText_bm : block.ctaText}
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              )

            // 2. Focus Area
            case 'focusArea':
              return (
                <section
                  key={index}
                  style={{
                    background: 'white',
                    padding: '80px 20px',
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'left',
                        marginBottom: '60px',
                        color: 'black',
                      }}
                    >
                      {block.heading}
                    </h2>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '40px',
                      }}
                    >
                      {block.areas?.map((area: any, areaIndex: number) => (
                        <div
                          key={areaIndex}
                          style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                          }}
                        >
                          {area.icon && typeof area.icon === 'object' && area.icon.url && (
                            <div style={{ flexShrink: 0 }}>
                              <Image
                                src={area.icon.url}
                                alt={area.icon.alt || area.title}
                                width={80}
                                height={80}
                              />
                            </div>
                          )}
                          <div style={{ flex: 1 }}>
                            <h3
                              style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'black' }}
                            >
                              {area.title}
                            </h3>
                            <p style={{ color: 'black', lineHeight: '1.6', opacity: 0.8 }}>
                              {area.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )

            // 3. Global Champion
            case 'globalChampion':
              return (
                <section
                  key={index}
                  style={{
                    position: 'relative',
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {block.image && typeof block.image === 'object' && block.image.url && (
                    <Image
                      src={block.image.url}
                      alt={block.image.alt || 'Global Champion'}
                      fill
                      style={{ objectFit: 'cover', zIndex: -1 }}
                    />
                  )}
                  {/* Dark overlay for better text readability */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      zIndex: 0,
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      padding: '80px 20px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        position: 'relative',
                      }}
                    >
                      <div style={{ maxWidth: '50%' }}>
                        <h2
                          style={{
                            fontSize: '2.5rem',
                            marginBottom: '24px',
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '400',
                            lineHeight: '1.4',
                          }}
                        >
                          {block.heading?.replace(/Global Champions in Digital Content/i, '')}
                          <strong>Global Champions in Digital Content</strong>
                        </h2>
                        <p
                          style={{
                            fontSize: '1.25rem',
                            color: 'white',
                            lineHeight: '1.6',
                            textAlign: 'left',
                          }}
                        >
                          {block.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )

            // 4. National Impact
            case 'nationalImpact':
              return (
                <section
                  key={index}
                  style={{
                    background: 'white',
                    padding: '80px 20px',
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'left',
                        marginBottom: '20px',
                        color: 'black',
                      }}
                    >
                      {block.heading}
                    </h2>
                    <p
                      style={{
                        textAlign: 'left',
                        fontSize: '1.1rem',
                        color: 'black',
                        opacity: 0.8,
                        marginBottom: '60px',
                        maxWidth: '800px',
                      }}
                    >
                      {block.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: '40px',
                        flexWrap: 'nowrap',
                        justifyContent: 'flex-start',
                        overflowX: 'auto',
                      }}
                    >
                      {block.stats?.map((stat: any, statIndex: number) => (
                        <div
                          key={statIndex}
                          style={{
                            textAlign: 'center',
                            background: stat.backgroundColor || '#f3f4f6',
                            padding: '60px 48px',
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flex: '1',
                            minWidth: '260px',
                            height: '420px',
                          }}
                        >
                          <div style={{ height: '140px', marginBottom: '32px' }}>
                            {stat.icon && typeof stat.icon === 'object' && stat.icon.url && (
                              <Image
                                src={stat.icon.url}
                                alt={stat.icon.alt || stat.label}
                                width={140}
                                height={140}
                              />
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: '1.75rem',
                              fontWeight: '900',
                              marginBottom: '24px',
                              color: stat.textColor || 'black',
                              lineHeight: '1.2',
                            }}
                          >
                            {stat.value}
                          </div>
                          <div
                            style={{
                              color: stat.textColor || 'black',
                              opacity: 0.7,
                              lineHeight: '1.5',
                              fontSize: '1.1rem',
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )

            // 5. Industry Size
            case 'industrySize':
              return (
                <section
                  key={index}
                  style={{
                    background: '#f8f9fa',
                    padding: '80px 20px',
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'left',
                        marginBottom: '20px',
                        color: 'black',
                      }}
                    >
                      {block.heading?.includes('Industry Size') ? (
                        <>
                          Industry <strong>Size</strong>
                        </>
                      ) : (
                        block.heading
                      )}
                    </h2>
                    {block.description && (
                      <p
                        style={{
                          textAlign: 'left',
                          fontSize: '1.1rem',
                          color: 'black',
                          opacity: 0.8,
                          marginBottom: '60px',
                          maxWidth: '800px',
                        }}
                      >
                        {block.description}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '40px',
                      }}
                    >
                      {block.companies?.map((company: any, companyIndex: number) => (
                        <div key={companyIndex} style={{ textAlign: 'center' }}>
                          {company.icon && typeof company.icon === 'object' && company.icon.url && (
                            <Image
                              src={company.icon.url}
                              alt={company.icon.alt || company.label}
                              width={60}
                              height={60}
                              style={{ margin: '0 auto 16px' }}
                            />
                          )}
                          <div
                            style={{
                              fontSize: '3rem',
                              fontWeight: 'bold',
                              marginBottom: '8px',
                              color: 'black',
                            }}
                          >
                            {company.count}
                          </div>
                          <div style={{ color: 'black', opacity: 0.7 }}>{company.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )

            // 6. Our Highlights
            case 'ourHighlights':
              return (
                <section
                  key={index}
                  style={{
                    background: '#396384',
                    padding: '80px 20px',
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'center',
                        marginBottom: '60px',
                        color: 'white',
                      }}
                    >
                      {block.heading?.includes('Our Highlights') ? (
                        <>
                          Our <strong>Highlights</strong>
                        </>
                      ) : (
                        block.heading
                      )}
                    </h2>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                      }}
                    >
                      {block.cards?.map((card: any, cardIndex: number) => (
                        <Link
                          key={cardIndex}
                          href={card.url}
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block',
                            padding: '30px',
                            background: '#f8f9fa',
                            borderRadius: '8px',
                            transition: 'transform 0.2s',
                          }}
                        >
                          {card.image && typeof card.image === 'object' && card.image.url && (
                            <Image
                              src={card.image.url}
                              alt={card.image.alt || card.title}
                              width={300}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                marginBottom: '20px',
                              }}
                            />
                          )}
                          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{card.title}</h3>
                          <p style={{ opacity: 0.8, lineHeight: '1.6' }}>{card.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )

            // 7. Programmes & Initiatives
            case 'programmesInitiatives':
              return (
                <section
                  key={index}
                  style={{
                    background: '#f8f9fa',
                    padding: '80px 20px',
                  }}
                >
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                      style={{
                        fontSize: '2.5rem',
                        textAlign: 'center',
                        marginBottom: '60px',
                        color: 'black',
                      }}
                    >
                      {block.heading}
                    </h2>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                      }}
                    >
                      {block.items?.map((item: any, itemIndex: number) => (
                        <Link
                          key={itemIndex}
                          href={item.url}
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                            display: 'block',
                            background: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                          }}
                        >
                          {item.image && typeof item.image === 'object' && item.image.url && (
                            <Image
                              src={item.image.url}
                              alt={item.image.alt || item.title}
                              width={400}
                              height={250}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          )}
                          <div style={{ padding: '24px' }}>
                            <h3
                              style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'black' }}
                            >
                              {item.title}
                            </h3>
                            <p style={{ color: 'black', opacity: 0.8, lineHeight: '1.6' }}>
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )

            // 8. Our Publications
            case 'ourPublications':
              return (
                <section
                  key={index}
                  style={{
                    maxWidth: '1200px',
                    margin: '80px auto',
                    padding: '0 20px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '2.5rem',
                      textAlign: 'center',
                      marginBottom: '60px',
                    }}
                  >
                    {block.heading}
                  </h2>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '30px',
                    }}
                  >
                    {block.items?.map((item: any, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        style={{
                          background: item.backgroundColor || '#f8f9fa',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          textAlign: 'center',
                          padding: '30px',
                        }}
                      >
                        {item.image && typeof item.image === 'object' && item.image.url && (
                          <Image
                            src={item.image.url}
                            alt={item.image.alt || item.title}
                            width={250}
                            height={350}
                            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
                          />
                        )}
                        <h3
                          style={{ fontSize: '1.25rem', marginBottom: '20px', minHeight: '60px' }}
                        >
                          {item.title}
                        </h3>
                        {item.pdfFile && typeof item.pdfFile === 'object' && item.pdfFile.url && (
                          <a
                            href={item.pdfFile.url}
                            download
                            style={{
                              display: 'inline-block',
                              padding: '10px 20px',
                              background: '#0070f3',
                              color: 'white',
                              textDecoration: 'none',
                              borderRadius: '6px',
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                            }}
                          >
                            {block.downloadLabel || 'DOWNLOAD PDF'}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )

            // 9. Get In Touch
            case 'getInTouch':
              return (
                <section
                  key={index}
                  style={{
                    position: 'relative',
                    padding: '100px 20px',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  {block.backgroundImage && typeof block.backgroundImage === 'object' && (
                    <Image
                      src={block.backgroundImage.url || ''}
                      alt={block.backgroundImage.alt || 'Get In Touch'}
                      fill
                      style={{ objectFit: 'cover', zIndex: -1 }}
                    />
                  )}
                  <div
                    style={{
                      maxWidth: '800px',
                      margin: '0 auto',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{block.title}</h2>
                    <div
                      style={{ fontSize: '1.25rem', marginBottom: '30px', lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{
                        __html: extractTextFromLexical(block.description),
                      }}
                    />
                    <a
                      href={block.ctaLink}
                      style={{
                        display: 'inline-block',
                        padding: '12px 30px',
                        background: '#0070f3',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                      }}
                    >
                      {block.ctaText}
                    </a>
                  </div>
                </section>
              )

            // 10. FAQ
            case 'faq':
              return (
                <section
                  key={index}
                  style={{
                    maxWidth: '1000px',
                    margin: '80px auto',
                    padding: '0 20px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '2.5rem',
                      textAlign: 'center',
                      marginBottom: '60px',
                    }}
                  >
                    {block.heading}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {block.questions?.map((item: any, faqIndex: number) => (
                      <div
                        key={faqIndex}
                        style={{
                          background: '#f8f9fa',
                          padding: '30px',
                          borderRadius: '8px',
                        }}
                      >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>
                          {item.question}
                        </h3>
                        <div
                          style={{ opacity: 0.8, lineHeight: '1.6' }}
                          dangerouslySetInnerHTML={{
                            __html: extractTextFromLexical(item.answer),
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )

            default:
              return null
          }
        })}
    </div>
  )
}
