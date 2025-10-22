import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe } from 'lucide-react'

interface FooterProps {
  data: {
    backgroundColor?: string
    textColor?: string
    iconColor?: string
    logo?: {
      url?: string
      alt?: string
    }
    description?: string
    centerImage?: {
      url?: string
      alt?: string
      width?: number
      height?: number
    }
    columns?: Array<{
      heading: string
      links?: Array<{
        label: string
        url: string
        openInNewTab?: boolean
      }>
    }>
    socialLinks?: Array<{
      platform: string
      url: string
      icon?: {
        url: string
        alt?: string
        width?: number
        height?: number
      }
    }>
    copyrightText?: string
  }
}

export function Footer({ data }: FooterProps) {
  // Flatten all links from all columns into a single array
  const allLinks = data.columns?.flatMap((column) => column.links || []) || []

  // Use customizable colors with fallback defaults
  const backgroundColor = data.backgroundColor || '#1f2937'
  const textColor = data.textColor || '#9ca3af'
  const iconColor = data.iconColor || '#9ca3af'

  return (
    <footer
      style={{
        background: backgroundColor,
        color: 'white',
        padding: '60px 20px 20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Company Info - Left Side */}
          <div style={{ maxWidth: '400px' }}>
            {data.logo && typeof data.logo === 'object' && data.logo.url && (
              <Image
                src={data.logo.url}
                alt={data.logo.alt || 'Footer Logo'}
                width={120}
                height={40}
                style={{ marginBottom: '16px', objectFit: 'contain' }}
              />
            )}
            {data.description && (
              <p style={{ color: textColor, lineHeight: '1.6', marginTop: '16px' }}>
                {data.description}
              </p>
            )}
          </div>

          {/* Center Image */}
          {data.centerImage && typeof data.centerImage === 'object' && data.centerImage.url && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Image
                src={data.centerImage.url}
                alt={data.centerImage.alt || 'Center Image'}
                width={100}
                height={100}
                style={{ objectFit: 'contain', maxWidth: '100%' }}
              />
              {data.centerImage.alt && (
                <p style={{ color: textColor, fontSize: '14px', margin: 0, textAlign: 'center' }}>
                  {data.centerImage.alt}
                </p>
              )}
            </div>
          )}

          {/* Right Side - Social Links, Footer Links, and Copyright */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '2px',
              flex: 1,
            }}
          >
            {/* Social Links */}
            {data.socialLinks && data.socialLinks.length > 0 && (
              <div style={{ display: 'flex', gap: '16px' }}>
                {data.socialLinks.map((social, index) => {
                  const getSocialIcon = (platform: string) => {
                    const lowerPlatform = platform.toLowerCase()
                    switch (lowerPlatform) {
                      case 'facebook':
                        return <Facebook size={20} />
                      case 'twitter':
                      case 'x':
                        return <Twitter size={20} />
                      case 'instagram':
                        return <Instagram size={20} />
                      case 'linkedin':
                        return <Linkedin size={20} />
                      case 'youtube':
                        return <Youtube size={20} />
                      default:
                        return <Globe size={20} />
                    }
                  }

                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: iconColor,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                      }}
                      title={social.platform}
                    >
                      {social.icon && social.icon.url ? (
                        <Image
                          src={social.icon.url}
                          alt={social.icon.alt || social.platform}
                          width={social.icon.width || 20}
                          height={social.icon.height || 20}
                          style={{ objectFit: 'contain', display: 'block' }}
                        />
                      ) : (
                        getSocialIcon(social.platform)
                      )}
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Footer Links (Horizontal) */}
            {allLinks.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '4px 28px',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                }}
              >
                {allLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={link.url}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      style={{
                        color: textColor,
                        textDecoration: 'none',
                        fontSize: '16px',
                        transition: 'color 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {link.label}
                    </Link>
                    {index < allLinks.length - 1 && <span style={{ color: textColor }}>|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Copyright Text */}
            <p style={{ color: textColor, margin: 0, fontSize: '16px' }}>{data.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
