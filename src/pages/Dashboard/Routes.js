import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Course from './Courses'
import Student from './Student'
import Attendence from './Attendence/Attendence'

export default function Index() {

  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/attendence' element={<Attendence/>} />
        <Route path='/course' element={<Course/>} />
        <Route path='/student' element={<Student/>} />
    </Routes>
  )
}
