import axios from 'axios';

const customFetch = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

customFetch.interceptors.request.use(
  (config) => {
    const condition = window.location.pathname.split('/')[1];
    const token =
      condition === 'wbsportsandyouth'
        ? localStorage.getItem(import.meta.env.VITE_SPORTS_TOKEN)
        : localStorage.getItem(import.meta.env.VITE_SERVICE_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('unauthenticated'));
    } else if (error.response && error.response.status === 403) {
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default customFetch;
