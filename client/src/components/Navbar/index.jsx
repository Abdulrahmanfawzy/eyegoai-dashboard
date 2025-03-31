import {  faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react';
import avatar from "/avatar.png";
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin } from '../../redux/reducers/adminSlice';


export default function Navbar({handleOpenSidebar , leftTrans}) {
  const {data , loading , error} = useSelector(store=>store.admin);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAdmin(window.localStorage.getItem("adminId")));
  },[])

  return (
    <div className='bg-white py-6 border-b border-b-gray-200 flex justify-between items-center px-10 '>
      
      <button onClick={handleOpenSidebar} className='border border-gray-300 py-2 block lg:hidden px-4 ms-3 rounded-lg'>
        <FontAwesomeIcon icon={faBars}/>
      </button>

      <div className="relative ml-8">
          <button type="button" className="cursor-pointer">
            <FontAwesomeIcon
              className="text-gray-400 text-sm absolute right-4 top-1/2 -translate-y-1/2"
              icon={faSearch}
            />
          </button>
      </div>

      <div className="gap-6 flex items-center">
          <button className='mt-2'>
            <FontAwesomeIcon className='text-xl' icon={faBell} />
          </button>
          <button className='cursor-pointer'>
            <img src={data&&data.avatar} className='w-[38px] h-[38px] rounded-full' alt="profile avatar" />
          </button>
      </div>
    </div>
  )
}
