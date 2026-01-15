import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2, Info, ArrowLeft } from 'lucide-react';

const getApiBaseUrl = () => {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  if (envUrl && envUrl !== 'undefined' && envUrl !== '') {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }
  return 'https://zambia-geo-api.onrender.com/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

function CityCard({ city }) {
  if (!city) return null;
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-green-800">{city.name}</h3>
      <div className="mt-2 space-y-1 text-gray-600">
        <p><span className="font-semibold">Population:</span> {city.population?.toLocaleString() || 'N/A'}</p>
        <p><span className="font-semibold">Province:</span> {city.province || 'Unknown'}</p>
        <p><span className="font-semibold">Provincial Capital:</span> {city.is_capital ? 'Yes' : 'No'}</p>
      </div>
      <Link
        to={`/province/${city.province}`}
        className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
      >
        View Province <MapPin className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
}

function Home() {
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
    setResults([]);

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
    <main className="max-w-4xl mx-auto p-6 -mt-8">
      <form onSubmit={searchCities} className="bg-white rounded-xl shadow-xl p-2 mb-8 flex items-center">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search for a city"
            className="w-full py-3 px-4 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-12">
          <Loader2 className="animate-spin w-12 h-12 text-green-700 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">Fetching Zambian data...</p>
          {isWakingUp && (
            <p className="mt-2 text-orange-600 animate-pulse">
              The server is waking up, please wait...
            </p>
          )}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((city) => (
            <CityCard key={`${city.name}-${city.province}-${city.population}`} city={city} />
          ))}
        </div>
      )}

      {!loading && query && results.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No cities found matching "{query}"</p>
        </div>
      )}
    </main>
  );
}

function Province() {
  const { provinceName } = useParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      <div className="max-w-4xl mx-auto p-6 text-center">
        <Loader2 className="animate-spin w-8 h-8 text-green-700 mx-auto" />
      </div>
    );
  }

  if (error || cities.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Province not found</h2>
        <Link to="/" className="text-green-700 hover:underline mt-4 inline-block font-medium">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="flex items-center text-green-700 hover:text-green-800 mb-6 group font-medium">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Search
      </Link>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">Province: {provinceName}</h2>
        <p className="text-gray-600 mt-2 font-medium">Major Cities & Towns</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((city) => (
          <div key={city.name} className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold text-green-800">{city.name}</h3>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Population:</span> {city.population?.toLocaleString() || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-green-700 text-white py-12 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">🇿🇲 Zambia Geo Explorer</h1>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/province/:provinceName" element={<Province />} />
        <Route path="*" element={<div className="p-12 text-center text-2xl font-bold text-gray-800">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}


export default App;
