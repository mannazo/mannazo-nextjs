import api from '../lib/axios'

// axios api 호출 함수 정의
// user 관련
export const createUser = (signUpData) => api.post('/user', signUpData)
export const getUser = (id) => api.get(`/user/${id}`)
export const putUser = (id, putData) => api.put(`/user/${id}`, putData)
export const deleteUser = (id) => api.delete(`/user/${id}`)

// 여행 post 관련
export const createPost = (postData) => api.post('/post', postData)
export const getPostsByPage = (page) => api.get(`/post/findAll?page=${page}`)
export const updatePost = (postId) => api.put(`/post/${postId}`)
export const deletePost = (postId) => api.delete(`/post/${postId}`)

// 커뮤니티 post 관련
export const getCommunityPosts = () => api.get('/community/findAll')
export const getCommunityPostDetail = (communityPostId) =>
  api.get(`/community/${communityPostId}`)
export const deleteCommunityPost = (communityPostId) =>
  api.delete(`/community/${communityPostId}`)
export const updateCommunityPost = (communityPostId) =>
  api.put(`/community/${communityPostId}`, communityPostId)
export const createCommunityPost = (postData) =>
  api.post('/community', postData)

// 채팅 관련 (추가해야 함)
export const getChatList = (userId) => api.get(`/chat/list/${userId}`)
export const getChatRoom = (roomId) => api.get(`/chat/roomId/${roomId}`)
export const createChatRoom = (chatUsers) => api.post('/chat/room', chatUsers)
export const sendChatMessage = (
  senderId: string,
  roomId: string,
  msg: string
) => api.post('https://mannazo.diligentp.com/chat/', { senderId, roomId, msg })
