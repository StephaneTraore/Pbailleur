// prefecture

import { SousPrefecture } from "./sousPrefecture";

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