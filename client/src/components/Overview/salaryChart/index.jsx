import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentPieChart = () => {
    const [employees , setEmployees] = useState([]);

  const getStatus = async()=>{
    try {
      const {data} = await axios.get(`http://localhost:3000/departments`);
      setEmployees(data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getStatus();
  },[])

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.name] = (acc[emp.name] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        data: Object.values(departmentCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      title: { display: true, text: 'distribute employees based on departments' },
      legend: { position: 'right' },
    },
  };

  return (
    <div className='w-[80%] mx-auto md:w-[45%] h-[auto]'>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DepartmentPieChart;