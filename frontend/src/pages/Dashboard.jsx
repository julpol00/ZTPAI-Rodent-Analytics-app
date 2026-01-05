import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800">
      <header className="bg-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-purple-800">Rodent Analytics</div>
        </div>
        <button onClick={logout} className="text-sm text-purple-700 border border-purple-700 px-3 py-1 rounded">Log out</button>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Dashboard</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">Card 1</div>
          <div className="bg-white rounded-lg shadow p-4">Card 2</div>
          <div className="bg-white rounded-lg shadow p-4">Card 3</div>
        </div>
      </main>
    </div>
  )
}
