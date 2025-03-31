import React from "react";
import SalaryChart from "../../../components/Overview";
import SalaryStatusChart from "../../../components/Overview/salaryStatus";
import DepartmentPieChart from "../../../components/Overview/salaryChart";
import SummeryCards from "../../../components/Overview/summeryData";

export default function Dashboard() {
  return (
    <div className="mt-10 bg-[#FEFEFE]">
      <SummeryCards />
      <SalaryChart />
      <div className="flex my-10 flex-wrap items-center justify-around">
        <DepartmentPieChart />
        <SalaryStatusChart />
      </div>
    </div>
  );
}
