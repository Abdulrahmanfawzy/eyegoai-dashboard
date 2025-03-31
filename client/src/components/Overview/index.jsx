import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalaryChart = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const employeeNames = employees.map(emp => emp.name);
  const salaries = employees.map(emp => emp.salary);
  
  const data = {
    labels: employeeNames,
    datasets: [
      {
        label: 'Salary',
        data: salaries,
        backgroundColor: '#635BFF',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Salary' },
      },
      x: {
        title: { display: true, text: 'Employee Name' },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Employees salary - March 2025' },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='w-[93%] mx-auto h-[350px] md:h-[500px] bg-white p-3 border border-gray-200 rounded-2xl'>
      {employees.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalaryChart;