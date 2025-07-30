export interface  Proprietaire {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string ;

}

export interface ProprietaireResponse {
   content: Proprietaire[];
   totalPages: number;
   totalElements: number;
  
}