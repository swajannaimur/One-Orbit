import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const tasks = await db.collection('tasks').find({}).toArray();
    return new Response(JSON.stringify({ tasks }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('/api/kanban/tasks GET error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const { title, description, status } = body;
    if (!title) return new Response(JSON.stringify({ error: 'Title required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const doc = { title, description: description || '', status: status || 'todo', createdAt: new Date(), createdBy: session.user.email };
    const res = await db.collection('tasks').insertOne(doc);
    doc._id = res.insertedId;
    return new Response(JSON.stringify({ task: doc }), { headers: { 'Content-Type': 'application/json' }, status: 201 });
  } catch (err) {
    console.error('/api/kanban/tasks POST error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
