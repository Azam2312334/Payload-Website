import type { Block } from 'payload'

// 1. Hero Banner Block
export const DigitalContentHero: Block = {
  slug: 'digitalContentHero',
  fields: [
    {
      name: 'bannerText',
      type: 'text',
      required: true,
      label: 'Banner Text',
    },
    {
      name: 'bannerDescription',
      type: 'textarea',
      required: true,
      label: 'Banner Description',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
    },
    {
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      required: true,
      defaultValue: 'image',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'YouTube Video',
          value: 'youtube',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'image',
      },
    },
    {
      name: 'youtubeVideoId',
      type: 'text',
      label: 'YouTube Video ID',
      admin: {
        description: 'Enter the YouTube video ID (e.g., ty2Uq2ip340 from https://www.youtube.com/watch?v=ty2Uq2ip340)',
        condition: (data, siblingData) => siblingData?.backgroundType === 'youtube',
      },
    },
  ],
}

// 2. Focus Area Block
export const FocusArea: Block = {
  slug: 'focusArea',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Focus Areas',
    },
    {
      name: 'areas',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
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

// 3. Global Champion Block
export const GlobalChampion: Block = {
  slug: 'globalChampion',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

// 4. National Impact Block
export const NationalImpact: Block = {
  slug: 'nationalImpact',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'National Impact',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color (hex code)',
          defaultValue: '#f3f4f6',
          admin: {
            description: 'Enter hex color code (e.g., #f3f4f6)',
          },
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Text Color',
          defaultValue: 'black',
          options: [
            {
              label: 'Black',
              value: 'black',
            },
            {
              label: 'White',
              value: 'white',
            },
          ],
        },
      ],
    },
  ],
}

// 5. Industry Size Block
export const IndustrySize: Block = {
  slug: 'industrySize',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Industry Size',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'companies',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'count',
          type: 'number',
          required: true,
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

// 6. Our Highlights Block
export const OurHighlights: Block = {
  slug: 'ourHighlights',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Highlights',
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

// 7. Programmes & Initiatives Block
export const ProgrammesInitiatives: Block = {
  slug: 'programmesInitiatives',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Other Programmes & Initiatives',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

// 8. Our Publications Block
export const OurPublications: Block = {
  slug: 'ourPublications',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Publications',
    },
    {
      name: 'downloadLabel',
      type: 'text',
      defaultValue: 'DOWNLOAD PDF',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Hex color code (e.g., #DDDAE4)',
          },
        },
        {
          name: 'pdfFile',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
        },
      ],
    },
  ],
}

// 9. Get In Touch Block
export const GetInTouch: Block = {
  slug: 'getInTouch',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Get In Touch',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      defaultValue: 'CONTACT US',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

// 10. FAQ Block (Optional)
export const FAQ: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}

// Export all blocks as an array
export const DigitalContentBlocks = [
  DigitalContentHero,
  FocusArea,
  GlobalChampion,
  NationalImpact,
  IndustrySize,
  OurHighlights,
  ProgrammesInitiatives,
  OurPublications,
  GetInTouch,
  FAQ,
]
