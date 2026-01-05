import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await login(email, password)
      const token = res.data.token
      localStorage.setItem('token', token)
      navigate('/dashboard')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-300 to-purple-800">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-800">Rodent Analytics</h1>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-3 rounded border" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 rounded border" />
          <button disabled={loading} className="mt-3 bg-purple-700 text-white p-3 rounded hover:bg-purple-800">{loading? 'Signing...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  )
}
