import React, { useState } from 'react';
import { Loader2, Info, Compass, Map } from 'lucide-react';
import { API_BASE_URL } from '../constants/config';
import { CityCard } from '../components/CityCard';
import { SearchForm } from '../components/SearchForm';

export function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isWakingUp, setIsWakingUp] = useState(false);

    const searchCities = async (e) => {
        if (e) e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        setLoading(true);
        setIsWakingUp(false);

        const timer = setTimeout(() => {
            setIsWakingUp(true);
        }, 1500);

        try {
            const response = await fetch(`${API_BASE_URL}/cities/search?q=${encodeURIComponent(trimmedQuery)}`);
            if (!response.ok) throw new Error('Search failed');
            const data = await response.json();
            setResults(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            clearTimeout(timer);
            setLoading(false);
            setIsWakingUp(false);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            <SearchForm
                query={query}
                setQuery={setQuery}
                onSearch={searchCities}
                loading={loading}
            />

            <main className="max-w-7xl mx-auto px-6 py-20">
                {loading && (
                    <div className="text-center py-32 flex flex-col items-center animate-in fade-in duration-700">
                        <div className="relative mb-12">
                            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl animate-[spin_3s_linear_infinite] flex items-center justify-center">
                                <Compass className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[60px] animate-pulse"></div>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Navigating Zambia...</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm text-lg font-medium">We're gathering regional insights for you. Please hold on.</p>

                        {isWakingUp && (
                            <div className="mt-12 group flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl animate-bounce border border-orange-100 dark:border-orange-900/50">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
                                    <Info className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-xs uppercase tracking-widest text-orange-600">Cold Start</p>
                                    <p className="font-bold text-slate-900 dark:text-white">The server is waking up...</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-200 dark:border-slate-800 pb-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-0.5 w-12 bg-emerald-600"></div>
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Exploration Mode</span>
                                </div>
                                <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    Locations matching <span className="text-emerald-600">"{query}"</span>
                                </h3>
                            </div>
                            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-[2rem] flex items-center gap-4 shadow-2xl">
                                <Map className="w-6 h-6 text-emerald-400 dark:text-emerald-600" />
                                <span className="font-black text-lg tracking-tighter">{results.length} DESTINATIONS FOUND</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {results.map((city) => (
                                <CityCard key={`${city.name}-${city.province}-${city.population}`} city={city} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && query && results.length === 0 && (
                    <div className="text-center py-40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500">
                        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner group transition-all duration-700 hover:scale-110">
                            <Compass className="w-14 h-14 text-slate-300 group-hover:rotate-45 transition-transform duration-700" />
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">No Territory Found</h2>
                        <p className="text-slate-400 dark:text-slate-500 text-xl font-medium max-w-md mx-auto leading-relaxed">
                            Our maps don't show any matches for <span className="text-slate-900 dark:text-white">"{query}"</span>. Try searching for a major hub like <span className="underline decoration-emerald-500 decoration-2">Lusaka</span>.
                        </p>
                    </div>
                )}

                {!loading && !query && (
                    <div className="text-center py-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/1200px-Flag_of_Zambia.svg.png" alt="Zambia" className="h-12 mx-auto rounded-lg shadow-2xl mb-4" />
                        <p className="text-xs font-black tracking-[1em] uppercase">Proudly Zambian</p>
                    </div>
                )}
            </main>
        </div>
    );
}
