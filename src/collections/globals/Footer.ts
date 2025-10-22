import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#1f2937',
      admin: {
        description: 'Hex color code for footer background (e.g., #1f2937)',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      defaultValue: '#9ca3af',
      admin: {
        description: 'Hex color code for all text in footer (e.g., #9ca3af)',
      },
    },
    {
      name: 'iconColor',
      type: 'text',
      label: 'Icon Color',
      defaultValue: '#9ca3af',
      admin: {
        description: 'Hex color code for social media icons (e.g., #9ca3af)',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Company Description',
    },
    {
      name: 'centerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Center Image',
      admin: {
        description: 'Optional image to display between left and right sections',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Column Heading',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
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
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Icon (optional)',
          admin: {
            description: 'Upload a custom icon for this social link (overrides default icon).',
          },
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2025 Your Company. All rights reserved.',
    },
  ],
}
