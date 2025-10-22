import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter relative path (e.g., /about) or full URL',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          label: 'Open in new tab',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button (optional)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
        },
      ],
    },
  ],
}
