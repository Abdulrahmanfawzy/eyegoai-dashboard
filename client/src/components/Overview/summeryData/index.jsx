import React, { useEffect, useMemo, useState } from "react";
import { getData } from "../../../utils/FetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faSackDollar,
  faBuilding,
  faUsers,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

export default function SummeryCards() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [expensesSalaries, setExpensesSalaries] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData("employees");
        setEmployeeCount(result.length);

        //   ----------------------------------------------------

        const totalSalary = result.reduce((acc, initVal) => {
          return acc + initVal.salary;
        }, 0);
        setExpensesSalaries(totalSalary);

        //   ----------------------------------------------------

        const result2 = await getData("departments");
        setTotalDepartments(result2.length);

        //   ----------------------------------------------------

        const profitResult = await getData("dailyProfits");
        const profits = profitResult.reduce((acc, initVal) => {
          return acc + initVal.profit;
        }, 0);
        setTotalProfit(profits);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dataResult = useMemo(() => {
    return [
      {
        id: 1,
        title: "Total Employees",
        icon: faUsers,
        iconColor: "#635BFF",
        total: employeeCount,
      },
      {
        id: 3,
        title: "Departments count",
        icon: faBuilding,
        iconColor: "#FB9C0C",
        total: totalDepartments,
      },
      {
        id: 2,
        title: "Total Salary",
        icon: faDollarSign,
        iconColor: "#15B79F",
        sign: "$",
        total: expensesSalaries,
      },
      {
        id: 4,
        title: "Total Profit",
        icon: faSackDollar,
        iconColor: "#635BFF",
        sign: "$",
        total: totalProfit,
        percent: "12%",
        percentIcon: faArrowUp,
      },
    ];
  }, [employeeCount, totalDepartments, totalProfit, expensesSalaries]);

  return (
    <div className="flex w-[93%] flex-wrap gap-3 mx-auto justify-between items-center mb-10">
      {dataResult.map((item) => (
        <div
          key={item.id}
          className="p-4 py-8 w-full md:w-[49%] xl:w-[24%] rounded-2xl flex justify-between items-start bg-white border border-gray-300"
        >
          <section>
            <h3 className="mb-3 uppercase">{item.title}</h3>
            <h2 className="text-2xl font-semibold">
              {item.sign}
              {item.total}
            </h2>
          </section>
          <section>
            <FontAwesomeIcon
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: item.iconColor,
              }}
              icon={item.icon}
              className="text-white text-2xl p-3 rounded-full"
            />
          </section>
        </div>
      ))}
    </div>
  );
}
