import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className="bg-white py-4 px-6 flex justify-center items-center shadow flex-shrink-0 relative" style={{minHeight:'4.5rem'}}>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-center gap-4">
          <img src="/img/logo_2.svg" alt="logo" className="h-16" />
          <div className="text-4xl font-black text-purple-800 tracking-wider">Rodent Analytics</div>
        </div>
      </div>
      <button onClick={logout} className="absolute right-8 top-1/2 -translate-y-1/2 text-base text-[var(--primary-purple)] border border-[var(--primary-purple)] px-5 py-2 rounded font-bold">LOG OUT</button>
    </header>
  );
}
