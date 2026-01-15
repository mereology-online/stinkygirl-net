import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    // Hide from the admin sidebar for non-admins (if they somehow got in)
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },
  access: {
    // Public can see the feed
    read: () => true,
    // Any logged-in user can create a post via the custom website form
    create: ({ req: { user } }) => !!user,
    // Users can only edit/delete their OWN posts
    update: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      return { author: { equals: user?.id } }
    },
    delete: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      return { author: { equals: user?.id } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      // Automatically assign the logged-in user as the author
      defaultValue: ({ user }) => user?.id,
    },
  ],
}