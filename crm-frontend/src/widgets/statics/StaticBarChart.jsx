import React from "react";

const data = [
  { label: "amira", value: 70, color: "bg-yellow-400", imgPath: "/img/default-avatar.png" },
  { label: "sana", value: 90, color: "bg-green-500", imgPath: "/img/default-avatar.png" },
  { label: "oumaima", value: 40, color: "bg-red-400", imgPath: "/img/default-avatar.png" },
  { label: "thoraya", value: 40, color: "bg-red-400", imgPath: "/img/default-avatar.png" },
];

export default function StaticBarChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mt-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Objectifs</h2>
      <div className="space-y-6">
        {data.map(({ label, value, color, imgPath }) => (
          <div key={label} className="flex items-center space-x-4">
            <img
              src={imgPath}
              alt={label}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="w-full">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${color}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
