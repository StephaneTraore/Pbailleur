import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface SiteResponse {
   content: Site[];
   totalPages: number;
   totalElements: number;
  
}

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface  Site {
  id?: number;
  numeroSite: string;
  nomSite: string;
  quartierId: number;
  superficie: number;
  hpilone: number;
  latitude: number;
  longitude: number;
  typeSite: string;
  dateMiseEnService: string;
  etat: string;
  localisation: string;

}




export const siteService = {
  getAll: () => api.get<ApiResponse<SiteResponse>>('/sites/all'),
  getById: (id: number) => api.get<Site>(`/sites/${id}`),
  create: (data: Omit<Site, 'id'>) => api.post<Site>('/sites/add', data),
  update: (id: number, data: Partial<Site>) => api.put<Site>(`/sites/update/${id}`, data),
  delete: (id: number) => api.delete(`/sites/delete/${id}`),
};

