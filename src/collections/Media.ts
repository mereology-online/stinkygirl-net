import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
access: {
  read: ({ req: { user } }) => {
    if (!user) return true // Public can see images on blog posts
    if ((user as any)?.role === 'admin') return true
    // Only show media uploaded by this user
    return { owner: { equals: user?.id } }
  },
},
fields: [
  {
    name: 'owner',
    type: 'relationship',
    relationTo: 'users',
    defaultValue: ({ user }) => user?.id,
    admin: { condition: () => false } // Keep this field hidden from the UI
  },
]}
