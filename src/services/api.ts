import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface  Site {
  id?: number;
  numeroSite: string;
  nomSite: string;
  nomQuartier: string | undefined;
  nomSousPrefecture: string;
  nomPrefecture: string;
  superficie: number;
  hPilone: number;
  latitude: number;
  longitude: number;
  typeSite: string;
  dateMiseEnService: string;
  etat: string;
  localisation: string;

}


export const siteService = {
  getAll: () => api.get<Site[]>('/sites/all'),
  getById: (id: number) => api.get<Site>(`/sites/${id}`),
  create: (data: Omit<Site, 'id'>) => api.post<Site>('/sites/add', data),
  update: (id: number, data: Partial<Site>) => api.put<Site>(`/sites/${id}`, data),
  delete: (id: number) => api.delete(`/sites/${id}`),
};

