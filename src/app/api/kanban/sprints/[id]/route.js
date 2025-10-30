import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../auth/[...nextauth]/route";
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { id } = params;
    const { name } = await req.json();
    if (!name) return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection('sprints').updateOne(
      { _id: new ObjectId(id), createdBy: session.user.email },
      { $set: { name } }
    );

    if (result.matchedCount === 0)
      return new Response(JSON.stringify({ error: 'Sprint not found or unauthorized' }), { status: 404 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('/api/kanban/sprints/[id] PUT error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { id } = params;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection('sprints').deleteOne({
      _id: new ObjectId(id),
      createdBy: session.user.email,
    });

    if (result.deletedCount === 0)
      return new Response(JSON.stringify({ error: 'Sprint not found or unauthorized' }), { status: 404 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('/api/kanban/sprints/[id] DELETE error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
