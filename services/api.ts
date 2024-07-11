import api from '../lib/axios'

export const createUser = (signUpData) => api.post('/user', signUpData)
export const createPost = (postData) => api.post('/post', postData)
export const getPosts = () => api.get('/post/findAll')
