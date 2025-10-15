import type { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars', //collection name
  admin: {
    useAsTitle: 'title', //titlefield
  },
  access: {
    read: () => true, // Simple access control to avoid null issues
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', //relation to media collection
    },
    {
      name: 'manufacturer',
      type: 'relationship',
      relationTo: 'manufacturers',
      required: false,
    },
  ],
}
