import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

async function userHasAccessToBoard(db, boardId, userEmail) {
  if (!boardId) return true; // fallback allowed
  // if boardId equals userEmail, owner default
  if (boardId === userEmail) return true;

  // try to find board by _id or owner
  let board = null;
  try {
    board = await db.collection('boards').findOne({ _id: new ObjectId(boardId) });
  } catch (e) {
    // not an ObjectId
  }
  if (!board) board = await db.collection('boards').findOne({ owner: boardId });
  if (!board) return false;
  if (board.owner === userEmail) return true;
  if (Array.isArray(board.collaborators) && board.collaborators.includes(userEmail)) return true;
  return false;
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // allow optional boardId header to scope tasks; default to personal board (user email)
    const headerBoardId = req.headers.get('boardid');
    const boardId = headerBoardId || session.user.email;

    // permission check (owner or collaborator)
    const allowed = await userHasAccessToBoard(db, boardId, session.user.email);
    if (!allowed) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const tasks = await db.collection('tasks').find({ boardId }).toArray();
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
    const { title, description, status, boardId: incomingBoardId, sprintId } = body;
    if (!title) return new Response(JSON.stringify({ error: 'Title required' }), { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // default boardId to owner (user email) if not provided
    const boardId = incomingBoardId || session.user.email;

    // check permissions: user must be owner or collaborator
    const allowed = await userHasAccessToBoard(db, boardId, session.user.email);
    if (!allowed) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const doc = { title, description: description || '', status: status || 'todo', createdAt: new Date(), createdBy: session.user.email, boardId, sprintId: sprintId || null };
    const res = await db.collection('tasks').insertOne(doc);
    doc._id = res.insertedId;
    return new Response(JSON.stringify({ task: doc }), { headers: { 'Content-Type': 'application/json' }, status: 201 });
  } catch (err) {
    console.error('/api/kanban/tasks POST error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
