
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

// Pagination response
export interface ContratsProprietairePaginatedResponse {
  content: ContratProprietaireResponseDto[];
  totalPages: number;
  totalElements: number;
}