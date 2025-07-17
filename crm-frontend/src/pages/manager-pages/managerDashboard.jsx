import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { ArrowUpIcon, ClockIcon } from "@heroicons/react/24/outline";
import Navbar from "../../widgets/layout/manager-layout/navbar";
import CircularProgress from "../../widgets/statics/CircularProgress";
import Sidebar from "../../widgets/layout/manager-layout/sidebar";
import StaticBarChart from "../../widgets/statics/StaticBarChart";
import VerticalBarChart from "../../widgets/statics/VerticalBarChart";
import AgentProgressRadialChart from "../../widgets/statics/CarsProgressRadialChart";
import CurrentDateTime from "../../widgets/layout/CurrentDateTime";

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
    title: "Total dossiers commerciales",
    value: "100",
    footer: { label: "since last week", value: "+5%", color: "text-green-400" },
  },
  {
    icon: ArrowUpIcon,
    title: "Blockage",
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
    <div className=" min-h-screen bg-gray-300 text-white font-[Georgia] relative flex flex-col mt-20">
      {/* Navbar full width */}
      <Navbar />

      <div className="flex flex-1 pt-6 px-4 md:px-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Left: Stats cards + charts */}
        <main className="flex-1 pl-6 md:pl-12">
          {/* Statistic Cards */}
          <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mb-12 mt-8">
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
                <AgentProgressRadialChart />

        </main>

        {/* Right: Circular Progress & future content */}
        <aside className="w-64 ml-8">
          <CurrentDateTime />
          <div className="mt-6">
            <CircularProgress percent={10} />
          </div>

          <StaticBarChart />
          <VerticalBarChart />


        </aside>
      </div>
    </div>
  );
}
export default Home;
