import React, { useEffect, useState } from 'react'
import { getData } from '../../../utils/FetchApi';
import { getEmployee } from '../../../redux/reducers/employeeSlice';
import { useDispatch } from 'react-redux';

export default function Attendance() {
    const dispatch = useDispatch();
    const [employees, setEmployees] = useState([]);
    const [originalEmployees, setOriginalEmployees] = useState([]);
    const [showPaginate, setShowPaginate] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const employeesPerPage = 10; 
    const totalPages = 3; 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getData("attendance");
            const employeesPromises = result.map(item=>dispatch(getEmployee(item.employeeId)))
            const employees = await Promise.all(employeesPromises);
            
            const mergedData = result.map((attendanceItem, index) => ({
                ...attendanceItem,
                employee: employees[index]
            }));
            console.log(mergedData);
            
            setEmployees(mergedData);
            setOriginalEmployees(mergedData)
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
    }, []);

    const lastIndexOfemployee = currentPage * employeesPerPage; 
    const indexOfFirstEmolyee = lastIndexOfemployee - employeesPerPage; 
    const actualData = employees.slice(indexOfFirstEmolyee , lastIndexOfemployee);

    const gtToNextPage = ()=>{
        if(currentPage < totalPages){
          setCurrentPage(currentPage + 1);
        }
      }
    
      const gtToPrevPage = ()=>{
        if(currentPage > 1){
          setCurrentPage(currentPage - 1)
        }
      }
    
      const goToPage = (page) => {
        setCurrentPage(page);
      };

      const handleStatusFiltering = (e)=>{
        console.log(e.target.value);
        if(e.target.value == "all"){
            setEmployees(originalEmployees);
        }else if(e.target.value == "present"){
            const filterPresent = originalEmployees.filter(employee => employee.status == "present");
            setEmployees(filterPresent)
        }else if(e.target.value == "absent"){
            const filterPresent = originalEmployees.filter(employee => employee.status == "absent");
            console.log(filterPresent);
            
            setEmployees(filterPresent)
        }
      }

  return (
    <div className='my-10 w-[95%] mx-auto'>
        <div className="flex flex-wrap justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-center mb-[-20px] text-gray-700">
            Attendance Table
        </h2>

        <div className="flex justify-between flex-col sm:flex-row items-center gap-4 mt-3">
          <select
            id="sortByPrice"
            name="sortByPrice"
            onChange={handleStatusFiltering}
            defaultValue="sortByPrice"
            className="border-2 border-gray-200 p-2 px-4 text-sm rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 cursor-pointer appearance-none text-center">
            <option value="sortByPrice" disabled>Filter By Status</option>
            <option value="all">All</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>

      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              {[
                "ID",
                "Name",
                "Email",
                "Department",
                "Position",
                "status",
                "date",
              ].map((heading) => (
                <th
                  key={heading}
                  className="py-2 px-3 border-b text-center font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>

            {actualData.map((employee) => (
              <tr
                key={employee.id}
                className="even:bg-gray-50 text-center hover:bg-gray-100 text-gray-600 text-sm"
              >
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.employee.payload.id}</td>
                <td className="py-4 px-3 flex items-center gap-3 border-b border-b-gray-200">
                  <img src={employee.employee.payload.avatar} className="w-[30px] h-[30px] rounded-full" alt="profile image" />
                  <span>{employee.employee.payload.name}</span>
                </td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.employee.payload.email}</td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.employee.payload.department}</td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.employee.payload.position}</td>
                <td className="py-4 px-3 border-b text-center border-b-gray-200">
                  <span
                    className={`text-xs font-semibold py-1 px-2 rounded-full text-white ${
                        employee.status === "present"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {showPaginate ?
          <div className="flex justify-center my-6 space-x-2">
            <button
              onClick={gtToPrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 cursor-pointer rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#635BFF] text-white hover:bg-[#534bff]'
              } transition duration-300 ease-in-out`}
            >
              Previous
            </button>
  
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 cursor-pointer rounded-lg ${
                  currentPage === page
                    ? 'bg-[#635BFF] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition duration-300 ease-in-out`}
              >
                {page}
              </button>
            ))}
    
            <button
              onClick={gtToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 cursor-pointer rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#635BFF] text-white hover:bg-[#534bff]'
              } transition duration-300 ease-in-out`}>
              Next
            </button>

          </div> : ""
        }    
    
      </div>

    </div>
  )
}
