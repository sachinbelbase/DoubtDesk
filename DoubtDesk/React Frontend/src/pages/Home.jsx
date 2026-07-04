import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
       <div>
            <Link to="/login" className='text-blue-700'>Click </Link> here to go to Login Page
            <br />
            <Link to="/register" className='text-blue-700'>Click </Link> here to go to Register Page
            <br />
            <Link to="/student/dashboard" className='text-blue-700'>Click </Link> here to go to Student Dashboard

       </div>  )
}

export default Home