import axios from 'axios';

// ================= RENDER BACKEND URL =================
const API_URL = 'https://api.jadhavarparamedicalcollege.com/api';

// ================= AXIOS INSTANCE =================
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
});

// ================= TOKEN INTERCEPTOR =================
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ================= AUTH API =================
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    checkAuth: () => api.get('/auth/check-auth')
};

// ================= GALLERY API =================
export const galleryAPI = {
    getAll: () => api.get('/gallery'),
    getById: (id) => api.get(`/gallery/${id}`),
    create: (formData) =>
        api.post('/gallery', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    update: (id, formData) =>
        api.put(`/gallery/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    delete: (id) => api.delete(`/gallery/${id}`)
};

// ================= ANNOUNCEMENT API =================
export const announcementAPI = {
    getAll: () => api.get('/announcements'),          // PUBLIC
    getAllAdmin: () => api.get('/announcements/all'), // ADMIN
    getById: (id) => api.get(`/announcements/${id}`),
    create: (data) => api.post('/announcements', data),
    update: (id, data) => api.put(`/announcements/${id}`, data),
    delete: (id) => api.delete(`/announcements/${id}`)
};

// ================= CAREER API =================
export const careerAPI = {
    getAll: () => api.get('/careers'),
    getAllAdmin: () => api.get('/careers/all'),
    getById: (id) => api.get(`/careers/${id}`),
    create: (data) => api.post('/careers', data),
    update: (id, data) => api.put(`/careers/${id}`, data),
    delete: (id) => api.delete(`/careers/${id}`)
};

// ================= BLOG API =================
export const blogAPI = {
    getAll: () => api.get('/blogs'),
    getAllAdmin: () => api.get('/blogs/admin/all'),  // Make sure this matches backend route
    getBySlug: (slug) => api.get(`/blogs/slug/${slug}`),  // Get by slug
    getById: (id) => api.get(`/blogs/${id}`),  // Get by ID (for admin)
    create: (formData) =>
        api.post('/blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    update: (id, formData) =>
        api.put(`/blogs/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    delete: (id) => api.delete(`/blogs/${id}`)
};

export default api;