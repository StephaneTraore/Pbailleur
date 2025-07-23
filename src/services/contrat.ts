import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export interface ContartsResponse {
   content: Contrats[];
   totalPages: number;
   totalElements: number;
  
}

interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface  Contrats {
  id?: number;
  nomSite: string;
  reference: string;
  dateDebut: string;
  dateFin: string;
  dateElaboration: string;
  montantMensuelInitial: number ;
  montantMensuelActuel: number;
  tauxAugmentation: number;
  tauxCfu: number;
  typeContrat: string;
  siteId: number;

}


export const contratService = {
  getAll: () => api.get<ApiResponse<ContartsResponse>>('/contrats/all'),
  getById: (id: number) => api.get<Contrats>(`/contrat/${id}`),
  create: (data: Omit<Contrats, 'id'>) => api.post<Contrats>('/contrats/add', data),
  update: (id: number, data: Partial<Contrats>) => api.put<Contrats>(`/contrat/${id}`, data),
  delete: (id: number) => api.delete(`/contrats/delete/${id}`),
};

