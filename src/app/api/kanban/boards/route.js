import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const email = session.user.email;
    const boards = await db
      .collection('boards')
      .find({ $or: [{ owner: email }, { collaborators: email }] })
      .toArray();

    return new Response(JSON.stringify({ boards }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('/api/kanban/boards GET error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const { name, collaborators } = body;
    if (!name) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const doc = { name, owner: session.user.email, collaborators: Array.isArray(collaborators) ? collaborators : [], createdAt: new Date() };
    const res = await db.collection('boards').insertOne(doc);
    doc._id = res.insertedId;
    return new Response(JSON.stringify({ board: doc }), { headers: { 'Content-Type': 'application/json' }, status: 201 });
  } catch (err) {
    console.error('/api/kanban/boards POST error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const { boardId, name, collaborators } = body;
    if (!boardId) return new Response(JSON.stringify({ error: 'boardId required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    let query = { _id: null };
    try {
      query = { _id: new ObjectId(boardId) };
    } catch (e) {
      query = { _id: boardId };
    }

    const board = await db.collection('boards').findOne(query);
    if (!board) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    if (board.owner !== session.user.email) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const update = {};
    if (name !== undefined) update.name = name;
    if (collaborators !== undefined) update.collaborators = Array.isArray(collaborators) ? collaborators : [];
    update.updatedAt = new Date();

    await db.collection('boards').updateOne(query, { $set: update });
    const updated = await db.collection('boards').findOne(query);
    return new Response(JSON.stringify({ board: updated }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('/api/kanban/boards PUT error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
