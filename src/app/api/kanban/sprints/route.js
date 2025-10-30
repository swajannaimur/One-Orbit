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

    // allow boardId header to scope sprints
    const headerBoardId = req.headers.get('boardid');
    const boardId = headerBoardId || session.user.email;

    const sprints = await db.collection('sprints').find({ boardId }).toArray();
    return new Response(JSON.stringify({ sprints }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('/api/kanban/sprints GET error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const { name, boardId } = body;
    if (!name) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const doc = { name, boardId: boardId || session.user.email, createdAt: new Date(), createdBy: session.user.email, completed: false };
    const res = await db.collection('sprints').insertOne(doc);
    doc._id = res.insertedId;
    return new Response(JSON.stringify({ sprint: doc }), { headers: { 'Content-Type': 'application/json' }, status: 201 });
  } catch (err) {
    console.error('/api/kanban/sprints POST error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

    
