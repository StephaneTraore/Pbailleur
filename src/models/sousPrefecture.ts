import { Quartiers } from "./quartier";

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