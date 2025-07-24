import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Request
export interface SiteRequestDto{

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

//Response
export interface SiteResponseDto{

      id?: number;
    nomSite:string;
    numeroSite: string ;
    superficie: number;
    longitude: number;
    latitude: number;
    localisation: string;
    typeSite: string;
    etat: string;
    nomQuartier: string;
    nomSousPrefecture: string;
    nomPrefecture: string;
    nomRegion: string;
    dateMiseEnService: string;
    hpilone: number;
}

export interface SiteProprietairePaginatedResponse{

    content: SiteResponseDto[];
   totalPages: number;
   totalElements: number;

}



interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}


// export interface SiteResponse {
//    content: [];
//    totalPages: number;
//    totalElements: number;
  
// }

// export interface  Site {
//   id?: number;
//   numeroSite: string;
//   nomSite: string;
//   quartierId: number;
//   superficie: number;
//   hpilone: number;
//   latitude: number;
//   longitude: number;
//   typeSite: string;
//   dateMiseEnService: string;
//   etat: string;
//   localisation: string;

// }


//  create: (data: ContratProprietaireRequestDto) =>
//     api.post<ApiResponse<ContratProprietaireResponseDto>>(
//       '/contrats-proprietaires/link',
//       data
//     ),


export const siteService = {
  getAll: () => api.get<ApiResponse<SiteProprietairePaginatedResponse>>('/sites/all'),
  getById: (id: number) => api.get<SiteResponseDto>(`/sites/${id}`),
  create: (data: Omit<SiteRequestDto, 'id'>) => api.post<SiteResponseDto>('/sites/add', data),
  update: (id: number, data: Partial<SiteRequestDto>) => api.put<SiteResponseDto>(`/sites/update/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<null>>(`/sites/delete/${id}`),
};

