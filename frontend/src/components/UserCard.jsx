import React from "react";

export default function UserCard({ user, onLike }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center text-center">
      <img
        src={user?.avatar || user?.profileImage || "/user.png"}
        alt={user?.name || 'Usuario'}
        className="w-24 h-24 rounded-full mb-2 object-cover"
      />
      <h3 className="text-lg font-semibold">{user?.name ?? 'Usuario'}</h3>
      {Array.isArray(user?.interests) && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.interests.join(", ")}</p>
      )}
      <button
        onClick={() => onLike?.(user?._id)}
        className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full"
      >
        ❤️ Like
      </button>
    </div>
  );
}
