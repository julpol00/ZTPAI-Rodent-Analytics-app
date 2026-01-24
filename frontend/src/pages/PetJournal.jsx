
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css';
import api, { deleteWeight, deleteActivity } from '../api';



export default function PetJournal() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activityForm, setActivityForm] = useState({ start: '00:00', end: '00:00', text: '' });
  const [weightForm, setWeightForm] = useState('');
  const [weightLoading, setWeightLoading] = useState(false);


  const handleDeleteWeight = async (weightId) => {
    const token = localStorage.getItem('token');
    console.log('token:', token, 'animalId:', animalId, 'weightId:', weightId);
    if (!token) return;
    try {
      await deleteWeight(token, animalId, weightId);
      setWeight(null);
    } catch (err) {
      alert('Błąd podczas usuwania rekordu wagi.');
    }
  };

    // Usuwanie aktywności
  const handleDeleteActivity = async (activityId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await deleteActivity(token, animalId, activityId);
      setActivities((prev) => prev.filter((a) => a.id !== activityId));
    } catch (err) {
      alert('Błąd podczas usuwania aktywności.');
    }
  };


    const handleWeightSubmit = async (e) => {
      e.preventDefault();
      setWeightLoading(true);
      try {
        const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        await api.post(`/animals/${animalId}/weight`, {
          date_weight: dateStr,
          weight: weightForm
        }, { headers: { Authorization: `Bearer ${token}` } });
        // reload weight
        const res = await api.get(`/animals/${animalId}/weight?date=${dateStr}`, { headers: { Authorization: `Bearer ${token}` } });
        setWeight(res.data);
        setWeightForm('');
      } catch {
        // obsługa błędu
      }
      setWeightLoading(false);
    };
  const [activityLoading, setActivityLoading] = useState(false);

  // Pobierz token z localStorage
  const token = localStorage.getItem('token');

  // Pobierz dane zwierzaka
  useEffect(() => {
    if (!token || !animalId) return;
    api.get(`/animals`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const found = res.data.find(a => String(a.id) === String(animalId));
        setAnimal(found || null);
      })
      .catch(() => setAnimal(null));
  }, [animalId, token]);

  // Pobierz wagę i aktywności na wybrany dzień
  useEffect(() => {
    if (!token || !animalId) return;
    const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    api.get(`/animals/${animalId}/weight?date=${dateStr}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { console.log('weight', res.data); setWeight(res.data); })
      .catch(err => { console.log('weight error', err); setWeight(null); });
    api.get(`/animals/${animalId}/activities?date=${dateStr}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { console.log('activities', res.data); setActivities(res.data); })
      .catch(err => { console.log('activities error', err); setActivities([]); });
  }, [animalId, date, token]);

  // Dodawanie aktywności
  const handleActivitySubmit = async (e) => {
    e.preventDefault();

    if (activityForm.end < activityForm.start) {
      alert('End time cannot be earlier than start time.');
      return;
    }
    setActivityLoading(true);
    try {
      const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      await api.post(`/animals/${animalId}/activities`, {
        activity_date: dateStr,
        start_time: activityForm.start,
        end_time: activityForm.end,
        activity_text: activityForm.text
      }, { headers: { Authorization: `Bearer ${token}` } });
      // reload activities
      const res = await api.get(`/animals/${animalId}/activities?date=${dateStr}`, { headers: { Authorization: `Bearer ${token}` } });
      setActivities(res.data);
      setActivityForm({ start: '00:00', end: '00:00', text: '' });
    } catch {
      // obsługa błędu
    }
    setActivityLoading(false);
  };

  if (!animal) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800 font-sans flex flex-col">
      <header className="bg-white py-4 px-6 flex justify-center items-center shadow flex-shrink-0 relative" style={{minHeight:'4.5rem'}}>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-4">
            <img src={"/img/logo_2.svg"} alt="logo" className="h-16" />
            <div className="text-4xl font-black text-purple-800 tracking-wider">Rodent Analytics</div>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="absolute right-8 top-1/2 -translate-y-1/2 text-base text-[var(--primary-purple)] border border-[var(--primary-purple)] px-5 py-2 rounded font-bold">LOG OUT</button>
      </header>
      <div className="flex flex-1 min-h-0 h-0" style={{minHeight: '0', height: '100%'}}>
        {/* Sidebar */}
        <nav className="w-64 bg-[var(--primary-purple)] text-white flex flex-col px-6 py-6 overflow-y-auto flex-shrink-0 h-screen min-h-screen">
          <ul className="flex flex-col gap-5">
            <li><button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide" onClick={()=>navigate('/dashboard')}><i className="fa-solid fa-paw text-2xl" />ANIMALS</button></li>
            <li><button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide" onClick={()=>navigate('/analysis')}><i className="fa-solid fa-chart-simple text-2xl" />ANALYSIS</button></li>
            <li><button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide" onClick={()=>navigate('/notifications')}><i className="fa-solid fa-bell text-2xl" />NOTIFICATION</button></li>
            <li className="mt-auto"><button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide" onClick={()=>navigate('/settings')}><i className="fa-solid fa-gears text-2xl" />SETTINGS</button></li>
          </ul>
        </nav>
        {/* Main content */}
        <main className="flex-1 flex flex-row gap-0 items-start justify-center py-16 px-8">
          {/* Left: Pet profile */}
          <div className="flex flex-col items-center w-80 bg-white rounded-2xl shadow-lg p-6" style={{ marginLeft: '6rem' }}>
            <img src={`/img/uploads/${animal.avatar}`} alt={animal.name} className="rounded-xl w-48 h-48 object-cover mb-4 border-4 border-[var(--primary-purple)]" />
            <div className="flex flex-col w-full gap-3 items-center">
              <div className="w-full bg-white rounded-xl shadow-md py-2 px-4 text-center font-bold text-[var(--primary-purple)] text-lg tracking-wide border-2 border-[var(--primary-purple)]">{animal.name}</div>
              <div className="w-full bg-white rounded-xl shadow-md py-2 px-4 text-center font-bold text-[var(--primary-purple)] text-lg tracking-wide border-2 border-[var(--primary-purple)]">{animal.species}</div>
              <div className="w-full bg-white rounded-xl shadow-md py-2 px-4 text-center font-bold text-[var(--primary-purple)] text-lg tracking-wide border-2 border-[var(--primary-purple)]">{animal.birth}</div>
            </div>
            <div className="w-full bg-[var(--primary-purple)] bg-opacity-80 rounded-xl shadow-md py-4 px-4 mt-8 text-center font-bold text-white text-base tracking-wide">{animal.description}</div>
          </div>
          {/* Center+Right: Calendar + Add weight & activity in one big card */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-full mx-auto" style={{ maxWidth: 'calc(930px)' }}>
            <div className="flex flex-row w-full justify-between items-start gap-12">
              {/* Kalendarz */}
              <div className="flex flex-col items-center justify-start flex-shrink-0 w-[400px]">
                <div className="mb-4 rounded-2xl shadow-2xl border-8 border-purple-300 bg-white">
                  <Calendar
                    onChange={setDate}
                    value={date}
                    className="!shadow-none !border-none !bg-transparent"
                    locale="en-US"
                    minDate={animal && animal.birth ? new Date(animal.birth) : undefined}
                    maxDate={new Date()}
                  />
                </div>
              </div>
              {/* Panel dodawania */}
              <div className="flex flex-col items-center w-[440px] flex-shrink-0 px-2">
                {/* Wybrany dzień */}
                <div className="text-center text-4xl font-extrabold text-purple-800 mb-8 tracking-wide">{date.toLocaleDateString()}</div>
                {/* Weight info */}
                {weight && weight.weight ? (
                  <div className="mb-8 w-full text-center text-2xl font-bold text-purple-800 flex items-center justify-center gap-2">
                    Weight: {weight.weight} g
                    <button className="ml-2 text-purple-700 hover:text-red-500 transition-colors" title="Usuń wagę" onClick={() => handleDeleteWeight(weight.id)}>
                      <i className="fa-solid fa-trash text-lg" />
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-row gap-4 items-center mb-8 w-full" onSubmit={handleWeightSubmit}>
                    <input type="number" step="0.01" min="0" className="border-2 border-purple-300 rounded-lg px-3 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50 w-28 max-w-[100px]" placeholder="Weight (g)" value={weightForm} onChange={e=>setWeightForm(e.target.value)} required />
                    <button className="add-button bg-purple-800 text-white font-bold px-4 py-2 rounded-xl shadow transition duration-200 hover:bg-purple-900 hover:text-teal-200 max-w-[140px] text-sm" type="submit" disabled={weightLoading}>{weightLoading ? 'Saving...' : 'ADD WEIGHT'}</button>
                  </form>
                )}
                {/* Activities list */}
                <div className="notes-section mb-4 w-full">
                  <div className="notes-list flex flex-col gap-3 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 py-2">
                    {activities.length === 0 ? (
                      <div className="note">
                        <div className="note-text text-purple-800 font-extrabold text-xl">No activities for this day.</div>
                      </div>
                    ) : activities.map((a, i) => (
                      <div
                        className="flex flex-row w-full items-center bg-[var(--primary-purple)] rounded-xl shadow-md px-4 py-3 text-white font-semibold text-lg"
                        key={i}
                      >
                        <div className="flex flex-row gap-2 mr-4 whitespace-nowrap min-w-[90px]">
                          <div className="note-time font-bold text-white bg-white/20 rounded px-2 py-1">{a.start_time?.slice(0,5)}</div>
                          <div className="note-time font-bold text-white bg-white/20 rounded px-2 py-1">{a.end_time?.slice(0,5)}</div>
                        </div>
                        <div className="note-text flex-1 break-words">{a.activity_text}</div>
                        <button className="ml-4 text-white hover:text-red-400 transition-colors" title="Usuń aktywność" onClick={() => handleDeleteActivity(a.id)}>
                          <i className="fa-solid fa-trash text-lg" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Add activity form */}
                  <form className="note-form flex gap-2 mt-4 w-full" onSubmit={handleActivitySubmit}>
                    <input type="time" className="input-time border-2 border-purple-300 rounded-lg px-2 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50 max-w-[70px]" name="start" required value={activityForm.start} onChange={e=>setActivityForm(f=>({...f, start: e.target.value}))} />
                    <input type="time" className="input-time border-2 border-purple-300 rounded-lg px-2 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50 max-w-[70px]" name="end" required value={activityForm.end} onChange={e=>setActivityForm(f=>({...f, end: e.target.value}))} />
                    <input type="text" className="note-input border-2 border-purple-300 rounded-lg px-2 py-2 text-purple-900 font-semibold focus:outline-none focus:border-purple-500 bg-purple-50 flex-1 max-w-[120px]" name="text" placeholder="Add note..." required value={activityForm.text} onChange={e=>setActivityForm(f=>({...f, text: e.target.value}))} />
                    <button className="add-button bg-purple-800 text-white font-bold px-4 py-2 rounded-xl shadow transition duration-200 hover:bg-purple-900 hover:text-teal-200 max-w-[120px] text-sm" type="submit" disabled={activityLoading}>{activityLoading ? 'Saving...' : 'ADD ACTIVITY'}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
