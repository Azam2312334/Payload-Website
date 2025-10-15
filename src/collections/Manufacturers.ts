import type { CollectionConfig } from 'payload'

export const Manufacturers: CollectionConfig = {
  slug: 'manufacturers', //collection name
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media', //relation to media collection
    },
    {
      name: 'cars', //join field to show related cars
      type: 'join',
      on: 'manufacturer', //field name in cars collection that points to manufacturers
      collection: 'cars',
    },
  ],
}
