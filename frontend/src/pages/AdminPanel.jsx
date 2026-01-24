import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' }
  ]);
  const navigate = useNavigate();

  const fetchUsers = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(u => u.filter(user => user.id !== id));
  };

  const handleBlock = async (id, blocked) => {
    const token = localStorage.getItem('token');
    await api.patch(`/admin/users/${id}/block`, { blocked: !blocked }, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  const handleRoleChange = async (id, role_id) => {
    const token = localStorage.getItem('token');
    await api.patch(`/admin/users/${id}/role`, { role_id }, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
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
        <a href="/admin/animals" className="inline-block mb-8 bg-purple-700 text-white px-4 py-2 rounded shadow">Manage Animals</a>
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">User Management</h1>
          {loading ? <div>Loading...</div> : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-xl overflow-hidden">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-purple-50">
                      <td className="border px-4 py-2">{u.id}</td>
                      <td className="border px-4 py-2">{u.email}</td>
                      <td className="border px-4 py-2">{u.name} {u.surname}</td>
                      <td className="border px-4 py-2">
                        <select value={u.role_id} onChange={e => handleRoleChange(u.id, Number(e.target.value))} className="border rounded px-2 py-1">
                          {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                      </td>
                      <td className="border px-4 py-2 flex gap-2">
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(u.id)}>Delete</button>
                        <button
                          className={`px-2 py-1 rounded text-white ${u.blocked ? 'bg-green-500' : 'bg-yellow-500'}`}
                          onClick={() => handleBlock(u.id, u.blocked)}
                        >
                          {u.blocked ? 'Unblock' : 'Block'}
                        </button>
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
