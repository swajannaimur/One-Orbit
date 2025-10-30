import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "../../../auth/[...nextauth]/route";

async function userHasAccessToBoard(db, boardId, userEmail) {
  if (!boardId) return true;
  if (boardId === userEmail) return true;

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

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
    if (!task)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    const boardId = task.boardId || session.user.email;
    const allowed = await userHasAccessToBoard(db, boardId, session.user.email);
    if (!allowed) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    return new Response(JSON.stringify({ task }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const body = await req.json();
    const update = {};
    if (body.title !== undefined) update.title = body.title;
    if (body.description !== undefined) update.description = body.description;
    if (body.status !== undefined) update.status = body.status;
    update.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    // check permission against task's board
    const existing = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
    if (!existing) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    const boardId = existing.boardId || session.user.email;
    const allowed = await userHasAccessToBoard(db, boardId, session.user.email);
    if (!allowed) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const res = await db
      .collection("tasks")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: update }, { returnDocument: "after" });
    if (!res.value)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    // If task belongs to a sprint and was moved to 'done', check sprint completion
    try {
      const updated = res.value;
      const newStatus = updated.status;
      const sprintId = updated.sprintId;
      if (sprintId && newStatus === 'done') {
        // find any task in same sprint that is not done
        const sprintQuery = { $or: [{ sprintId: sprintId }] };
        // also try treating sprintId as ObjectId
        try {
          sprintQuery.$or.push({ sprintId: new ObjectId(sprintId) });
        } catch (e) {}

        const notDone = await db.collection('tasks').findOne({ $and: [sprintQuery, { status: { $ne: 'done' } }] });
        if (!notDone) {
          // mark sprint completed
          let sprintDoc = null;
          try {
            sprintDoc = await db.collection('sprints').findOne({ _id: new ObjectId(sprintId) });
          } catch (e) {
            // ignore
          }
          if (!sprintDoc) sprintDoc = await db.collection('sprints').findOne({ _id: sprintId });
          if (sprintDoc) {
            await db.collection('sprints').updateOne({ _id: sprintDoc._id }, { $set: { completed: true, completedAt: new Date() } });
            // create next sprint
            const nextName = (sprintDoc.name || 'Sprint') + ' - next';
            const nextSprint = { name: nextName, boardId: sprintDoc.boardId || boardId, createdAt: new Date(), createdBy: session.user.email, completed: false };
            await db.collection('sprints').insertOne(nextSprint);
          }
        }
      }
    } catch (e) {
      console.error('Sprint completion check failed', e);
    }

    return new Response(JSON.stringify({ task: res.value }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] PUT error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const existing = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
    if (!existing) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    const boardId = existing.boardId || session.user.email;
    const allowed = await userHasAccessToBoard(db, boardId, session.user.email);
    if (!allowed) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });

    const res = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] DELETE error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

