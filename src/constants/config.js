export const PROVINCE_COORDINATES = {
    'Central': [-14.3, 28.5],
    'Copperbelt': [-13.0, 28.0],
    'Eastern': [-13.5, 32.0],
    'Luapula': [-11.0, 29.0],
    'Lusaka': [-15.4, 28.3],
    'Muchinga': [-10.5, 31.5],
    'Northern': [-10.0, 31.0],
    'North-Western': [-13.0, 25.0],
    'Southern': [-16.5, 27.0],
    'Western': [-15.0, 24.0]
};

export const ZAMBIA_CENTER = [-13.13, 27.84];

export const getApiBaseUrl = () => {
    const envUrl = import.meta.env?.VITE_API_BASE_URL;
    if (envUrl && envUrl !== 'undefined' && envUrl !== '') {
        return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }
    return 'https://zambia-geo-api.onrender.com/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();
