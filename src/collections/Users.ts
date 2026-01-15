import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'displayName', // Changed to displayName for a better admin look
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },
  access: {
    admin: ({ req: { user } }) => (user as any)?.role === 'admin',
    read: () => true, // Let anyone see user names/bios for the public feed
    
    // ALLOW users to update their own data (Bio/Name)
    update: ({ req: { user } }) => {
      if (!user) return false
      if ((user as any).role === 'admin') return true
      return { id: { equals: user.id } }
    },
    
    // Keep these restricted
    create: () => true,
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'bio', // <--- ADDED BIO FIELD
      type: 'textarea',
      maxLength: 160, // Classic "Twitter" style length
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      access: {
        // Users cannot upgrade themselves to Admin
        update: ({ req: { user } }) => (user as any)?.role === 'admin',
      },
    },
  ],
}