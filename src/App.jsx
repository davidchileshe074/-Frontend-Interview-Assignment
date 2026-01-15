import  { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Province } from './pages/Province';
import { Globe2 } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite/Webpack
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-700 dark:bg-slate-950 dark:text-slate-100 selection:bg-emerald-500/30">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/province/:provinceName" element={<Province />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center py-48 px-6 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="text-[20rem] font-black text-slate-200/40 dark:text-white/5 select-none tracking-tighter">404</div>
              </div>
              <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Off the Map</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md text-center text-xl font-medium leading-relaxed">
                You've wandered into uncharted territory. Let's get you back to the major crossroads.
              </p>
              <a href="/" className="group relative overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Return to Capital</span>
                <div className="absolute inset-0 bg-emerald-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </a>
            </div>
          }
        />
      </Routes>

      <footer className="py-24 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tighter dark:text-white uppercase transition-colors">ZedGeo Explorer</p>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-600 tracking-widest uppercase">The heart of Africa, mapped.</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase mb-2">Developed for Recruitment 2026</p>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2 justify-center md:justify-end">
              Built with <span className="text-orange-500 animate-pulse">❤</span> by ZedLearn Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default App;
