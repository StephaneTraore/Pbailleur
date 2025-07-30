import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar";
import { IoIosLink } from "react-icons/io";
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import {  IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import Box from "@mui/material/Box";
import ContratModal from "./contrat";
import { useLocation } from "react-router-dom";
import ConfirmationModalDetail from "./confirmation2";
import ContratModificationModal2 from "./contratModification";
import { toast } from "react-toastify";
import { ContratProprietaireResponseDto } from "../../models/contratProprietaire";
import { Proprietaire } from "../../models/proprietaires";
import { contratProprietaireService } from "../../services/api";


export default function DetailProprietaire(){


    const [isOpen, setIsOpen] = useState({
          confirmation:false,
          contrat:false,
          contratModif:false,
          contratModif2:false
        });


    const location = useLocation();
    const selectedProprio = location.state ;    


        const [contratProprietaire, setContratProprietaire] = useState<ContratProprietaireResponseDto[]>([]);
        const [selectedcontrat, setSelectedContrat] = useState<ContratProprietaireResponseDto >();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [proprio, setProprio] = useState<Proprietaire | null>(null);



           const loadContratProprietaire = async () => {
             try{
                 setLoading(true);
                 const response = await contratProprietaireService.getByProprietaireId(selectedProprio.id);
                 setContratProprietaire(response.data.data)
                 setError(error)
             }catch(error){
               setError('Erreur lors du chargement des informations')
             }finally{
               setLoading(false)
             }
           } 




         useEffect(() => {
        if (selectedProprio?.id) {
          loadContratProprietaire();
        }
        }, [selectedProprio?.id]);

            const handleDelete = async(id:number)=>{
                try{
                  await contratProprietaireService.delete(id);
                  toast.success("Contrat propriétaire supprimé avec success", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    
                  });
                  await loadContratProprietaire();
                  setIsOpen({...isOpen, confirmation: false});
                }catch(error){
                  setError('Erreur lors de la suppression');
                    toast.error("Erreur lors de la suppression", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    
                  });
                  console.error(error);
                }
              };
        

    const columns: GridColDef<ContratProprietaireResponseDto>[] = [
  


   { field: 'id', 
    headerName: 'ID',
    width: 1,
    sortable: false,
    flex:1, 
  },

    { field: 'siteId', 
    headerName: 'No Site',
    width: 100,
    sortable: false,
    flex:1,
    
    
  },


  {
    field: 'siteNom',
    headerName: 'Nom Site',
    width: 227,
    sortable: false,
    flex:1,
   
  },
  {
    field: 'partPourcent',
    headerName: 'Part %',
    flex:1,
    width: 213,
    sortable: false,
    
  },
  {
    field: 'quartierNom',
    headerName: 'Quartier',
    flex:1,
    width: 176,
    sortable: false,
    
  },
 
  {
    field: 'regionNom',
    headerName: 'Region',
    sortable: false,
    width: 207,
    flex:1,
   
  },

  {
  field: "options",
  headerName: "Options",
  type: "actions",
  width: 154,
  flex:1,
  getActions: (params) => [
   
    <GridActionsCellItem
      icon={<TiPencil size={18} color="#000" />}
      label="Modifier"
      onClick={()=>{
        setSelectedContrat(params.row)
        setIsOpen({...isOpen,contratModif2:true})
      }
        }
    />,
  
    <GridActionsCellItem
      icon={<IoTrashOutline size={18} color="red" />}
      label="Supprimer"
      onClick={()=>
      {
        setSelectedContrat(params.row)
        setIsOpen({...isOpen,confirmation:true})
      }}
      showInMenu={false}
    />,
  ],
}
];

  // if (loading) return <div className=" text-center text-5xl ">Chargement...</div>;
  // if (error) return <div className="text-red-500 text-center text-5xl ">{error}</div>;
  // if (!contratProprietaire) return  <div className="text-red-500 text-center text-5xl" >Introuvable...</div>;

    return(
        <>
        <div>
            <Sidebar />
        </div>
        
        <div className=" py-[13px]   ml-[335px] mr-[30px] mt-[85px] bg-white ">
            <div className="  mx-[19px]  flex justify-between">
                <div className="flex gap-5">
                    <img src="/src/assets/images/profil.jpeg" className="w-[43px] rounded-full h-[43px] " alt="" />
                    <h1 className=" my-[] font-bold text-[32px] ">{selectedProprio.nom.toUpperCase()}</h1>
                </div>

                <div className=" flex items-center gap-5 bg-[#F08130] ">
                    <IoIosLink size={20} onClick={() =>setIsOpen({...isOpen,contratModif:true})} color="#000" className="my-[11.4px] ml-[30px] cursor-pointer  " />
                    <label htmlFor="" className=" mr-[30px] font-bold text-[1.4rem] cursor-pointer  " onClick={() =>setIsOpen({...isOpen,contratModif:true})}  >Lier un contrat </label>
                </div>

            </div>
        </div>


        <div className=" pt-[22px] pb-[19px] bg-[#000000]  ml-[335px] mr-[30px] mt-[6px]  ">
            <div className=" ml-[24px] mr-[154px] border-1  flex justify-between">
                <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >nom</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">{selectedProprio.nom}</h2>
                </div>

                <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >Telephone</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">{selectedProprio.telephone}</h2>
                </div>

                 <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem] " >email</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">{selectedProprio.email}</h2>
                </div>

                 <div>
                    <label htmlFor="" className="text-[#999999] text-[1.3rem]" >Adresse</label>
                    <h2 className="text-white font-bold text-[1.4rem] ">{selectedProprio.adresse}</h2>
                </div>
                
            </div>
        </div>

         <div className=" py-[23px]   ml-[335px] mr-[30px] mt-[57px] bg-white ">
            <div className="  ml-[19px] ">
                <h2 className="text-[2.5rem] font-bold ">Sites appartenant</h2>

            </div>
        </div>

      <Box  className=" ml-[337px] mt-[26px] mr-[28px]" >
      <DataGrid
        rows={contratProprietaire}
        columns={columns} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
         sx={{
             
          border:'none',
          '& .MuiDataGrid-cell': {  
            fontSize: '1.4rem',
            
              
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: '1.4rem',
            backgroundColor:'#FAFAFA !important',    
          },'& .MuiDataGrid-columnHeaderTitle':{
            fontWeight: 'bold'
          }, '& .MuiTablePagination-displayedRows':{
            fontSize:'14px'
          },'& .MuiPaginationItem-root': {
            fontSize: '1.5rem',
           },
          '& .MuiPaginationItem-icon': {
            fontSize: '2rem', 
           },
           
        }}
        pageSizeOptions={[5]}
      />
    </Box>
     <ConfirmationModalDetail 
          open={isOpen.confirmation} 
          onClose={() => setIsOpen({...isOpen,confirmation:false})}
          onConfirm={() => handleDelete(selectedcontrat?.id ?? 0)}
        />   

      {/* <ContratModificationModal open={isOpen.contrat}
        onClose={() => setIsOpen({ ...isOpen, contrat: false })}
        nom="Modifier"
           onSuccess={loadContratProprietaire} proprietaire={null} 
          /> */}


      <ContratModal open={isOpen.contratModif} 
      onClose={() =>setIsOpen({...isOpen,contratModif:false})} 
      nom="Enregistrer" onSuccess={loadContratProprietaire}
       proprietaire={selectedProprio}
        />

        <ContratModificationModal2
        open={isOpen.contratModif2}
        onClose={() => setIsOpen({ ...isOpen, contratModif2: false })}
        nom="Modifier"
        onSuccess={loadContratProprietaire}
        contratProprietaire={selectedcontrat}
        proprietaire={selectedProprio}
        
        />
               

        </>
    )
}