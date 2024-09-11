import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  
  return (
    <>
    <h1 className='text-center text-info my-4' >Welcome to Home Page</h1>
    <br />
    <h2 className='text-center'><Link to="/users">Go to Employee List</Link></h2>
    </>
  )
}

export default Home;