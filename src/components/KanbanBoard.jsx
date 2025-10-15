"use client";
import React, { useEffect, useState } from "react";

const DEFAULT_DATA = {
  todo: [
    { id: "t1", title: "Design landing page" },
    { id: "t2", title: "Setup project repo" },
  ],
  inprogress: [{ id: "p1", title: "Implement auth" }],
  done: [{ id: "d1", title: "Create project scaffold" }],
};

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {}
  }, [key, state]);

  return [state, setState];
}

export default function KanbanBoard() {
  const [data, setData] = useLocalStorage("kanban-data", DEFAULT_DATA);
  const [dragging, setDragging] = useState(null);

  function handleDragStart(item, from) {
    setDragging({ item, from });
  }

  function handleDrop(to) {
    if (!dragging) return;
    const { item, from } = dragging;
    if (from === to) {
      setDragging(null);
      return;
    }

    setData((prev) => {
      const sourceList = [...prev[from]];
      const idx = sourceList.findIndex((i) => i.id === item.id);
      if (idx > -1) sourceList.splice(idx, 1);

      const destList = [...prev[to], item];

      return { ...prev, [from]: sourceList, [to]: destList };
    });

    setDragging(null);
  }

  function handleAdd(column, title) {
    const newItem = { id: Date.now().toString(), title };
    setData((p) => ({ ...p, [column]: [...p[column], newItem] }));
  }

  return (
    <div className="kanban grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { key: "todo", label: "To Do", color: "blue" },
        { key: "inprogress", label: "In Progress", color: "yellow" },
        { key: "done", label: "Done", color: "green" },
      ].map((col) => (
        <div
          key={col.key}
          className="bg-white rounded-lg shadow p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col.key)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">{col.label}</h3>
            <span className={`text-sm text-${col.color}-500`}></span>
          </div>

          <div className="space-y-2 min-h-[120px]">
            {data[col.key].map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item, col.key)}
                className="p-3 bg-gray-50 rounded border cursor-move"
              >
                {item.title}
              </div>
            ))}
          </div>

          <AddCardInput onAdd={(title) => handleAdd(col.key, title)} />
        </div>
      ))}
    </div>
  );
}

function AddCardInput({ onAdd }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a card..."
        className="w-full border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={() => {
          if (!text.trim()) return;
          onAdd(text.trim());
          setText("");
        }}
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm"
      >
        Add
      </button>
    </div>
  );
}
