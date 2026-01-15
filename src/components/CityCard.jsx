import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Building2, ArrowRight } from 'lucide-react';

export function CityCard({ city }) {
    if (!city) return null;

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">{city.province}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-emerald-600 transition-colors duration-500">
                        {city.name}
                    </h3>
                </div>
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:rotate-12 transition-all duration-500">
                    <MapPin className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                </div>
            </div>

            <div className="space-y-6 flex-grow relative z-10">
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                        <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Population</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">{city.population?.toLocaleString() || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                        <Building2 className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">{city.is_capital ? 'Provincial Capital' : 'Major Town'}</p>
                    </div>
                </div>
            </div>

            <Link
                to={`/province/${city.province}`}
                className="mt-10 group/btn relative overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-2xl hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white"
            >
                <span>Explore Region</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500" />
            </Link>
        </div>
    );
}
