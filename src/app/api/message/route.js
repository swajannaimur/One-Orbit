import clientPromise from '@/lib/mongodb'

export async function POST(req) {
  try {
    const body = await req.json()
    const { developerId, developerEmail, name, email, message } = body

    if (!developerId || !name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)

    const doc = {
      developerId,
      developerEmail,
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    }

    const res = await db.collection('developer-messages').insertOne(doc)

    return new Response(JSON.stringify({ success: true, id: res.insertedId.toString() }), { status: 200 })
  } catch (err) {
    console.error('/api/developers/message error', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
