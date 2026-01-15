import React from 'react';
import { Sun, Moon, Globe2, Sparkles } from 'lucide-react';

export function Header({ darkMode, setDarkMode }) {
    return (
        <header className="relative pt-20 pb-32 px-6 overflow-hidden bg-[#004225] dark:bg-slate-950 transition-colors duration-700">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-10 right-[-5%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px] animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            {/* Top Navbar Style Toggle */}
            <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-emerald-500 transition-all duration-500">
                        <Globe2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-black tracking-tighter text-xl uppercase">ZedGeo</span>
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all duration-300 group shadow-2xl"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? (
                        <Sun className="w-6 h-6 text-yellow-300 group-hover:rotate-90 transition-transform duration-500" />
                    ) : (
                        <Moon className="w-6 h-6 text-indigo-100 group-hover:-rotate-12 transition-transform duration-500" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8 animate-in fade-in zoom-in duration-1000">
                    <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                    <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Explore Greatness</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] text-center max-w-4xl drop-shadow-2xl">
                    Zambia <span className="text-emerald-400">Geo</span> Explorer
                </h1>

                <p className="text-emerald-100/60 font-medium text-lg md:text-2xl max-w-2xl leading-relaxed">
                    The ultimate platform for discovering the towns, people, and geography of Zambia.
                </p>

                {/* Floating Stat - Decorative */}
                <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col gap-4 animate-float">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl w-40">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Population</p>
                        <p className="text-white text-2xl font-black">20M+</p>
                    </div>
                </div>
                <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-4 animate-float delay-1">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl w-40">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Cities</p>
                        <p className="text-white text-2xl font-black">100+</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
