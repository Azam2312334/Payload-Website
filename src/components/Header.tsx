'use client'
import Link from 'next/link'
import Image from 'next/image'

import type { Header as HeaderType, Media } from '@/payload-types'

import { useLanguage } from '@/contexts/LanguageContext'

interface HeaderProps {
  data: HeaderType
}

export function Header({ data }: HeaderProps) {
  const { lang, setLang } = useLanguage()

  return (
    <header
      style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {data.logo && typeof data.logo === 'object' && (data.logo as Media).url ? (
            <Image
              src={(data.logo as Media).url || ''}
              alt={(data.logo as Media).alt || 'Logo'}
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          ) : null}
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {data.navigation?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              style={{
                color: '#374151',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              {lang === 'bm' && link.label_bm ? link.label_bm : link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* CTA Button */}
          {data.ctaButton?.url && (
            <Link
              href={data.ctaButton.url}
              style={{
                padding: '10px',
                background: 'white',
                color: '#E62A32',
                textDecoration: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background-color 0.2s',
                border: '1px solid #e5e7eb',
              }}
              title={
                lang === 'bm' && data.ctaButton.text_bm
                  ? data.ctaButton.text_bm
                  : data.ctaButton.text || 'Menu'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h24v24H0z"></path>
                  <g fill="#E62A32">
                    <path d="M17 3h4v4h-4zM10 3h4v4h-4zM3 3h4v4H3zM17 10h4v4h-4zM10 10h4v4h-4zM3 10h4v4H3zM17 17h4v4h-4zM10 17h4v4h-4zM3 17h4v4H3z"></path>
                  </g>
                </g>
              </svg>
            </Link>
          )}
          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setLang('en')}
              style={{
                padding: '6px 14px',
                borderRadius: '4px 0 0 4px',
                border: '1px solid #e5e7eb',
                background: lang === 'en' ? '#E62A32' : 'white',
                color: lang === 'en' ? 'white' : '#374151',
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none',
                borderRight: 'none',
              }}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bm')}
              style={{
                padding: '6px 14px',
                borderRadius: '0 4px 4px 0',
                border: '1px solid #e5e7eb',
                background: lang === 'bm' ? '#E62A32' : 'white',
                color: lang === 'bm' ? 'white' : '#374151',
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none',
                borderLeft: 'none',
              }}
              aria-pressed={lang === 'bm'}
            >
              BM
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
