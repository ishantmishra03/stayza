import React, { useEffect } from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from "../../components/admin/Sidebar"
import { Outlet } from 'react-router-dom'
import {useAppContext} from "../../context/AppContext"

const Layout = () => {
  const {isAdmin, navigate} = useAppContext();

  useEffect(() => {
    if(!isAdmin){
      navigate("/");
    }
  }, [isAdmin, navigate])
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className='flex-1 p-4 pt-10 mx:px-10 h-full'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
