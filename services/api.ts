import api from '../lib/axios'

// axios api 호출 함수 정의
// user 관련
export const createUser = (signUpData) => api.post('/user', signUpData)

// 여행 post 관련
export const createPost = (postData) => api.post('/post', postData)
export const getPosts = () => api.get('/post/findAll')
export const updatePost = (postId) => api.put(`/post/${postId}`)
export const deletePost = (postId) => api.delete(`/post/${postId}`)

// 커뮤니티 post 관련
export const getCommunityPosts = () => api.get('/community')
export const getCommunityPostDetail = (communityPostId) =>
  api.get(`/community/${communityPostId}`)
export const deleteCommunityPost = (communityPostId) =>
  api.delete(`/community/${communityPostId}`)
export const updateCommunityPost = (communityPostId) =>
  api.put(`/community/${communityPostId}`, communityPostId)
export const createCommunityPost = (postData) =>
  api.post('/community', postData)

// 채팅 관련 (추가해야 함)
export const getChatList = (userId) => api.get('/chat/list')
export const getChatRoom = (roomId) => api.get('/chat/roomId/' + roomId)
export const createChatRoom = () => api.post('/chat/room')
