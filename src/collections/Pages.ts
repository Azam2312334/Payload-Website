import type { CollectionConfig } from 'payload'
import { AboutBlocks, DigitalContentBlocks } from './blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'goLiveAt',
      type: 'date',
      label: 'Go Live Date',
      admin: {
        description:
          'Set the date when this page should go live. If you want to specify a time, set the date first.',
      },
      required: false,
    },
    {
      name: 'goLiveTime',
      type: 'text',
      label: 'Go Live Time (HH:mm)',
      admin: {
        description:
          'Optional - Set the time (24-hour, e.g., 14:30) when this page should go live.',
        condition: (data) => Boolean(data.goLiveAt),
      },
      required: false,
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      label: 'Open links to this page in a new tab',
      admin: {
        description: 'If checked, links to this page should open in a new browser tab.',
      },
    },
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
      label: 'Page Type',
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
        {
          label: 'Custom Layout - Digital Content',
          value: 'digitalContent',
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
    // About Page Blocks
    {
      name: 'aboutBlocks',
      type: 'blocks',
      admin: {
        condition: (data) => data.pageType === 'about',
        description: 'Blocks for About page layout',
      },
      blocks: AboutBlocks,
    },
    // Digital Content Page Blocks
    {
      name: 'digitalContentBlocks',
      type: 'blocks',
      admin: {
        condition: (data) => data.pageType === 'digitalContent',
        description: 'Blocks for Digital Content page layout',
      },
      blocks: DigitalContentBlocks,
    },
  ],
}
