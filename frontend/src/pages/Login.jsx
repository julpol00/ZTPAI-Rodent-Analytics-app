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
    <div className="min-h-screen flex bg-gradient-to-b from-slate-300 to-purple-800">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center justify-center" style={{height: '100vh'}}>
              <img src="/img/logo.svg" alt="logo" className="h-[38rem] max-h-[90vh] w-auto" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-11/12 max-w-3xl bg-white rounded-xl shadow-lg p-8 text-black">
              <h1 className="text-3xl font-bold mb-4 text-center text-[var(--primary-purple)]">Log in</h1>
              {error && <div className="text-red-600 mb-3">{error}</div>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="EMAIL" className="p-3 rounded-full border border-[var(--accent-teal)] w-3/4 text-center bg-white text-[var(--primary-purple)] placeholder-slate-400 font-semibold" />
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="PASSWORD" className="p-3 rounded-full border border-[var(--accent-teal)] w-3/4 text-center bg-white text-[var(--primary-purple)] placeholder-slate-400 font-semibold" />
                <button disabled={loading} className="mt-3 bg-[var(--primary-purple)] hover:bg-purple-800 text-white p-3 rounded-full w-3/4 font-bold">{loading? 'Signing...' : 'CONTINUE'}</button>
                <button type="button" className="mt-2 border border-[var(--accent-teal)] rounded-full w-3/4 p-3 font-bold text-[var(--accent-teal)]">LOGIN WITH FACEBOOK</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
