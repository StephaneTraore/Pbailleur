import axios from 'axios';
import { SiteProprietairePaginatedResponse, SiteResponseDto, SiteRequestDto } from '../models/site';
import { ProprietaireResponse, Proprietaire } from '../models/proprietaires';
import { ContartsResponse, Contrats } from '../models/contrat';
import { ContratsProprietairePaginatedResponse, ContratProprietaireResponseDto, ContratProprietaireRequestDto } from '../models/contratProprietaire';
import { Quartiers } from '../models/quartier';
import { Prefecture } from '../models/prefecture';
import { Region } from '../models/region';
import { SousPrefecture } from '../models/sousPrefecture';
import { ApiResponse } from '../models/ApiResponse';


const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




//Api proprietaire

export const proprietaireService = {
  getAll: () => api.get<ApiResponse<ProprietaireResponse>>('/proprietaires/all'),
  getById: (id: number) => api.get<Proprietaire>(`/proprietaires/${id}`),
  create: (data: Omit<Proprietaire, 'id'>) => api.post<Proprietaire>('/proprietaires/add', data),
  update: (id: number, data: Partial<Proprietaire>) => api.put<Proprietaire>(`/proprietaires/update/${id}`, data),
  delete: (id: number) => api.delete(`/proprietaires/delete/${id}`),
};

//Api contrat 

export const contratService = {
  getAll: () => api.get<ApiResponse<ContartsResponse>>('/contrats/all'),
  getById: (id: number) => api.get<Contrats>(`/contrat/${id}`),
  create: (data: Omit<Contrats, 'id'>) => api.post<Contrats>('/contrats/add', data),
  update: (id: number, data: Partial<Contrats>) => api.put<Contrats>(`/contrat/${id}`, data),
  delete: (id: number) => api.delete(`/contrats/delete/${id}`),
};


//  Api contratProprietaire
export const contratProprietaireService = {
  getAll: () =>
    api.get<ApiResponse<ContratsProprietairePaginatedResponse>>(
      '/contrats-proprietaires/all'
    ),

  getById: (id: number) =>
    api.get<ApiResponse<ContratProprietaireResponseDto>>(
      `/contrats-proprietaires/${id}`
    ),


  getByProprietaireId: (id: number) =>
  api.get<ApiResponse<ContratProprietaireResponseDto[]>>(
    `/contrats-proprietaires/all-proprietaire-contrat/${id}`
  ),  

  create: (data: ContratProprietaireRequestDto) =>
    api.post<ApiResponse<ContratProprietaireResponseDto>>(
      '/contrats-proprietaires/link',
      data
    ),

  update: (id: number, data: Partial<ContratProprietaireRequestDto>) =>
    api.put<ApiResponse<ContratProprietaireResponseDto>>(
      `/contrats-proprietaires/update/${id}`,
      data
    ),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/contrats-proprietaires/delete/${id}`),
};


//Api Quartier

export const QuartierService = {
  getAll: () => api.get<ApiResponse<Quartiers[]>>('/quartiers/all'),
  getById: (id: number) => api.get<Quartiers>(`/quartiers/${id}`),
  create: (data: Omit<Quartiers, 'id'>) => api.post<Quartiers>('/quartiers/add', data),
  update: (id: number, data: Partial<Quartiers>) => api.put<Quartiers>(`/quartiers/update/${id}`, data),
  delete: (id: number) => api.delete(`/quartiers/${id}`), 
};

// Api Region
export const RegionService = {
  getAll: () => api.get<ApiResponse<Region[]>>('/regions/all'),
};


// Api Prefecture
export const PrefectureService = {
  getAll: () => api.get<ApiResponse<Prefecture[]>>('/prefectures/all'),
};




// Api sousPrefecture
export const SousPrefectureService = {
  getAll: () => api.get<ApiResponse<SousPrefecture[]>>('/sous-prefecture/all'),
};


//Api site 

export const siteService = {
  getAll: () => api.get<ApiResponse<SiteProprietairePaginatedResponse>>('/sites/all'),
  getById: (id: number) => api.get<SiteResponseDto>(`/sites/${id}`),
  create: (data: Omit<SiteRequestDto, 'id'>) => api.post<SiteResponseDto>('/sites/add', data),
  update: (id: number, data: Partial<SiteRequestDto>) => api.put<SiteResponseDto>(`/sites/update/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<null>>(`/sites/delete/${id}`),
};

