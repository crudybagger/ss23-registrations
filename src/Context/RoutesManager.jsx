import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { About } from '../components/About'
import AuthPage from '../components/Authpage/AuthPage'
import Home from '../components/Home'
import Profile from '../components/Profile/Profile'
import Sponsors from '../components/Sponsors/rendersponsors.js'
import { useAuth } from './AuthManager'
import { FAQ } from '../components/FAQ'
import Schedule from '../components/Schedule'
import { Register } from '../components/Register'

const RoutesManager = () => {
  const {user}= useAuth()
  return (
    <Routes>
      {
        !user ?( <>
        <Route path='/auth' element ={<AuthPage />} /> 
        </>) : (<><Route path='/profile' element ={<Profile />} /> 
                <Route path='/register' element ={<Register />} /></>
        )
      }
        <Route path='/' element ={<Home />} />
        <Route path='/about' element ={<About />} />
        <Route path='/sponsors' element ={<Sponsors/>} />
        <Route path='/events' element ={<Home />} />
        <Route path='/team' element ={<Home />} />
        <Route path='/faq' element ={<FAQ />} />
    </Routes>
  )
}
export default RoutesManager