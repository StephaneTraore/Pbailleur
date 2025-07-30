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
     quartierId: number;
}

export interface SiteProprietairePaginatedResponse{

   content: SiteResponseDto[];
   totalPages: number;
   totalElements: number;

}