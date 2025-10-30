"use client";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useFrontendTool } from "@copilotkit/react-core";
import Swal from "sweetalert2";

const COLUMNS = [
  { key: "todo", title: "📝 To Do", color: "from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-800/50" },
  { key: "inprogress", title: "⚙️ In Progress", color: "from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/50" },
  { key: "done", title: "✅ Done", color: "from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/50" },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function KanbanBoard() {
  const [tasksByStatus, setTasksByStatus] = useState({ todo: [], inprogress: [], done: [] });
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

  useEffect(() => { loadTasks(); }, []);

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

  // AI & Delete tools omitted for brevity (keep as in your original code)
  // saveTask, deleteTask, handleDragEnd, handleBeforeCapture remain unchanged

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 rounded-xl transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold bg-linear-to-br from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent">
          Board
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setEditingTask({ title: "", description: "", status: "todo" }); setModalOpen(true); }}
            className="px-4 py-2 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-sm"
          >
            + New Task
          </button>
          <button
            onClick={loadTasks}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base"
          >
            Refresh
          </button>
        </div>
      </div>

      <DragDropContext onBeforeCapture={() => (isDraggingRef.current = true)} onDragEnd={(res) => {
        isDraggingRef.current = false;
        const { destination, source } = res;
        if (!destination) return;
        const srcCol = source.droppableId, destCol = destination.droppableId;
        if (srcCol === destCol) {
          const reordered = reorder(tasksByStatus[srcCol], source.index, destination.index);
          setTasksByStatus((prev) => ({ ...prev, [srcCol]: reordered }));
          return;
        }
        const moving = tasksByStatus[srcCol][source.index];
        if (!moving) return;
        const newSrc = Array.from(tasksByStatus[srcCol]);
        newSrc.splice(source.index, 1);
        const newDest = Array.from(tasksByStatus[destCol]);
        newDest.splice(destination.index, 0, moving);
        setTasksByStatus((prev) => ({ ...prev, [srcCol]: newSrc, [destCol]: newDest }));
        fetch(`/api/kanban/tasks/${moving._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: destCol }) }).catch(console.error);
      }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col) => (
            <div key={col.key} className={`rounded-xl shadow-lg p-4 bg-linear-to-b ${col.color} border border-gray-100 dark:border-gray-700 transition-colors duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{col.title}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{tasksByStatus[col.key]?.length || 0}</span>
              </div>

              <Droppable droppableId={col.key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded transition ${snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}
                  >
                    {tasksByStatus[col.key]?.map((task, index) => (
                      <Draggable key={String(task._id)} draggableId={String(task._id)} index={index}>
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-3 hover:shadow-xl transition-all duration-200 cursor-grab border border-gray-100 dark:border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">{task.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</div>
                              </div>
                              <div className="ml-3 flex flex-col gap-1 text-sm">
                                <button onClick={() => { setEditingTask(task); setModalOpen(true); }} className="text-indigo-600 dark:text-indigo-400 hover:underline">Edit</button>
                                <button onClick={() => deleteTask(task._id)} className="text-red-600 dark:text-red-400 hover:underline">Delete</button>
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
          instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          labels={{ title: "One-Orbit Assistant", initial: "Easily add tasks by pasting your project description" }}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-linear-to-br from-amber-100 via-white to-orange-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all animate-scaleIn">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{editingTask?._id ? "Edit Task" : "New Task"}</h4>
            <div className="space-y-3">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
                value={editingTask?.title || ""}
                onChange={(e) => setEditingTask((s) => ({ ...s, title: e.target.value }))}
                placeholder="Title"
              />
              <textarea
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
                value={editingTask?.description || ""}
                onChange={(e) => setEditingTask((s) => ({ ...s, description: e.target.value }))}
                placeholder="Description"
                rows={4}
              />
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
                value={editingTask?.status || "todo"}
                onChange={(e) => setEditingTask((s) => ({ ...s, status: e.target.value }))}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => { setModalOpen(false); setEditingTask(null); }} className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                Cancel
              </button>
              <button onClick={() => saveTask(editingTask)} className="px-4 py-2 bg-linear-to-r from-amber-400 to-orange-500 dark:from-amber-700 dark:to-orange-700 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-orange-800 transition-all duration-200 shadow-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
