import React, { useState, useEffect } from "react";
import { getData } from "../../utils/FetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { batch, useDispatch } from "react-redux";
import { deleteEmployee } from "../../redux/reducers/employeeSlice";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showPaginate, setShowPaginate] = useState(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); 
  const employeesPerPage = 10; 
  const totalPages = 3; 
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData("employees");
        setEmployees(result);
        setOriginalEmployees(result)
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

  const handleEployeeDeleting = (id)=>{
    const finder = employees.filter(el=>el.id !== id);
    dispatch(deleteEmployee(id));
    setEmployees(finder);
  }

  const handleSorting = (e)=>{
    if(e.target.value == "asc"){
      const filteredAsc = [...employees].sort((a,b)=>a.name.localeCompare(b.name));
      setEmployees(filteredAsc); 
    }else{
      const filteredAsc = [...employees].sort((a,b)=>b.name.localeCompare(a.name));
      setEmployees(filteredAsc); 
    }
  }

  const handleSortingSalary = (e)=>{
    if(e.target.value == "low"){
      console.log(e.target.value);
      const filteredAsc = [...employees].sort((a,b)=>a.salary - b.salary);
      setEmployees(filteredAsc); 
    }else{
      const filteredAsc = [...employees].sort((a,b)=>b.salary - a.salary);
      setEmployees(filteredAsc); 
    }
  }

  const handleLimit = (e)=>{
    if(e.target.value == "all"){      
      setEmployees(originalEmployees);
      setShowPaginate(true);
    }else{
      const arr = [];
      for (let i = 0; i < +e.target.value; i++) {
        arr.push(originalEmployees[i]);
      }
      setEmployees(arr);
      setShowPaginate(false);
    }
  }

  const handleSearchVal = (e)=>{
    if(e.target.value.length > 0){
      const arr = originalEmployees.filter(employee=>{
        return employee.name.toLowerCase().startsWith(e.target.value.toLowerCase())
      });
      if(arr.length > 0){
        setEmployees(arr);
        setShowPaginate(false);
        setNotFound(false);
      }else{
        setEmployees(arr);
        setShowPaginate(false);
        setNotFound(true);
      }
      
    }else{
      setEmployees(originalEmployees);
      setNotFound(false);
      setShowPaginate(true)
    }
    
  }
  
  if (loading) {
    return <div className="text-center p-4">Loading data...</div>;
  }

  return (
    <div className="w-[97%] md:w-[100%] mx-auto my-8">

      <div className="box bg-white p-6 border mb-10 border-gray-200 rounded-2xl">

          <div className="relative w-[70%] md:w-[40%]">
              <input
                type="text"
                id="search"
                name="search"
                onChange={handleSearchVal}
                placeholder='Search...'
                className="w-full border-2 border-gray-200 p-3 py-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"/>
              <button type="button" className="cursor-pointer">
                <FontAwesomeIcon
                  className="text-gray-400 text-sm absolute right-4 top-1/2 -translate-y-1/2"
                  icon={faSearch}
                />
              </button>
          </div>

      </div>

      <div className="flex flex-wrap justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-center mb-[-20px] text-gray-700">
          Employees Table
        </h2>

        <div className="flex justify-between flex-col sm:flex-row items-center gap-4 mt-3">
          <select
            id="sortByPrice"
            name="sortByPrice"
            onChange={handleLimit}
            defaultValue="sortByPrice"
            className="border-2 border-gray-200 p-2 px-4 text-sm rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 cursor-pointer appearance-none text-center">
            <option value="sortByPrice" disabled>Select By Limit</option>
            <option value="all">All</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>

          <select
            id="sortByPrice"
            name="sortByPrice"
            onChange={handleSortingSalary}
            defaultValue="sortByPrice"
            className="border-2 border-gray-200 p-2 px-4 text-sm rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 cursor-pointer appearance-none text-center">
            <option value="sortByPrice" disabled>Select Sorting Salary</option>
            <option value="low">Lowest</option>
            <option value="high">Highest</option>
          </select>

          <select
            id="sort"
            name="sort"
            onChange={handleSorting}
            defaultValue="sort"
            className="border-2 border-gray-200 p-2 px-4 text-sm rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 cursor-pointer appearance-none text-center">
            <option value="sort" disabled>Select Sorting Order</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
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
                "Role",
                "Department",
                "Position",
                "Salary",
                "Status",
                "Edit",
                "Delete"
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
          {notFound ? <h2 className="p-4">No Employees with this name</h2> : ""}
          <tbody>

            {actualData.map((employee) => (
              <tr
                key={employee.id}
                className="even:bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm"
              >
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.id}</td>
                <td className="py-4 px-3 flex items-center gap-3 border-b border-b-gray-200">
                  <img src={employee.avatar} className="w-[30px] h-[30px] rounded-full" alt="profile image" />
                  <span>{employee.name}</span>
                </td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.email}</td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.role}</td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.department}</td>
                <td className="py-4 px-3 border-b border-b-gray-200">{employee.position}</td>
                <td className="py-4 px-3 border-b  border-b-gray-200">{employee.salary} EGP</td>
                <td className="py-4 px-3 border-b text-center border-b-gray-200">
                  <span
                    className={`text-xs font-semibold py-1 px-2 rounded-full text-white ${
                      employee.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="py-4 px-3 border-b text-center border-b-gray-200">
                  <button className="text-yellow-500 cursor-pointer">
                    <Link to={`edit/${employee.id}`}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                  </button>
                </td>
                <td className="py-4 px-3 border-b text-center border-b-gray-200">
                  <button onClick={()=>handleEployeeDeleting(employee.id)} className="text-red-500 cursor-pointer">
                    <FontAwesomeIcon icon={faTrash}/>
                  </button>
                </td>
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
  );
};

export default EmployeeTable;
