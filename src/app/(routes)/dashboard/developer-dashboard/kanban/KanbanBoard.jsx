"use client";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const COLUMNS = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "done", title: "Done" },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function KanbanBoard() {
  const [tasksByStatus, setTasksByStatus] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const isDraggingRef = useRef(false); // prevent race condition

  function normalizeId(val) {
    if (!val) return null;
    if (typeof val === "object") {
      if (val.$oid) return val.$oid;
      if (typeof val.toString === "function") return val.toString();
    }
    return String(val);
  }

  useEffect(() => {
    setIsMounted(true);
    loadTasks();
  }, []);

  async function loadTasks() {
    if (isDraggingRef.current) return; // avoid reloading mid-drag
    setLoading(true);
    try {
      const res = await fetch("/api/kanban/tasks");
      const data = await res.json();
      const grouped = { todo: [], inprogress: [], done: [] };

      (data.tasks || []).forEach((raw) => {
        const id = normalizeId(raw._id);
        grouped[raw.status || "todo"].push({ ...raw, _id: id });
      });

      setTasksByStatus(grouped);
    } catch (err) {
      console.error("loadTasks error", err);
    } finally {
      setLoading(false);
    }
  }

  // ******save and delete task functions

  async function saveTask(task) {
    try {
      if (task._id) {
        // Normalize the id before calling the API to avoid object-shaped ids
        const id = normalizeId(task._id);
        const res = await fetch(`/api/kanban/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("Failed to update task: ", res.status, text);
          // Try to recover locally by updating UI with the submitted task
          const fallback = { ...task, _id: id };
          setTasksByStatus((prev) => {
            const copy = { ...prev };
            Object.keys(copy).forEach(
              (k) =>
                (copy[k] = copy[k].filter((c) => normalizeId(c._id) !== id))
            );
            copy[fallback.status] = [fallback, ...copy[fallback.status]];
            return copy;
          });
        } else {
          const data = await res.json().catch(() => null);
          const returned = data && data.task ? data.task : task;
          const updated = { ...returned, _id: normalizeId(returned._id ?? id) };
          setTasksByStatus((prev) => {
            const copy = { ...prev };
            Object.keys(copy).forEach(
              (k) =>
                (copy[k] = copy[k].filter(
                  (c) => normalizeId(c._id) !== normalizeId(updated._id)
                ))
            );
            copy[updated.status] = [updated, ...copy[updated.status]];
            return copy;
          });
        }
      } else {
        const res = await fetch(`/api/kanban/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.error("Failed to create task:", res.status, txt);
        } else {
          const data = await res.json().catch(() => null);
          const created = data && data.task ? data.task : task;
          const createdWithId = { ...created, _id: normalizeId(created._id) };
          setTasksByStatus((prev) => ({
            ...prev,
            [createdWithId.status]: [
              createdWithId,
              ...prev[createdWithId.status],
            ],
          }));
        }
      }
    } catch (err) {
      console.error("saveTask error", err);
    } finally {
      setModalOpen(false);
      setEditingTask(null);
    }
  }

  async function deleteTask(taskId) {
    if (!confirm("Delete this task?")) return;
    try {
      const id = normalizeId(taskId);
      await fetch(`/api/kanban/tasks/${id}`, { method: "DELETE" });
      setTasksByStatus((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach(
          (k) => (copy[k] = copy[k].filter((c) => normalizeId(c._id) !== id))
        );
        return copy;
      });
    } catch (err) {
      console.error("deleteTask error", err);
    }
  }
  // ********

  async function handleDragEnd(result) {
    isDraggingRef.current = false;
    const { destination, source } = result;
    if (!destination) return;

    const srcCol = source.droppableId;
    const destCol = destination.droppableId;

    if (srcCol === destCol) {
      const reordered = reorder(
        tasksByStatus[srcCol],
        source.index,
        destination.index
      );
      setTasksByStatus((prev) => ({ ...prev, [srcCol]: reordered }));
      return;
    }

    const moving = tasksByStatus[srcCol][source.index];
    if (!moving) return;

    const newSrc = Array.from(tasksByStatus[srcCol]);
    newSrc.splice(source.index, 1);
    const newDest = Array.from(tasksByStatus[destCol]);
    newDest.splice(destination.index, 0, moving);

    setTasksByStatus((prev) => ({
      ...prev,
      [srcCol]: newSrc,
      [destCol]: newDest,
    }));

    try {
      await fetch(`/api/kanban/tasks/${moving._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: destCol }),
      });
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  }

  function handleBeforeCapture() {
    isDraggingRef.current = true;
  }

  // 👇 DragDropContext updated to include beforeCapture
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold">Kanban Board</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingTask({ title: "", description: "", status: "todo" });
              setModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + New Task
          </button>
          <button
            onClick={loadTasks}
            className="px-3 py-1 border rounded hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <DragDropContext
        onBeforeCapture={handleBeforeCapture}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className="bg-white rounded-lg shadow p-4 min-h-[300px]"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{col.title}</h4>
                <span className="text-sm text-gray-500">
                  {tasksByStatus[col.key]?.length || 0}
                </span>
              </div>

              <Droppable
                droppableId={col.key}
                isCombineEnabled={false}
                isDropDisabled={false}
                ignoreContainerClipping={false}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded transition ${
                      snapshot.isDraggingOver ? "bg-blue-50" : ""
                    }`}
                  >
                    {tasksByStatus[col.key]?.map((task, index) => (
                      <Draggable
                        key={String(task._id)}
                        draggableId={String(task._id)}
                        index={index}
                      >
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="p-3 bg-gray-50 rounded border mb-3 hover:shadow cursor-grab"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-sm text-gray-500">
                                  {task.description}
                                </div>
                              </div>
                              <div className="ml-3 flex flex-col gap-2">
                                <button
                                  onClick={() => {
                                    setEditingTask(task);
                                    setModalOpen(true);
                                  }}
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="text-sm text-red-600 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h4 className="text-lg font-semibold mb-3">
              {editingTask?._id ? "Edit Task" : "New Task"}
            </h4>
            <div className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                value={editingTask?.title || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, title: e.target.value }))
                }
                placeholder="Title"
              />
              <textarea
                className="w-full border rounded px-3 py-2"
                value={editingTask?.description || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, description: e.target.value }))
                }
                placeholder="Description"
                rows={4}
              />
              <select
                className="w-full border rounded px-3 py-2"
                value={editingTask?.status || "todo"}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, status: e.target.value }))
                }
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingTask(null);
                }}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => saveTask(editingTask)}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}