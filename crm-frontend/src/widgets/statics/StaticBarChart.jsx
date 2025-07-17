import React from "react";

const data = [
  { label: "Citroën", value: 70, color: "bg-yellow-400" },
  { label: "Peugeot", value: 90, color: "bg-green-500" },
  { label: "Opel", value: 40, color: "bg-red-400" },
];

export default function StaticBarChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Levels</h2>
      <div className="space-y-4">
        {data.map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${color}`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
