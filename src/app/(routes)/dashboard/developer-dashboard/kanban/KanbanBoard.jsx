"use client";

import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useFrontendTool } from "@copilotkit/react-core";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";

const COLUMNS = [
  {
    key: "todo",
    title: "📝 To Do",
    color: "from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-800/50",
  },
  {
    key: "inprogress",
    title: "⚙️ In Progress",
    color: "from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/50",
  },
  {
    key: "done",
    title: "✅ Done",
    color:
      "from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/50",
  },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function KanbanBoard() {
  const { data: session } = useSession();
  const [tasksByStatus, setTasksByStatus] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null); 
  const [sprints, setSprints] = useState([]);
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
    loadBoards();
    loadTasks();
  }, []);

  useEffect(() => {
    // reload sprints when board changes
    loadSprints();
    loadTasks();
  }, [selectedBoardId]);

  async function manageBoardCollaborators(boardId) {
    try {
      const board = boards.find((b) => String(b._id) === String(boardId));
      if (!board) return;

      const { value: emails } = await Swal.fire({
        title: "Manage Collaborators",
        html: `
          <p class="mb-2 text-sm text-gray-600">Current collaborators:</p>
          <p class="mb-4 text-sm">${board.collaborators?.length
            ? board.collaborators.join(", ")
            : "None"
          }</p>
          <p class="mb-2 text-sm text-gray-600">Add or update (comma-separated emails):</p>
        `,
        input: "text",
        inputValue: board.collaborators?.join(", ") || "",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) return "Enter at least one email";
          const emails = value.split(",").map((e) => e.trim());
          const invalid = emails.find((e) => !e.includes("@"));
          if (invalid) return "Invalid email format";
        },
      });

      if (!emails) return;
      const collaborators = emails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      const res = await fetch(`/api/kanban/boards`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardId, collaborators }),
      });

      if (res.ok) {
        await loadBoards();
        Swal.fire({
          icon: "success",
          title: "Collaborators updated",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to update collaborators");
      }
    } catch (e) {
      console.error("manageBoardCollaborators error", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update collaborators",
      });
    }
  }

  async function deleteSprint(sprintId) {
    try {
      const sprint = sprints.find((s) => String(s._id) === String(sprintId));
      if (!sprint) return;

      const result = await Swal.fire({
        title: "Delete Sprint?",
        text: `Are you sure you want to delete sprint "${sprint.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it",
      });

      if (!result.isConfirmed) return;

      const res = await fetch(`/api/kanban/sprints/${sprintId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await loadSprints();
        Swal.fire({
          icon: "success",
          title: "Sprint deleted",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to delete sprint");
      }
    } catch (e) {
      console.error("deleteSprint error", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete sprint",
      });
    }
  }

  async function updateSprint(sprintId) {
    try {
      const sprint = sprints.find((s) => String(s._id) === String(sprintId));
      if (!sprint) return;

      const { value: newName } = await Swal.fire({
        title: "Update Sprint",
        input: "text",
        inputLabel: "Sprint name",
        inputValue: sprint.name,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Sprint name is required";
        },
      });

      if (!newName) return;

      const res = await fetch(`/api/kanban/sprints/${sprintId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (res.ok) {
        await loadSprints();
        Swal.fire({
          icon: "success",
          title: "Sprint updated",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to update sprint");
      }
    } catch (e) {
      console.error("updateSprint error", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update sprint",
      });
    }
  }

  async function loadBoards() {
    try {
      const res = await fetch("/api/kanban/boards");
      if (!res.ok) return;
      const data = await res.json();
      setBoards(data.boards || []);
      if (!selectedBoardId) setSelectedBoardId(null);
    } catch (e) {
      console.error("loadBoards error", e);
    }
  }

  async function loadSprints() {
    try {
      const headers = {};
      if (selectedBoardId) headers["boardid"] = String(selectedBoardId);
      const res = await fetch("/api/kanban/sprints", { headers });
      if (!res.ok) return setSprints([]);
      const data = await res.json();
      setSprints(data.sprints || []);
    } catch (e) {
      console.error("loadSprints error", e);
      setSprints([]);
    }
  }

  async function createBoard() {
    try {
      const { value: name } = await Swal.fire({
        title: "Create Board",
        input: "text",
        inputLabel: "Board name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Board name is required";
        },
      });

      if (!name) return;

      const { value: collab } = await Swal.fire({
        title: "Add Collaborators",
        input: "text",
        inputLabel: "Collaborator emails (comma-separated)",
        showCancelButton: true,
        inputPlaceholder: "user@example.com, other@example.com",
      });

      const body = {
        name,
        collaborators: collab
          ? collab
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
          : [],
      };
      const res = await fetch("/api/kanban/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await loadBoards();
        Swal.fire({
          icon: "success",
          title: "Board created",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to create board");
      }
    } catch (e) {
      console.error("createBoard error", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create board",
      });
    }
  }

  async function createSprint(name) {
    try {
      const { value: sprintName } = await Swal.fire({
        title: "Create Sprint",
        input: "text",
        inputLabel: "Sprint name",
        inputValue: name || "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Sprint name is required";
        },
      });

      if (!sprintName) return;

      const body = { name: sprintName, boardId: selectedBoardId || null };
      const res = await fetch("/api/kanban/sprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await loadSprints();
        Swal.fire({
          icon: "success",
          title: "Sprint created",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Failed to create sprint");
      }
    } catch (e) {
      console.error("createSprint error", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create sprint",
      });
    }
  }

  async function loadTasks() {
    if (isDraggingRef.current) return;
    setLoading(true);
    try {
      const headers = {};
      if (selectedBoardId) headers["boardid"] = String(selectedBoardId);
      const res = await fetch("/api/kanban/tasks", { headers });
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
      // include boardId and sprintId when saving
      const payload = { ...task };
      if (selectedBoardId) payload.boardId = selectedBoardId;
      // ensure null instead of undefined
      if (!payload.sprintId) payload.sprintId = null;

      if (task._id) {
        const id = normalizeId(task._id);
        const res = await fetch(`/api/kanban/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await loadTasks();
        }
      } else {
        const res = await fetch(`/api/kanban/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await loadTasks();
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
    // Show confirmation dialog using SweetAlert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return; // stop if canceled

    try {
      const id = normalizeId(taskId);
      await fetch(`/api/kanban/tasks/${id}`, { method: "DELETE" });
      await loadTasks();

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Task has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("deleteTask error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting the task!",
      });
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
      const payload = { status: destCol };
      if (selectedBoardId) payload.boardId = selectedBoardId;
      await fetch(`/api/kanban/tasks/${moving._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await loadTasks();
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  }

  function handleBeforeCapture() {
    isDraggingRef.current = true;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-pink-100 dark-bg p-6 rounded-xl transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold bg-linear-to-br from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent">
          Board
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-white">Board</label>
            <select
              value={selectedBoardId || "personal"}
              onChange={(e) =>
                setSelectedBoardId(
                  e.target.value === "personal" ? null : e.target.value
                )
              }
              className="border rounded px-2 py-1 dark:text-red-500"
            >
              <option value="personal">Personal</option>
              {boards.map((b) => (
                <option key={String(b._id)} value={String(b._id)}>
                  {b.name}
                </option>
              ))}
            </select>
            <button
              onClick={createBoard}
              className="px-2 py-1 btn-linear text-white rounded  transition-all duration-300 hover:scale-105 shadow-sm"
            >
              New Board
            </button>
            {selectedBoardId && (
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const board = boards.find(
                      (b) => String(b._id) === selectedBoardId
                    );
                    if (!board) return;

                    const result = await Swal.fire({
                      title: "Delete Board?",
                      text: `Are you sure you want to delete board "${board.name}"? All tasks in this board will be deleted.`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    });

                    if (!result.isConfirmed) return;

                    const res = await fetch(
                      `/api/kanban/boards?boardId=${selectedBoardId}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (res.ok) {
                      await loadBoards();
                      setSelectedBoardId(null);
                      Swal.fire({
                        icon: "success",
                        title: "Board deleted",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete board",
                      });
                    }
                  }}
                  className="tooltip tooltip-bottom px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-all duration-300 hover:scale-105 shadow-sm"
                  data-tip="Delete Board"
                >
                  <RiDeleteBin6Line className="text-red-500" />
                </button>

                <button
                  onClick={() => manageBoardCollaborators(selectedBoardId)}
                  className="px-2 py-1 rounded bg-blue-600 text-white text-sm transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  Manage Team
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setEditingTask({
                title: "",
                description: "",
                status: "todo",
                sprintId: null,
              });
              setModalOpen(true);
            }}
            className="px-2 py-1 bg-linear-to-r from-amber-400 to-orange-500 text-white rounded  transition-all duration-300 hover:scale-105 shadow-sm"
          >
            + New Task
          </button>
          <button
            onClick={loadTasks}
            className="px-2 py-1 border border-gray-300 rounded bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            Refresh
          </button>
        </div>
      </div>

      <DragDropContext
        onBeforeCapture={() => (isDraggingRef.current = true)}
        onDragEnd={(res) => {
          isDraggingRef.current = false;
          const { destination, source } = res;
          if (!destination) return;
          const srcCol = source.droppableId,
            destCol = destination.droppableId;
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
          fetch(`/api/kanban/tasks/${moving._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: destCol }),
          }).catch(console.error);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={`rounded-xl shadow-lg p-4 bg-linear-to-b ${col.color} border border-gray-100 dark:border-gray-700 transition-colors duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {col.title}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {tasksByStatus[col.key]?.length || 0}
                </span>
              </div>

              <Droppable droppableId={col.key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded transition ${snapshot.isDraggingOver
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : ""
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
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-3 hover:shadow-xl transition-all duration-200 cursor-grab border border-gray-100 dark:border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-gray-800 text-sm md:text-base dark:text-white">
                                  {task.title}
                                </div>
                                <div className="text-sm text-gray-500 mt-1 dark:text-white">
                                  {task.description}
                                </div>

                                {/* Badges */}
                                <div className="flex gap-1 mt-2 flex-wrap">
                                  {selectedBoardId && (
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 text-xs">
                                      {boards.find(
                                        (b) =>
                                          String(b._id) ===
                                          String(selectedBoardId)
                                      )?.name || "Board"}
                                    </span>
                                  )}
                                  {task.sprintId && (
                                    <span className="px-2 py-0.5 rounded-full bg-green-200 text-green-800 text-xs">
                                      {sprints.find(
                                        (sp) =>
                                          String(sp._id) ===
                                          String(task.sprintId)
                                      )?.name || "Sprint"}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="ml-3 flex flex-col gap-1 text-sm">
                                <button
                                  onClick={() => {
                                    setEditingTask(task);
                                    setModalOpen(true);
                                  }}
                                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="text-red-600 dark:text-red-400 hover:underline"
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
          instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
          labels={{
            title: "One-Orbit Assistant",
            initial: "Easily add tasks by pasting your project description",
          }}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-linear-to-br from-amber-100 to-orange-100 dark-bg rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all animate-scaleIn">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {editingTask?._id ? "Edit Task" : "New Task"}
            </h4>
            <div className="space-y-3">
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
                value={editingTask?.title || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, title: e.target.value }))
                }
                placeholder="Title"
              />
              <textarea
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
                value={editingTask?.description || ""}
                onChange={(e) =>
                  setEditingTask((s) => ({ ...s, description: e.target.value }))
                }
                placeholder="Description"
                rows={4}
              />
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={editingTask?.sprintId ?? ""}
                    onChange={(e) =>
                      setEditingTask((s) => ({
                        ...s,
                        sprintId: e.target.value || null,
                      }))
                    }
                  >
                    <option value="">No Sprint</option>
                    {sprints.map((sp) => (
                      <option key={String(sp._id)} value={String(sp._id)}>
                        {sp.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => createSprint()}
                    className="px-3 py-2 rounded bg-linear-to-r from-amber-400 to-orange-500 text-white text-sm whitespace-nowrap"
                  >
                    New Sprint 
                  </button>
                </div>
                {editingTask?.sprintId && (
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => updateSprint(editingTask.sprintId)}
                      className="px-2 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      Edit Sprint
                    </button>
                    <button
                      onClick={() => deleteSprint(editingTask.sprintId)}
                      className="px-2 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      Delete Sprint
                    </button>
                  </div>
                )}
              </div>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-gray-200"
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
                className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => saveTask(editingTask)}
                className="px-4 py-2 btn-linear  text-white rounded-lg transition-all duration-200 shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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
