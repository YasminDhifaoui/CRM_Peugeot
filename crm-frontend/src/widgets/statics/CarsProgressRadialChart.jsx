// src/components/AgentProgressRadialChart.jsx
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Citroen",
    progress: 80,
    fill: "#16a34a", // Green
  },
  {
    name: "Peugoet",
    progress: 55,
    fill: "#eab308", // Yellow
  },
  {
    name: "Opel",
    progress: 30,
    fill: "#dc2626", // Red
  },
];

export default function CarsProgressRadialChart() {
  return (
    <div className="flex justify-center items-center p-6">
      <RadialBarChart
        width={400}
        height={400}
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        barSize={15}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          minAngle={15}
          label={{ position: "insideStart", fill: "#fff" }}
          background
          clockWise
          dataKey="progress"
        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </div>
  );
}
