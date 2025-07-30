
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