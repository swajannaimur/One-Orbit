"use client";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useFrontendTool } from "@copilotkit/react-core";

const COLUMNS = [
  { key: "todo", title: "📝 To Do", color: "from-pink-100 to-pink-50" },
  {
    key: "inprogress",
    title: "⚙️ In Progress",
    color: "from-blue-100 to-blue-50",
  },
  { key: "done", title: "✅ Done", color: "from-green-100 to-green-50" },
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const isDraggingRef = useRef(false);

  function normalizeId(val) {
    if (!val) return null;
    if (typeof val === "object") {
      if (val.$oid) return val.$oid;
      if (typeof val.toString === "function") return val.toString();
    }
    return String(val);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    if (isDraggingRef.current) return;
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

  // AI task add
  useFrontendTool({
    name: "addTodoItem",
    description: "Add a new todo item to the Kanban board",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the todo item",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Optional description",
        required: false,
      },
    ],
    handler: async ({ title, description }) => {
      if (!title) return;

      const newTask = {
        title,
        description: description || "",
        status: "todo",
      };

      await saveTask(newTask);
    },
  });

  // Delete Todo
  useFrontendTool({
    name: "deleteTodoItem",
    description: "Delete a todo item from the Kanban board",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the todo item to delete",
        required: true,
      },
    ],
    handler: async ({ title }) => {
      if (!title) return;

      // Find the task with this title
      const taskToDelete = Object.values(tasksByStatus)
        .flat()
        .find((t) => t.title === title);

      if (!taskToDelete) {
        console.error("Task not found:", title);
        return;
      }

      await deleteTask(taskToDelete._id);
    },
  });

  // ******save and delete task functions

  async function saveTask(task) {
    try {
      if (task._id) {
        const id = normalizeId(task._id);
        const res = await fetch(`/api/kanban/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        if (res.ok) {
          const data = await res.json().catch(() => null);
          const updated = { ...(data?.task || task), _id: id };
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
        if (res.ok) {
          const data = await res.json().catch(() => null);
          const created = { ...(data?.task || task) };
          created._id = normalizeId(created._id);
          setTasksByStatus((prev) => ({
            ...prev,
            [created.status]: [created, ...prev[created.status]],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-amber-400 tracking-wide">
          Kanban Board
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingTask({ title: "", description: "", status: "todo" });
              setModalOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg  transition-all duration-300 hover:scale-105 shadow-sm"
          >
            + New Task
          </button>
          <button
            onClick={loadTasks}
            className="px-4 py-2 border border-gray-300 rounded-lg  bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden text-sm lg:text-base"
          >
            Refresh
          </button>
        </div>
      </div>

      <DragDropContext
        onBeforeCapture={handleBeforeCapture}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={`rounded-xl shadow-lg p-4 bg-gradient-to-b ${col.color} border border-gray-100`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800">
                  {col.title}
                </h4>
                <span className="text-sm text-gray-500 font-medium">
                  {tasksByStatus[col.key]?.length || 0}
                </span>
              </div>

              <Droppable droppableId={col.key}>
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
                            className="p-4 bg-white rounded-lg shadow-md mb-3 hover:shadow-xl transition-all duration-200 cursor-grab border border-gray-100"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-gray-800 text-sm md:text-base">
                                  {task.title}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {task.description}
                                </div>
                              </div>
                              <div className="ml-3 flex flex-col gap-1 text-sm">
                                <button
                                  onClick={() => {
                                    setEditingTask(task);
                                    setModalOpen(true);
                                  }}
                                  className="text-indigo-600 hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="text-red-600 hover:underline"
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

      {/* AI Popup */}
      <div className="z-50 mt-5">
        <CopilotPopup
          instructions={
            "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          }
          labels={{
            title: "One-Orbit Assistant",
            initial: "Easily add tasks by pasting your project description",
          }}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-100 via-white to-orange-100 rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all animate-scaleIn">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              {editingTask?._id ? "Edit Task" : "New Task"}
            </h4>
            <div className="space-y-3">
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editingTask?.title || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, title: e.target.value }))
                }
                placeholder="Title"
              />
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editingTask?.description || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({
                    ...s,
                    description: e.target.value,
                  }))
                }
                placeholder="Description"
                rows={4}
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 "
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
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingTask(null);
                }}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => saveTask(editingTask)}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple fade-in animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
