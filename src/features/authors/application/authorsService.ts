import apiClient from '../../../shared/api/apiClient';

export const fetchAuthors = async () => {
  return apiClient.get('/authors');
};