import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menu = [
  { label: 'ANIMALS', icon: 'fa-paw', route: '/dashboard' },
  { label: 'ANALYSIS', icon: 'fa-chart-simple', route: '/analysis' },
  { label: 'NOTIFICATIONS', icon: 'fa-bell', route: '/notifications' },
  { label: 'SETTINGS', icon: 'fa-gears', route: '/settings', bottom: true },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="w-64 bg-[var(--primary-purple)] text-white flex flex-col px-6 py-6 overflow-y-auto flex-shrink-0 h-screen min-h-screen">
      <ul className="flex flex-col gap-5">
        {menu.filter(m=>!m.bottom).map(item => (
          <li key={item.label}>
            <button
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide ${location.pathname === item.route ? 'bg-white/20 text-teal-200' : ''}`}
              onClick={()=>navigate(item.route)}
            >
              <i className={`fa-solid ${item.icon} text-2xl`} />
              {item.label}
            </button>
          </li>
        ))}
        {menu.filter(m=>m.bottom).map(item => (
          <li key={item.label}>
            <button className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-bold text-lg tracking-wide ${location.pathname === item.route ? 'bg-white/20 text-teal-200' : ''}`}
              onClick={()=>navigate(item.route)}>
              <i className={`fa-solid ${item.icon} text-2xl`} />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
