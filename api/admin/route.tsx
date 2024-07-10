// api/apiFunctions.ts
import axiosInstance from './axiosConfig';
import axios from 'axios'

export const testConnection = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/');
    return JSON.stringify(response.data);
  } catch (error) {
    console.error('Error testing connection:', error);
    throw error;
  }
};

export const getNumberOfPosts = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/count/posts')
    return JSON.stringify(response.data)
  } catch (error) {
    console.error('Error getting number of posts:', error);
    throw error;
  }
};

export const getNumberOfAllUsers = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/count/allUsers');
    return JSON.stringify(response.data);
  } catch (error) {
    console.error('Error getting number of all users:', error);
    throw error;
  }
};

export const getNumberOfUsersByNationality = async () => {
  try {
    const response = await axiosInstance.get(`/count/nationality`);
    return response.data;
  } catch (error) {
    console.error(`Error getting number of users from each nationality`, error);
    throw error;
  }
};
