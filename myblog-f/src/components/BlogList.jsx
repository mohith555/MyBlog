import React, { useState } from 'react'
import {blogCategories } from '../assets/assets.js'
import { motion } from "framer-motion"
import BlogCard from './BlogCard.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const BlogList = () => {

  const [menu, setMenu] = useState("All") 
  const {blogs=[],input=''}= useAppContext();
  const filteredBlogs = () => {

    if (input === '') {
      return blogs;
    }

    return blogs.filter(blog =>
      blog.title?.toLowerCase().includes(input.toLowerCase()) ||
      blog.category?.toLowerCase().includes(input.toLowerCase())
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item) }
              className={`relative px-4 py-1 rounded-full transition
                ${menu === item ? 'text-white' : 'text-gray-500 hover:text-white'}
              `}
            >
              {item}

              {/* Active background */}
              {menu === item && (
                <motion.div layoutId='underline'
                transition={{type:'spring',stiffness:500,damping:30}}
                className="absolute inset-0 bg-primary rounded-full -z-10"></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {/* Blog cards will go here */}
        {filteredBlogs().filter(blog => menu === "All" || blog.category === menu).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
