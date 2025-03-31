import React, { useState } from 'react'
import logo_inside from "/logo_inside.svg"
import {NavLink, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowRightFromBracket, faCircleHalfStroke, faClipboardUser, faDollarSign, faGear, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({leftTrans , setLeftTrans}) {
    const navigate = useNavigate();

    const navLinks = [
        { to: "/dashboard", icon: faCircleHalfStroke, label: "Overview" },
        { to: "/dashboard/employees", icon: faUsers, label: "Employees" },
        { to: "/dashboard/attendance", icon: faClipboardUser, label: "Attendance" },
        { to: "/dashboard/account", icon: faUser, label: "Account" },
        { to: "/dashboard/settings", icon: faGear, label: "Settings" }
    ];

    const handleShow = (e)=>{
        setLeftTrans(true);
    }

    const handleLogout = ()=>{
        window.localStorage.removeItem("adminId");
        window.localStorage.removeItem("adminEmail");
        navigate("/auth/login")
    }

  return (

    <>
        { !leftTrans && (
            <div onClick={handleShow} className={`fixed w-full h-full z-[2]   lg:hidden top-0 left-0 bg-[rgba(0,0,0,.5)]`}></div>
        )} 
        
        <div className={`w-[290px] transform ${leftTrans ? '-translate-x-full' : 'translate-x-0'} z-20 transition-transform ease-in-out duration-300 fixed lg:static lg:w-[19%] min-h-screen text-white py-8 bg-[#121621]`}>
                    
            <div className='border-b border-b-gray-500 px-5 pb-4'>
                <img className='w-[60%]' src={logo_inside} alt="" />
            </div>
            <div className='px-5 mt-10'>
                {/* bg-[#635BFF] */}
                {navLinks.map((link,index)=><NavLink key={index} to={link.to} end className={({ isActive }) => `block p-2 px-4 rounded mt-3 transition-all duration-300 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-500"}`}>
                    <FontAwesomeIcon className='mr-3' icon={link.icon} />
                    <span>{link.label}</span>
                </NavLink>
                )}
            </div>

            <button onClick={handleLogout} className={`p-2 px-4 rounded mt-3 transition-all absolute bottom-5 cursor-pointer w-[90%] left-[50%] -translate-x-1/2 text-left duration-300 flex items-center hover:text-red-400 `}>
                <FontAwesomeIcon className='mr-3 rotate-180' icon={faArrowRightFromBracket} />
                <span>Logout</span>
            </button>

        </div>
    </>
  )
}
