import React from 'react'
import {assets} from  '../../assets/assets.js'
import { useNavigate,Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx'
import { useAppContext } from '../../context/AppContext.jsx';

const Layout = () => {
  const {axios,setToken,navigate} = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
    
  }

  
    

  return (
    <>
      <div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-300 '>
      
                  <div
                  onClick={() => navigate('/')} 
                  className="flex items-center gap-1 cursor-pointer select-none"
                  >
                      {/* Left text */}
                      <span className="font-semibold text-lg">My</span>
      
                      {/* Logo (B symbol) */}
                      <img
                          src={assets.logo}
                          alt="Logo"
                          className="w-10 sm:w-12"
                      />
      
                      {/* Right text */}
                      <span className="font-semibold text-lg">log</span>
                  </div>
              <button onClick={logout} className='flex items-center gap-2 rounded-full text-sm
              cursor-pointer bg-primary text-white px-10 py-2.5'>Logout
                  <img src={assets.loginIcon} className='w-5' alt="loginIcon" />
              </button>   
      </div>

      <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />
      </div>
    </>
  )
}

export default Layout