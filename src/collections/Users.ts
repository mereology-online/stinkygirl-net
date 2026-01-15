import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    // Completely hide this collection from the sidebar for anyone not an admin
    hidden: ({ user }) => (user as any)?.role !== 'admin',
  },
  access: {
    // 1. THE BOUNCER: This is the ONLY way to block /admin access.
    // If this returns false, the user is kicked out of the admin panel.
    admin: ({ req: { user } }) => (user as any)?.role === 'admin',

    // 2. DATA PROTECTION: Regular users can only see their own profile via API.
    read: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      return { id: { equals: user?.id } }
    },
    // Only admins can manage the user list
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
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
        // Even if they found a way in, they can't change their own role
        update: ({ req: { user } }) => (user as any)?.role === 'admin',
      },
    },
  ],
}