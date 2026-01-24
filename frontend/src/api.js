// Delete weight record
export const deleteWeight = (token, animalId, weightId) =>
	api.delete(`/animals/${animalId}/weight/${weightId}`, { headers: { Authorization: `Bearer ${token}` } });

// Delete activity record
export const deleteActivity = (token, animalId, activityId) =>
	api.delete(`/animals/${animalId}/activities/${activityId}`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchNotifications = (token) =>
	api.get('/notifications', { headers: { Authorization: `Bearer ${token}` } });

export const addNotification = (token, data) =>
	api.post('/notifications', data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteNotification = (token, id) =>
	api.delete(`/notifications/${id}`, { headers: { Authorization: `Bearer ${token}` } });
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api' })

export const login = (email, password) => api.post('/auth/login', { email, password })
export const me = (token) => api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })


export const fetchAnimals = (token) =>
	api.get('/animals', { headers: { Authorization: `Bearer ${token}` } })


export const addAnimal = (token, data) => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('species', data.species);
	formData.append('birth', data.birth);
	formData.append('notes', data.notes);
	if (data.photo) formData.append('photo', data.photo);
	return api.post('/animals', formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		},
	});
};

export default api
