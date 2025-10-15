import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        //image uploaded
        name: 'thumbnail',
        width: 300,
        height: 300,
      },
      {
        //image resize
        name: 'banner',
        width: 1024,
        height: 640,
      },
    ],
  },
}
