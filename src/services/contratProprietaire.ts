import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Wrapper générique pour les réponses API
interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

// Pour envoyer (POST/PUT)
export interface ContratProprietaireRequestDto {
  idContrat: number;
  idProprietaire?: number;
  idSite: number;
  partPourcent: number;
}



// Pour recevoir
export interface ContratProprietaireResponseDto {
  id?: number;
  siteId: number;
  contratId: number;
  siteNom: string;
  partPourcent: number;
  quartierNom: string;
  regionNom: string;
}

// ✅ Pagination response
export interface ContratsProprietairePaginatedResponse {
  content: ContratProprietaireResponseDto[];
  totalPages: number;
  totalElements: number;
}

// ✅ Service complet
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