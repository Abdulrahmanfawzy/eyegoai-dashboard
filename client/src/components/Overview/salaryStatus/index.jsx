import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalaryStatusChart = () => {
  const [salaries , setSalaries] = useState([]);

  const getStatus = async()=>{
    try {
      const {data} = await axios.get(`http://localhost:3000/salaries`);
      setSalaries(data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getStatus();
  },[])

  const statusCounts = salaries.reduce((acc, salary) => {
    acc[salary.status] = (acc[salary.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [statusCounts["paid"] || 0, statusCounts["pending"] || 0],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 159, 64, 0.7)"],
      },
    ],
  };

  const options = {
    plugins: {
      title: { display: true, text: "Salary payment status - March 2025" },
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="w-[80%] mx-auto md:w-[40%] h-[auto]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SalaryStatusChart;
