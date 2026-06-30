import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import StudentDashboard from './pages/student/StudentDashboard'
import Home from './pages/Home'

function App() {
  
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/student' element={<StudentDashboard/>}/>  

       </Routes>

       </BrowserRouter>
    </>
  )
}

export default App
