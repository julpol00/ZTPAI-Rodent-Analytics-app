import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddAnimal from './pages/AddAnimal'
import Notifications from './pages/Notifications'
import PetJournal from './pages/PetJournal'

import AdminPanel from './pages/AdminPanel'
import AdminAnimals from './pages/AdminAnimals'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/add-animal" element={<ProtectedRoute><AddAnimal/></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
      <Route path="/pet/:animalId" element={<ProtectedRoute><PetJournal/></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />
      <Route path="/admin/animals" element={<ProtectedRoute><AdminAnimals/></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
