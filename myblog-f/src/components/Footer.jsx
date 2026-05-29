import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10
        border-b border-gray-500/30 text-gray-500'>
            <div>
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
                {/* <p className='mt-4 max-w-sm'>MyBlog is a blogging platform where tech enthusiasts share their knowledge, insights, and experiences through engaging articles and tutorials.</p> */}
            </div>
            <p className=' max-w-sm'>MyBlog is a blogging platform where tech enthusiasts share their knowledge, insights, and experiences through engaging articles and tutorials.</p>
            {/* add social media links here below div (twitter,linkedin,instagram) */}
            <div>
                <div className="flex gap-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter} alt="Twitter" className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/gvnmohithkrishna/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin} alt="LinkedIn" className="w-6 h-6" />
                    </a>
                    <a href="https://www.instagram.com/mohith_krishna_____/" target="_blank" rel="noopener noreferrer">
                        <img src={assets.instagram} alt="Instagram" className="w-6 h-6" />
                    </a>
                </div>
            </div>

        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2026 @myblog Mohith - All rights reserved</p>
    </div>
  )
}

export default Footer