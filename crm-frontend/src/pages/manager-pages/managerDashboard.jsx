import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import {
  ArrowUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../widgets/layout/manager-layout/navbar";

// Statistic Card Component
const StatisticsCard = ({ icon, title, value, footer }) => (
  <Card className="p-4 shadow bg-gray-900 text-white font-[Georgia]">
    <div className="flex items-center gap-4">
      <div className="bg-blue-900 rounded-full p-2 text-white">{icon}</div>
      <div>
        <Typography variant="h6" className="text-blue-800">
          {title}
        </Typography>
        <Typography className="text-lg font-semibold">{value}</Typography>
        <div className="text-sm mt-1">{footer}</div>
      </div>
    </div>
  </Card>
);

// Statistic Chart Component
const StatisticsChart = ({ title, description, footer }) => (
  <Card className="p-4 shadow bg-gray-900 text-white font-[Georgia]">
    <Typography variant="h6" className="text-blue-400">
      {title}
    </Typography>
    <Typography className="text-xl font-semibold">{description}</Typography>
    <div className="mt-2 text-sm text-blue-200">{footer}</div>
  </Card>
);

// Dummy data
const statisticsCardsData = [
  {
    icon: ArrowUpIcon,
    title: "Users",
    value: "100",
    footer: { label: "since last week", value: "+5%", color: "text-green-400" },
  },
  {
    icon: ArrowUpIcon,
    title: "Dossiers",
    value: "3000",
    footer: { label: "this month", value: "+12%", color: "text-green-400" },
  },
  {
    icon: ArrowUpIcon,
    title: "Livraison",
    value: "32",
    footer: { label: "delivered", value: "+2", color: "text-green-400" },
  },
  {
    icon: ArrowUpIcon,
    title: "Facturation",
    value: "142",
    footer: { label: "completed", value: "+10%", color: "text-green-400" },
  },
];

const statisticsChartsData = [
  {
    title: "Ventes ",
    description: "50",
    footer: "Mis à jour il y a 1 heure",
  },
  {
    title: "Par Mois",
    description: "42",
    footer: "Mis à jour aujourd'hui",
  },
  {
    title: "Par Année",
    description: "65",
    footer: "Mis à jour il y a 5 min",
  },
];

export function Home() {
  return (
<div className="flex min-h-screen bg-gray-400 text-white font-[Georgia]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 xl:ml-72">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-500">
          {/* Cards */}
          <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mb-12">
            {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
              <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-gray-300 text-sm">
                    <strong className={footer.color}>{footer.value}</strong>
                    &nbsp;{footer.label}
                  </Typography>
                }
              />
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            {statisticsChartsData.map((chart) => (
              <StatisticsChart
                key={chart.title}
                {...chart}
                footer={
                  <Typography
                    variant="small"
                    className="flex items-center font-normal text-blue-200"
                  >
                    <ClockIcon className="h-4 w-4 text-blue-400 mr-1" />
                    {chart.footer}
                  </Typography>
                }
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
