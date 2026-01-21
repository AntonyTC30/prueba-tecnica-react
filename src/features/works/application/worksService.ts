import apiClient from '../../../shared/api/apiClient';
import { Poem } from '../../../shared/types/poetry';

export const fetchWorksByAuthor = async (author: string): Promise<Poem[]> => {
  return apiClient.get<Poem[]>(`/author/${encodeURIComponent(author)}`);
};

export const fetchPoemByTitle = async (title: string): Promise<Poem[]> => {
  return apiClient.get<Poem[]>(`/title/${encodeURIComponent(title)}`);
};