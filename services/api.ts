import api from '../lib/axios'
import axios from 'axios'

// axios api 호출 함수 정의
// user 관련
export const createUser = (signUpData) => api.post('/user', signUpData)
export const getUser = (id) => api.get(`/user/${id}`)
export const putUser = (id, putData) => api.put(`/user/${id}`, putData)
export const deleteUser = (id) => api.delete(`/user/${id}`)
export const findAllUsers = () => api.get(`/user/findAll`)
// 여행 post 관련
export const createPost = (postData) => api.post('/post', postData)
export const getPostsByPage = (page, size) =>
  api.get(`/post/findAll?page=${page}&size=${size || null}`)
export const updatePost = (postId) => api.put(`/post/${postId}`)
export const deletePost = (postId) => api.delete(`/post/${postId}`)
export const getPostsByUser = (userId) => api.get(`/post/user/${userId}`)

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
// 채팅방 이벤트 스트림은 EventSource 인스턴스로 받음. useChatSSE 훅을 참고
// export const getChatRoom = (roomId) => api.get(`/chat/roomId/${roomId}`)
export const createChatRoom = (user1Id: string, user2Id: string) =>
  api.post('/chat/room', { user1Id, user2Id })
export const sendChatMessage = (
  senderId: string,
  roomId: string,
  msg: string
) => api.post('/chat', { senderId, roomId, msg })
export const getChatRoomList = (userId) =>
  api.get(`/chat/room/userId/${userId}`)
export const createFeedback = (
  reviewerId: string,
  revieweeId: string,
  rating: number,
  comment: string
) => api.post('/review', { reviewerId, revieweeId, rating, comment })
//Shop 관련
export const createProduct = (productData) => api.post('/shop', productData)
export const fetchProducts = () => api.get(`/shop/findAll`)

//Order 관현
export const createOrder = (orderData) => api.post('/shop/order/od', orderData)
export const getRecentOrders = () => api.get('/shop/order/recent')

//Admin 관현
export const getNumberOfUsers = () => api.get('/admin/count/allUsers')
export const getNumberOfPosts = () => api.get(`/admin/count/posts`)
// export const getNumberOfOrders = () => api.get(`/shop/order/count`)
export const getNumberOfOrders = () => api.get(`/shop/order/count`)
export const deleteProduct = (id) => api.delete(`/shop/${id}`)