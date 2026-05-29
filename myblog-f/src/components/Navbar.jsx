import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'  
import { useAppContext } from '../context/AppContext.jsx'


const Navbar = () => {
    const {navigate,token} = useAppContext();
  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 '>

        {/* <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='w-14 sm:w-14 cursor-pointer'/>MyBlog */}
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
        <button onClick={() => navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm
        cursor-pointer bg-primary text-white px-10 py-2.5'>{token ? "Dashboard" : "Login"}
            <img src={assets.loginIcon} className='w-5' alt="loginIcon" />
        </button>   

    </div>
  )
}

export default Navbar