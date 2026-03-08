import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const payload = await getPayload({ config })
  
  // Get the authenticated user from the session
  const { user } = await payload.auth(req)
  
  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const data = await req.json()
  
  try {
    const comment = await payload.create({
      collection: 'comments',
      data: {
        content: data.content,
        post: data.post,
        parent: data.parent || null,
        author: user.id, // Explicitly pass the ID to satisfy the 'required' check
      },
    })
    return NextResponse.json(comment)
  } catch (err) {
    console.error("COMMENT_CREATE_ERR:", err)
    return NextResponse.json({ error: 'TRANS_ERROR' }, { status: 500 })
  }
}