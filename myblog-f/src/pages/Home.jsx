import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Subscriber from '../components/Subscriber'
import Footer from '../components/Footer'

const home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <Subscriber />
      <Footer />
    </>
  )
}

export default home