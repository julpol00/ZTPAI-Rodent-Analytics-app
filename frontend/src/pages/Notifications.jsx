
import React, { useState, useEffect } from 'react'
import { fetchNotifications, fetchAnimals } from '../api'
import { useNavigate } from 'react-router-dom'

const menu = [
  { label: 'ANIMALS', icon: 'fa-paw', route: '/dashboard' },
  { label: 'ANALYSIS', icon: 'fa-chart-simple', route: '/analysis' },
  { label: 'NOTIFICATION', icon: 'fa-bell', route: '/notifications' },
  { label: 'SETTINGS', icon: 'fa-gears', route: '/settings', bottom: true },
]

export default function Notifications() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const [notifications, setNotifications] = useState([])
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetchNotifications(token)
      .then(res => setNotifications(res.data))
      .catch(() => setNotifications([]))
    fetchAnimals(token)
      .then(res => setAnimals(res.data))
      .catch(() => setAnimals([]))
  }, [])

  // Form state
  const [form, setForm] = useState({
    animal_id: '',
    time: '00:00',
    message: '',
    daily: false,
    weekly: false,
    date: '',
    weekday: '',
  })

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Reset date/weekday if repeat type changes
    if (name === 'daily' && checked) setForm(f => ({ ...f, weekly: false, date: '' }))
    if (name === 'weekly' && checked) setForm(f => ({ ...f, daily: false, date: '', weekday: '' }))
    if (name === 'daily' && !checked && !form.weekly) setForm(f => ({ ...f, date: '' }))
    if (name === 'weekly' && !checked && !form.daily) setForm(f => ({ ...f, weekday: '' }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800 font-sans flex flex-col">
      <header className="bg-white py-4 px-6 flex justify-center items-center shadow flex-shrink-0 relative" style={{minHeight:'4.5rem'}}>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-4">
            <img src="/img/logo_2.svg" alt="logo" className="h-16" />
            <div className="text-4xl font-black text-purple-800 tracking-wider">Rodent Analytics</div>
          </div>
        </div>
        <button onClick={logout} className="absolute right-8 top-1/2 -translate-y-1/2 text-base text-[var(--primary-purple)] border border-[var(--primary-purple)] px-5 py-2 rounded font-bold">LOG OUT</button>
      </header>
      <div className="flex flex-1 min-h-0 h-0" style={{minHeight: '0', height: '100%'}}>
        {/* Sidebar */}
        <nav className="w-64 bg-[var(--primary-purple)] text-white flex flex-col px-6 py-6 overflow-y-auto flex-shrink-0 h-screen min-h-screen">
          <ul className="flex flex-col gap-5">
            {menu.filter(m=>!m.bottom).map(item => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide ${item.label === 'NOTIFICATION' ? 'bg-white/20 text-teal-200' : ''}`}
                  onClick={()=>navigate(item.route)}
                >
                  <i className={`fa-solid ${item.icon} text-2xl`} />
                  {item.label}
                </button>
              </li>
            ))}
            {menu.filter(m=>m.bottom).map(item => (
              <li key={item.label}>
                <button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide"
                  onClick={()=>navigate(item.route)}>
                  <i className={`fa-solid ${item.icon} text-2xl`} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center overflow-x-auto">
          <section className="max-w-5xl w-full pt-16 pb-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Add notification form */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-start">
                <h2 className="text-purple-800 font-bold text-xl mb-4">Add Notification</h2>
                <form className="notification-form flex flex-col items-start w-full gap-6 font-sans">
                  <div className="note-form flex flex-col gap-4 w-full">
                    <div className="inputs flex flex-row gap-4">
                      <div className="flex flex-col">
                        <label className="text-purple-800 font-bold mb-1 text-base">Animal</label>
                        <select
                          name="animal_id"
                          required
                          value={form.animal_id}
                          onChange={handleChange}
                          className="border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50"
                        >
                          <option value="">Select animal</option>
                          {animals.map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="text-purple-800 font-bold mb-1 text-base">Time</label>
                        <input
                          type="time"
                          className="input-time border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50"
                          name="time"
                          required
                          value={form.time}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="text-purple-800 font-bold mb-1 text-base">Message</label>
                        <input
                          type="text"
                          className="note-input border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50 w-full"
                          name="message"
                          placeholder="Add note..."
                          required
                          value={form.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="checkboxes flex flex-row gap-6 mt-2">
                      <label className="flex items-center gap-2 text-purple-800 font-bold">
                        <input
                          type="checkbox"
                          name="daily"
                          checked={form.daily}
                          onChange={handleChange}
                          className="accent-purple-700 w-5 h-5"
                        />Daily repeat
                      </label>
                      <label className="flex items-center gap-2 text-purple-800 font-bold">
                        <input
                          type="checkbox"
                          name="weekly"
                          checked={form.weekly}
                          onChange={handleChange}
                          className="accent-purple-700 w-5 h-5"
                        />Weekly repeat
                      </label>
                    </div>
                    {/* Date picker for one-time notification */}
                    {!form.daily && !form.weekly && (
                      <div className="flex flex-col gap-1 mt-2">
                        <label className="text-purple-800 font-bold mb-1 text-base">Date</label>
                        <input
                          type="date"
                          name="date"
                          className="border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50"
                          value={form.date}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {/* Weekday select for weekly repeat */}
                    {form.weekly && (
                      <div className="flex flex-col gap-1 mt-2">
                        <label className="text-purple-800 font-bold mb-1 text-base">Day of week</label>
                        <select
                          name="weekday"
                          className="border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50"
                          value={form.weekday}
                          onChange={handleChange}
                        >
                          <option value="">Select day</option>
                          {weekdays.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <button
                    className="add-button bg-purple-800 text-white font-bold px-8 py-3 rounded-xl shadow self-end transition duration-200 hover:bg-purple-900 hover:text-teal-200"
                  >
                    ADD NOTIFICATION
                  </button>
                </form>
              </div>
              {/* Right: Notifications list */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-start">
                <h2 className="text-purple-800 font-bold text-xl mb-4">Your Notifications</h2>
                <div
                  className="notes-list"
                  style={{
                    maxHeight: '28em', // fits ~4-5 notifications
                    overflowY: 'auto',
                    paddingRight: '0.5em',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="note relative flex flex-col gap-2 mb-6 p-5 rounded-xl border border-purple-300 bg-gradient-to-br from-purple-100 via-white to-purple-200 transition-all duration-200"
                      style={{ boxShadow: '0 8px 32px 0 rgba(93,46,140,0.32)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(93,46,140,0.55)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 60%, #c4b5fd 100%)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(93,46,140,0.32)';
                        e.currentTarget.style.background = '';
                      }}
                    >
                      <button
                        className="absolute top-3 right-3 text-purple-700 hover:text-red-500 transition"
                        title="Delete notification"
                        // onClick={() => handleDelete(n.id)}
                        style={{ background: 'none', border: 'none', padding: 0, boxShadow: 'none' }}
                      >
                        <i className="fa-solid fa-trash text-lg" />
                      </button>
                      <div className="flex items-center gap-3">
                        <span className="note-time text-purple-800 font-bold text-lg">{n.notification_time.slice(0,5)}</span>
                        {n.repeat === 'no_repeat' && n.notification_date && (
                          <span className="note-date text-teal-700 font-semibold text-lg">{n.notification_date}</span>
                        )}
                        {n.repeat === 'repeat_weekly' && n.notification_weekday && (
                          <span className="note-weekday text-teal-700 font-semibold text-lg">{n.notification_weekday}</span>
                        )}
                      </div>
                      {n.Animal && n.Animal.name && (
                        <div className="animal-name text-purple-800 font-bold text-lg mb-1">{n.Animal.name}</div>
                      )}
                      <div className="note-text text-gray-700">{n.notification_message}</div>
                      <div className="repeat-info text-purple-800 font-bold text-base">
                        {n.repeat === 'no_repeat' && 'No repeat'}
                        {n.repeat === 'repeat_daily' && 'Daily repeat'}
                        {n.repeat === 'repeat_weekly' && 'Weekly repeat'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  )
}
