
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function AddAnimal() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', species: '', birth: '', notes: '', photo: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleFile = e => {
    setForm(f => ({ ...f, photo: e.target.files[0] }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.species || !form.birth || !form.photo) {
      setError('All fields (including photo) are required.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { addAnimal } = await import('../api');
      await addAnimal(token, form);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add animal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-300 to-purple-800 font-sans flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-0 h-0" style={{minHeight: '0', height: '100%'}}>
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-start overflow-x-auto mt-32">
          <form className="flex flex-row gap-16 items-stretch bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full min-h-[400px] h-[50vh]" onSubmit={handleSubmit}>
            {/* Photo section */}
            <div
              className="flex flex-col justify-center items-center w-64 bg-white border-2 border-[#a3bebd] rounded-xl cursor-pointer"
              onClick={() => document.getElementById('photo-input')?.click()}
            >
              <button
                type="button"
                className="text-[6rem] text-[#a3bebd] bg-none border-none cursor-pointer transition-colors duration-300 hover:text-white hover:bg-[#6a2a91] w-full h-full flex items-center justify-center rounded-xl"
                tabIndex={-1}
              >
                +
              </button>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                className="hidden"
                tabIndex={-1}
                onChange={handleFile}
              />
              {form.photo && (
                <img src={URL.createObjectURL(form.photo)} alt="preview" className="max-w-[90%] max-h-[200px] rounded-lg object-contain mt-2" />
              )}
            </div>
            {/* Form section */}
            <div className="flex flex-col justify-start items-center w-[28rem] min-h-full">
              <div className="flex flex-col gap-4 w-full">
                <input type="text" name="name" placeholder="name" value={form.name} onChange={handleChange} className="h-10 w-full rounded-xl border-2 border-[#a3bebd] bg-white text-center font-bold text-[#6a2a91] text-base shadow focus:outline-none focus:border-[#6a2a91] placeholder-[#a3bebd] placeholder:font-semibold" />
                <input type="text" name="species" placeholder="species" value={form.species} onChange={handleChange} className="h-10 w-full rounded-xl border-2 border-[#a3bebd] bg-white text-center font-bold text-[#6a2a91] text-base shadow focus:outline-none focus:border-[#6a2a91] placeholder-[#a3bebd] placeholder:font-semibold" />
                <input type="date" name="birth" placeholder="birth" value={form.birth} onChange={handleChange} className="h-10 w-full rounded-xl border-2 border-[#a3bebd] bg-white text-center font-bold text-[#6a2a91] text-base shadow focus:outline-none focus:border-[#6a2a91] placeholder-[#a3bebd] placeholder:font-semibold" />
              </div>
              <textarea placeholder="add notes" name="notes" value={form.notes} onChange={handleChange} className="min-h-[120px] mt-4 border-2 border-[#a3bebd] rounded-xl bg-white font-bold text-[#6a2a91] text-base text-center w-full shadow focus:outline-none focus:border-[#6a2a91] placeholder-[#a3bebd] placeholder:font-bold"></textarea>
              <div className="flex flex-col justify-end h-full mt-4 w-full">
                <button type="submit" disabled={loading} className="bg-[#5d2e8c] text-[#a3bebd] px-6 py-2 rounded-xl border-none font-bold shadow cursor-pointer tracking-wider h-10 transition-colors duration-300 hover:bg-[#5123a8]">{loading ? 'Saving...' : 'SAVE'}</button>
                {error && <div className="text-red-600 font-bold mt-2 text-center">{error}</div>}
              </div>
            </div>
          </form>
        </main>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}
