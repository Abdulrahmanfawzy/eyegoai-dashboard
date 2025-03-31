import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function Overview() {
  const [leftTrans , setLeftTrans] = useState(false);
  const [showOverlay , setshowOverlay] = useState(false);
  const [x , setX] = useState(0);

  const handleOpenSidebar = ()=>{
    setLeftTrans(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 1024){
        setLeftTrans(false)
      }
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='flex justify-between'>
        <Sidebar showOverlay={showOverlay} setshowOverlay={setshowOverlay} leftTrans={leftTrans} setLeftTrans={setLeftTrans} />
        <div className='w-[100%] lg:w-[80%]'>
          <Navbar leftTrans={leftTrans} handleOpenSidebar={handleOpenSidebar}/>
          <Outlet/>
        </div>
    </div>
  )
}
