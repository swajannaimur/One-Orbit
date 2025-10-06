import React from 'react'

export default function Sidebar({selectedFriend, setSelectedFriend}) {
  const friendsList = ["Aisha", "Zain", "Mia", "Noah", "Sophia"];
  return (
    <aside className="w-64 bg-base-300 border-r border-base-200 flex flex-col">
      <h2 className="text-lg font-bold p-4 border-b border-base-200">
        Friends
      </h2>
      <div className="flex-1 overflow-y-auto">
        {friendsList.map((friend) => (
          <div
            key={friend}
            onClick={() => setSelectedFriend(friend)}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-base-200 ${
              selectedFriend === friend ? "bg-base-200" : ""
            }`}
          >
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${friend}`}
                  alt={friend}
                />
              </div>
            </div>
            <span className="font-medium">{friend}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
