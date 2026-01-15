import React from 'react';
import { Search, Loader2, Navigation } from 'lucide-react';

export function SearchForm({ query, setQuery, onSearch, loading }) {
    return (
        <div className="relative z-50 -mt-16 w-full max-w-4xl mx-auto px-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-3 border border-slate-100 dark:border-slate-800 transition-all duration-500 focus-within:scale-[1.02] focus-within:shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
                <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow flex items-center px-8 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] transition-all group focus-within:bg-white dark:focus-within:bg-slate-800">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-focus-within:rotate-12 transition-all duration-500">
                            <Navigation className="w-6 h-6" />
                        </div>
                        <label htmlFor="city-search" className="sr-only">Search for a city or province</label>
                        <input
                            type="text"
                            id="city-search"
                            name="city-search"
                            placeholder="Search for a city or province (e.g. Kitwe, Lusaka...)"
                            className="flex-grow py-6 px-6 bg-transparent outline-none text-xl font-bold dark:text-white dark:placeholder-slate-600 placeholder-slate-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl active:scale-95 disabled:opacity-50 min-w-[220px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            <Search className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        )}
                        <span className="relative z-10">Discover Now</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
