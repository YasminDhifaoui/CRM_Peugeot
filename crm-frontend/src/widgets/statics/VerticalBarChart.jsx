import React from "react";

export default function VerticalBarChart() {
  const data = [
    { label: "Devis", value: 60 ,color:"pink"},
    { label: "Commande", value: 80 ,color:"yellow"},
    { label: "Facturation", value: 40 ,color:"green"},
    { label: "Livraison", value: 40 ,color:"Blue"},
    { label: "Blockage", value: 40 ,color:"red"},
  ];

  return (
    <div className="w-full p-6 h-80 bg-gray-400 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Dossiers Commercials</h2>
      <div className="relative h-60 border-l-2 border-b-2 border-black pl-4 pb-4 flex items-end gap-6">
        {data.map(({ label, value,color }) => (
          <div key={label} className="flex flex-col items-center justify-end">
            <div
              className="w-10 bg-blue-500 rounded-t"
              style={{ height: `${value * 2}px` , backgroundColor:`${color}`}} // Scale height
            ></div>
            <span className="mt-2 text-sm">{label}</span>
          </div>
        ))}
        {/* Y-axis label (optional) */}
        <div className="absolute -left-10 bottom-40 text-sm rotate-90 origin-bottom-left text-black">
          Annee/mois
        </div>
        {/* X-axis label (optional) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-black">
          
        </div>
      </div>
    </div>
  );
}
