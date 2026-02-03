import apiClient from "@/shared/api/apiClient";

interface AuthorsApiResponse {
  authors: string[];
}

export const authorsApiRepository = async (): Promise<string[]> => {
  const response = await apiClient.get<AuthorsApiResponse>("/authors");
  return response.authors;
};
