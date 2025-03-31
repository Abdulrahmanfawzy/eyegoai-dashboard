import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import EmployeeTable from '../../../components/Table'
import { Link, Outlet } from 'react-router-dom'

export default function Employees() {


  return (
    <div className='mt-13 w-[92%] mx-auto'>

      <div className="flex justify-between items-center mb-5">
        <h2 className='text-3xl mb-0! font-semibold'>Employees</h2>
          <Link to="edit">
            <button className='bg-[#635BFF] font-semibold cursor-pointer text-sm py-3 px-5 text-white rounded-lg'>
                <FontAwesomeIcon icon={faUserPlus} className='mr-2' />
                Add
            </button>
          </Link>
      </div>

      <EmployeeTable/>
    </div>
  )
}
