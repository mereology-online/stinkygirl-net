// src/collections/Comments.ts
import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  // ... other settings (access, admin, etc.)
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments',
      // FIX: Change 'comment' to 'admin.description' or just a JS comment
      admin: {
        description: 'Reference to the parent comment for threaded replies.',
      },
    },
    {
      name: 'isEdited',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
}