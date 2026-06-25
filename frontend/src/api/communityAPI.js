import { apiClient } from './client';

export const getPosts = async () => {
  const { data } = await apiClient.get('/api/community');
  return data;
};

export const createPost = async (postData) => {
  const { data } = await apiClient.post('/api/community', postData);
  return data;
};

export const likePost = async (id) => {
  const { data } = await apiClient.put(`/api/community/${id}/like`, {});
  return data;
};
