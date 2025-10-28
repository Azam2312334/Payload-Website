import type { Block } from 'payload'

// Hero Block for About Page
export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block',
      admin: {
        description: 'If checked, this block will be hidden from the frontend display.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
  ],
}

// Content Section Block
export const ContentSection: Block = {
  slug: 'contentSection',
  fields: [
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block',
      admin: {
        description: 'If checked, this block will be hidden from the frontend display.',
      },
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}

// Features Grid Block
export const FeaturesGrid: Block = {
  slug: 'featuresGrid',
  fields: [
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block',
      admin: {
        description: 'If checked, this block will be hidden from the frontend display.',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

// Export all About blocks
export const AboutBlocks = [Hero, ContentSection, FeaturesGrid]
