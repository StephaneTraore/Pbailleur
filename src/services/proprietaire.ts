import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface  Proprietaire {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string | null;

}

export interface ProprietaireResponse {
   content: Proprietaire[];
   totalPages: number;
   totalElements: number;
  
}

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}


export const proprietaireService = {
  getAll: () => api.get<ApiResponse<ProprietaireResponse>>('/proprietaires/all'),
  getById: (id: number) => api.get<Proprietaire>(`/proprietaires/${id}`),
  create: (data: Omit<Proprietaire, 'id'>) => api.post<Proprietaire>('/proprietaires/add', data),
  update: (id: number, data: Partial<Proprietaire>) => api.put<Proprietaire>(`/proprietaires/update/${id}`, data),
  delete: (id: number) => api.delete(`/proprietaires/delete/${id}`),
};