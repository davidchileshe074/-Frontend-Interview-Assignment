import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, MapPin, Navigation, Info, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { API_BASE_URL, PROVINCE_COORDINATES, ZAMBIA_CENTER } from '../constants/config';

// Helper component to update map view
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 8);
    }, [center, map]);
    return null;
}

export function Province() {
    const { provinceName } = useParams();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const center = PROVINCE_COORDINATES[provinceName] || ZAMBIA_CENTER;

    useEffect(() => {
        let isMounted = true;
        const fetchProvinceCities = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`${API_BASE_URL}/provinces/${provinceName}/cities`);
                if (!response.ok) throw new Error('Province not found');
                const data = await response.json();
                if (isMounted) {
                    setCities(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Province fetch error:', err);
                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProvinceCities();
        return () => { isMounted = false; };
    }, [provinceName]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-48 text-center animate-in fade-in duration-1000">
                <div className="relative inline-block mb-8">
                    <Loader2 className="animate-spin w-16 h-16 text-emerald-600 mx-auto" />
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
                <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-xs">Accessing Geographic Records...</p>
            </div>
        );
    }

    if (error || cities.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-16 shadow-2xl border border-slate-100 dark:border-slate-800">
                    <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl">
                        <Navigation className="w-10 h-10 text-red-500 rotate-45" />
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">Unknown Territory</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-sm mx-auto text-xl font-medium leading-relaxed">
                        The province <span className="text-red-500">"{provinceName}"</span> hasn't been charted in our database yet.
                    </p>
                    <Link
                        to="/"
                        className="group relative overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl inline-flex items-center gap-3 hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        Return to Safety
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Navigation & Header */}
            <div className="flex flex-col xl:flex-row gap-12">

                {/* Left Column: Info & List */}
                <div className="xl:w-[400px] flex flex-col gap-8">
                    <Link to="/" className="group inline-flex items-center gap-4 bg-white dark:bg-slate-900 px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 self-start">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:-translate-x-2 transition-transform">
                            <ArrowLeft className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300">Back Dashboard</span>
                    </Link>

                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">Regional Profile</p>
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8 uppercase">
                            {provinceName}
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Towns</p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">{cities.length}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="text-xl font-black text-emerald-600">Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        <div className="flex items-center gap-3 px-2 mb-2">
                            <Layers className="w-4 h-4 text-emerald-600" />
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Urban Centers</h3>
                        </div>
                        {cities.map((city) => (
                            <div key={city.name} className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600">{city.name}</h4>
                                        <div className="flex items-center gap-2 mt-2 opacity-60">
                                            <Info className="w-3 h-3" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest">{city.population.toLocaleString()} Residents</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                        <MapPin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Massive Map */}
                <div className="flex-grow min-h-[600px] lg:min-h-[800px] relative">
                    <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-4 border-4 border-white dark:border-slate-800 overflow-hidden">
                        <MapContainer center={center} zoom={8} scrollWheelZoom={false} className="z-10">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapUpdater center={center} />
                            {cities.map((city) => (
                                <Marker
                                    key={city.name}
                                    position={[
                                        center[0] + (Math.random() - 0.5) * 0.8,
                                        center[1] + (Math.random() - 0.5) * 0.8
                                    ]}
                                >
                                    <Popup className="premium-popup">
                                        <div className="p-4 text-center min-w-[180px]">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 block">{provinceName}</span>
                                            <h4 className="font-black text-2xl text-slate-900 mb-4 leading-none">{city.name}</h4>
                                            <div className="h-40 w-full bg-slate-100 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                                                <div className="bg-white/50 p-2 rounded-full">
                                                    <MapPin className="text-emerald-600 w-10 h-10" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400 border-t pt-4">
                                                <span>Population</span>
                                                <span className="text-slate-900">{city.population.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Floating UI Overlay for Map */}
                    <div className="absolute top-10 right-10 z-20 flex flex-col gap-4">
                        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Map View</p>
                            <p className="text-sm font-bold opacity-60">Topographic Sat</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
