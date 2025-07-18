import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// region

export interface RegionResponse {
   content: Region[];
   totalPages: number;
   totalElements: number;
  
}



export interface Region {
  id: number;
  nom: string;
  prefectures: Prefecture[];
}

export const RegionService = {
  getAll: () => api.get<ApiResponse<Region[]>>('/regions/all'),
};

// prefecture


export interface Prefecture {
  id: number;
  nom: string;
  nomRegion: string;
  sousPrefectures: SousPrefecture[];
}

export interface PrefectureResponse {
   content: Prefecture[];
   totalPages: number;
   totalElements: number;
  
}

export const PrefectureService = {
  getAll: () => api.get<ApiResponse<Prefecture[]>>('/prefectures/all'),
};








export interface SousPrefecture {
  id: number;
  nomSousPrefecture: string;
  quartiers: Quartiers[];
}

export interface SousPrefectureResponse {
   content: SousPrefecture[];
   totalPages: number;
   totalElements: number;
  
}

export const SousPrefectureService = {
  getAll: () => api.get<ApiResponse<SousPrefecture[]>>('/sous-prefecture/all'),
};







//quartier

export interface Quartiers {
  id: number;
  nom: string;
  nomSousPrefecture: string;
  nomPrefecture: string;
  nomRegion: string;
  sousPrefectureId: string;
}


export interface QuartiersResponse {
   content: Quartiers[];
   totalPages: number;
   totalElements: number;
  
}

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}


export const QuartierService = {
  getAll: () => api.get<ApiResponse<Quartiers[]>>('/quartiers/all'),
  getById: (id: number) => api.get<Quartiers>(`/quartiers/${id}`),
  create: (data: Omit<Quartiers, 'id'>) => api.post<Quartiers>('/quartiers/add', data),
  update: (id: number, data: Partial<Quartiers>) => api.put<Quartiers>(`/quartiers/update/${id}`, data),
  delete: (id: number) => api.delete(`/quartiers/${id}`), 
};