
// region

import { Prefecture } from "./prefecture";

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