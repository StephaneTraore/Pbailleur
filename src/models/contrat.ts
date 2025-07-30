export interface ContartsResponse {
   content: Contrats[];
   totalPages: number;
   totalElements: number;
  
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
