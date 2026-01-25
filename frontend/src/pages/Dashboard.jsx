

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from '../api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const baseMenu = [
  { label: 'ANIMALS', icon: 'fa-paw', route: '/dashboard' },
  { label: 'ANALYSIS', icon: 'fa-chart-simple', route: '/analysis' },
  { label: 'NOTIFICATIONS', icon: 'fa-bell', route: '/notifications' },
  { label: 'SETTINGS', icon: 'fa-gears', route: '/settings', bottom: true },
];


export default function Dashboard(){
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [animals, setAnimals] = useState([]);
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(baseMenu);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    me(token).then(res => {
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.user.role_id === 1) {
        setMenu([
          ...baseMenu.slice(0, 3),
          { label: 'ADMIN', icon: 'fa-user-shield', route: '/admin' },
          ...baseMenu.slice(3)
        ]);
      }
    });
    import('../api').then(({ fetchAnimals }) => {
      fetchAnimals(token)
        .then(res => setAnimals(res.data))
        .catch(() => setAnimals([]));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800 font-sans flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 h-0" style={{minHeight: '0', height: '100%'}}>
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center overflow-x-auto">
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-16 pb-8 px-4 max-w-6xl w-full">
            {animals.map(animal => (
              <div
                key={animal.id}
                className="card w-[19em] h-[22em] rounded-2xl bg-white shadow-lg flex flex-col overflow-hidden hover:scale-[1.02] transition cursor-pointer"
                onClick={() => navigate(`/pet/${animal.id}`)}
              >
                <div className="card-header bg-[var(--primary-purple)] py-4 text-center">
                  <div className="card-title font-black text-2xl text-white tracking-wider">{animal.name}</div>
                </div>
                <img src={`/img/uploads/${animal.avatar}`} alt={animal.name} className="card-image w-full h-auto object-cover flex-grow" />
              </div>
            ))}
            {/* Add animal card */}
            <div
              className="card-add-animals w-[19em] h-[22em] rounded-2xl bg-white shadow-lg flex flex-col items-center justify-center border-4 border-[var(--primary-purple)] cursor-pointer hover:scale-[1.02] transition relative"
              onClick={() => navigate('/add-animal')}
            >
              <i className="fa-solid fa-plus text-[7em] text-[var(--primary-purple)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </section>
        </main>
      </div>
      {/* FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
