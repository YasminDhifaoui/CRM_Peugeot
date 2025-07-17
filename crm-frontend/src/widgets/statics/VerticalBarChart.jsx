import React from "react";

export default function VerticalBarChart() {
  const data = [
    { label: "Citroën", value: 60 },
    { label: "Peugeot", value: 80 },
    { label: "Opel", value: 40 },
  ];

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Car Stock Chart</h2>
      <div className="relative h-60 border-l-2 border-b-2 border-gray-400 pl-4 pb-4 flex items-end gap-6">
        {data.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center justify-end">
            <div
              className="w-10 bg-blue-500 rounded-t"
              style={{ height: `${value * 2}px` }} // Scale height
            ></div>
            <span className="mt-2 text-sm">{label}</span>
          </div>
        ))}
        {/* Y-axis label (optional) */}
        <div className="absolute -left-10 bottom-1 text-sm rotate-90 origin-bottom-left">
          Stock (%)
        </div>
        {/* X-axis label (optional) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm">
          Brands
        </div>
      </div>
    </div>
  );
}
