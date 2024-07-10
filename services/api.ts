import api from '../lib/axios'

export const createUser = (signUpData) => api.post('/user', signUpData)
