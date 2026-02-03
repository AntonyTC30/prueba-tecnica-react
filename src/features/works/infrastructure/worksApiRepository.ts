import apiClient from "@/shared/api/apiClient";
import { Work } from "../domain/work";
import { WorksRepository } from "../domain/worksRepository";

export const worksApiRepository: WorksRepository = {
  getByAuthor: (author) =>
    apiClient.get<Work[]>(`/author/${encodeURIComponent(author)}`),

  getByTitle: (title) =>
    apiClient.get<Work[]>(`/title/${encodeURIComponent(title)}`),
};
