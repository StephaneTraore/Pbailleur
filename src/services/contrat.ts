import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface  Contrats {
  id?: number;
  site: string;
  ref_contrat: number;
  date_debut: string;
  date_fin: string;
  date_elaboration: string;
  mt_mensuel_initial: number;
  mt_mensuel_actuel: number;
  taux_augmentation: number;
  taux_cfu: number;
  type_contrat: string;

}


export const contratService = {
  getAll: () => api.get<Contrats[]>('/contrat'),
  getById: (id: number) => api.get<Contrats>(`/contrat/${id}`),
  create: (data: Omit<Contrats, 'id'>) => api.post<Contrats>('/contrat', data),
  update: (id: number, data: Partial<Contrats>) => api.put<Contrats>(`/contrat/${id}`, data),
  delete: (id: number) => api.delete(`/contrat/${id}`),
};

