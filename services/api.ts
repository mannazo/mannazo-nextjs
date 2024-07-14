import api from '../lib/axios'

export const createUser = (signUpData) => api.post('/user', signUpData)
export const createPost = (postData) => api.post('/post', postData)
export const getPosts = () => api.get('/post/findAll')
export const getUser = (id) => api.get(`/user/${id}`)
export const putUser = (id, putData) => api.put(`/user/${id}`, putData)
export const deleteUser = (id) => api.delete(`/user/${id}`)
