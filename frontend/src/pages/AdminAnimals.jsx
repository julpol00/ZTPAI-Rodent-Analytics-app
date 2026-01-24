import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/admin/animals', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAnimals(res.data))
      .catch(() => setAnimals([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this animal?')) return;
    const token = localStorage.getItem('token');
    await api.delete(`/admin/animals/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setAnimals(a => a.filter(an => an.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800 font-sans flex flex-col">
      <header className="bg-white py-4 px-6 flex justify-center items-center shadow flex-shrink-0 relative" style={{minHeight:'4.5rem'}}>
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src="/img/logo_2.svg" alt="logo" className="h-16" />
            <div className="text-4xl font-black text-purple-800 tracking-wider">Rodent Analytics – Admin Panel</div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center py-16 px-8">
        <button
          className="bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-800 transition mb-8"
          onClick={() => navigate('/admin')}
        >
          Manage Users
        </button>
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Animal Management</h1>
          {loading ? <div>Loading...</div> : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-xl overflow-hidden">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Species</th>
                    <th className="border px-4 py-2">Owner ID</th>
                    <th className="border px-4 py-2">Owner Email</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map(an => (
                    <tr key={an.id} className="hover:bg-purple-50">
                      <td className="border px-4 py-2">{an.id}</td>
                      <td className="border px-4 py-2">{an.name}</td>
                      <td className="border px-4 py-2">{an.species}</td>
                      <td className="border px-4 py-2">{an.User ? an.User.id : an.id_user}</td>
                      <td className="border px-4 py-2">{an.User ? an.User.email : ''}</td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(an.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
