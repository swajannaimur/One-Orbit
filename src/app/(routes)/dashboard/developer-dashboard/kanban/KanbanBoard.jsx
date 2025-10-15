"use client";
import React, { useState } from "react";

const initialData = {
  todo: [
    { id: "t1", title: "Design landing page" },
    { id: "t2", title: "Write README" },
  ],
  inprogress: [{ id: "p1", title: "Implement auth" }],
  done: [{ id: "d1", title: "Project setup" }],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [dragItem, setDragItem] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");

  function onDragStart(e, columnKey, card) {
    setDragItem({ columnKey, card });
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e, destColumnKey) {
    e.preventDefault();
    if (!dragItem) return;

    const { columnKey: srcKey, card } = dragItem;
    if (srcKey === destColumnKey) return setDragItem(null);

    setColumns((prev) => {
      const srcList = prev[srcKey].filter((c) => c.id !== card.id);
      const destList = [card, ...prev[destColumnKey]];
      return { ...prev, [srcKey]: srcList, [destColumnKey]: destList };
    });
    setDragItem(null);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function addCard(columnKey) {
    if (!newCardTitle.trim()) return;
    const id = Math.random().toString(36).slice(2, 9);
    const card = { id, title: newCardTitle };
    setColumns((prev) => ({
      ...prev,
      [columnKey]: [card, ...prev[columnKey]],
    }));
    setNewCardTitle("");
  }

  function resetBoard() {
    setColumns(initialData);
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Kanban Board</h3>
        <div className="flex items-center gap-2">
          <input
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="New card title"
            className="border rounded px-3 py-1"
          />
          <button
            onClick={() => addCard("todo")}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add to To Do
          </button>
          <button onClick={resetBoard} className="px-3 py-1 border rounded">
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: "todo", title: "To Do", color: "border-blue-300" },
          {
            key: "inprogress",
            title: "In Progress",
            color: "border-yellow-300",
          },
          { key: "done", title: "Done", color: "border-green-300" },
        ].map((col) => (
          <div
            key={col.key}
            onDrop={(e) => onDrop(e, col.key)}
            onDragOver={onDragOver}
            className={`bg-white rounded-lg shadow p-4 min-h-[200px]`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{col.title}</h4>
              <span className="text-sm text-gray-500">
                {columns[col.key].length}
              </span>
            </div>

            <div className="space-y-3">
              {columns[col.key].map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, col.key, card)}
                  className="p-3 bg-gray-50 rounded border cursor-grab hover:shadow"
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
