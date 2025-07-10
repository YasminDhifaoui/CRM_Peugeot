import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import {
  ArrowUpIcon,
  ClockIcon,
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../widgets/layout/manager-layout/navbar";
// Dummy Cards
const StatisticsCard = ({ icon, title, value, footer }) => (
  <Card className="p-4 shadow">
    <div className="flex items-center gap-4">
      <div className="bg-blue-500 rounded-full p-2 text-white">{icon}</div>
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography>{value}</Typography>
        <div>{footer}</div>
      </div>
    </div>
  </Card>
);

const StatisticsChart = ({ title, description, footer }) => (
  <Card className="p-4 shadow">
    <Typography variant="h6">{title}</Typography>
    <Typography>{description}</Typography>
    <div className="mt-2">{footer}</div>
  </Card>
);

// Dummy data
const statisticsCardsData = [
  {
    icon: ArrowUpIcon,
    title: "Users",
    value: "100",
    footer: { label: "since last week", value: "+5%", color: "text-green-500" },
  },
  {
    icon: ArrowUpIcon,
    title: "Dossiers",
    value: "3000",
    footer: { label: "this month", value: "+12%", color: "text-green-500" },
  },
  {
    icon: ArrowUpIcon,
    title: "Livraison",
    value: "32",
    footer: { label: "delivered", value: "+2", color: "text-green-500" },
  },
  {
    icon: ArrowUpIcon,
    title: "Facturation",
    value: "142",
    footer: { label: "completed", value: "+10%", color: "text-green-500" },
  },
];

const statisticsChartsData = [
  {
    title: "Weekly Sales",
    description: "50",
    footer: "updated 1 hour ago",
  },
  {
    title: "Per mounth",
    description: "42 ",
    footer: "updated today",
  },
  {
    title: "Per year",
    description: "65",
    footer: "updated 5 minutes ago",
  },
];

export function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 xl:ml-72">
        {/* Navbar */}
      <Navbar />

        <main className="flex-1 p-6">
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
                  <Typography className="font-normal text-blue-gray-600">
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
                    className="flex items-center font-normal text-blue-gray-600"
                  >
                    <ClockIcon className="h-4 w-4 text-blue-gray-400 mr-1" />
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
