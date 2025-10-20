import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Iteams from '../Components/Iteams/Iteams'
import Footer from '../Components/Footer/Footer'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <ToastContainer/>
      <Iteams/>
      <Footer/>
    </div>
  )
}

export default Home
