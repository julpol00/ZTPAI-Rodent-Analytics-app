import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3001/api' })

export const login = (email, password) => api.post('/auth/login', { email, password })
export const me = (token) => api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })

export default api
