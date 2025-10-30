import type { Block } from 'payload'

// Hero Block for About Page
export const Hero: Block = {
  slug: 'hero',
  fields: [
    // Go Live fields
    {
      name: 'goLiveAt',
      type: 'date',
      label: 'Go Live Date',
      admin: {
        description:
          'Set the date when this block should go live. If you want to specify a time, set the date first.',
      },
      required: false,
    },
    {
      name: 'goLiveTime',
      type: 'text',
      label: 'Go Live Time (HH:mm)',
      admin: {
        description:
          'Optional - Set the time (24-hour, e.g., 14:30) when this block should go live.',
        condition: (data) => Boolean(data.goLiveAt),
      },
      required: false,
    },
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
    // Go Live fields
    {
      name: 'goLiveAt',
      type: 'date',
      label: 'Go Live Date',
      admin: {
        description:
          'Set the date when this block should go live. If you want to specify a time, set the date first.',
      },
      required: false,
    },
    {
      name: 'goLiveTime',
      type: 'text',
      label: 'Go Live Time (HH:mm)',
      admin: {
        description:
          'Optional - Set the time (24-hour, e.g., 14:30) when this block should go live.',
        condition: (data) => Boolean(data.goLiveAt),
      },
      required: false,
    },
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
    // Go Live fields
    {
      name: 'goLiveAt',
      type: 'date',
      label: 'Go Live Date',
      admin: {
        description:
          'Set the date when this block should go live. If you want to specify a time, set the date first.',
      },
      required: false,
    },
    {
      name: 'goLiveTime',
      type: 'text',
      label: 'Go Live Time (HH:mm)',
      admin: {
        description:
          'Optional - Set the time (24-hour, e.g., 14:30) when this block should go live.',
        condition: (data) => Boolean(data.goLiveAt),
      },
      required: false,
    },
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
