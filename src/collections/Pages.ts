import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        {
          label: 'Standard Page (Slug-based)',
          value: 'standard',
        },
        {
          label: 'Custom Layout - About',
          value: 'about',
        },
      ],
      admin: {
        description: 'Standard pages use dynamic routing, custom layouts have dedicated code',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => data.pageType === 'standard',
        description: 'Only used for standard slug-based pages',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      admin: {
        condition: (data) => data.pageType !== 'standard',
        description: 'Use blocks for custom layout pages',
      },
      blocks: [
        {
          slug: 'hero',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaLink', type: 'text' },
          ],
        },
        {
          slug: 'contentSection',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'content', type: 'richText' },
          ],
        },
        {
          slug: 'featuresGrid',
          fields: [
            {
              name: 'features',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'icon', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
