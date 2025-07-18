import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { ArrowUpIcon, ClockIcon } from "@heroicons/react/24/outline";
import CircularProgress from "../../widgets/statics/CircularProgress";
import StaticBarChart from "../../widgets/statics/StaticBarChart";
import VerticalBarChart from "../../widgets/statics/VerticalBarChart";
import CarsProgressRadialChart from "../../widgets/statics/CarsProgressRadialChart";
import CurrentDateTime from "../../widgets/layout/CurrentDateTime";
import NavbarAgent from "../../widgets/layout/agentC-layout/navbar-agent"
import SidebarAgent from "../../widgets/layout/agentC-layout/sidebar-agent"




export function agentCDashboard() {
  return (
    <div className=" min-h-screen bg-gray-300 text-white font-[Georgia] relative flex flex-col mt-20">
      {/* Navbar full width */}
      <NavbarAgent />

      <div className="flex flex-1 pt-6 px-4 md:px-8">
        {/* Sidebar */}
        <SidebarAgent/>

        {/* Left: Stats cards + charts */}
        <main className="flex-1 pl-6 md:pl-12">
          {/* Statistic Cards */}
          <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mb-12 mt-8">
           
          </div>
          <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2 mb-12 mt-8">
                <CarsProgressRadialChart />          
                <VerticalBarChart />
          </div>

        </main>

        {/* Right: Circular Progress & future content */}
        <aside className="w-64 ml-8">
          <CurrentDateTime />
          <div className="mt-6">
            <CircularProgress percent={40} />
          </div>

          <StaticBarChart />


        </aside>
      </div>
    </div>
  );
}
export default agentCDashboard;
