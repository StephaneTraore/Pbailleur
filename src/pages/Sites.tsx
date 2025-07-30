import Sidebar from "../components/layout/sidebar";
import Myheader from "../components/layout/myheader";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { useEffect, useState } from "react";
import SupprimerModal from "../components/PageSite/supprimer";
import Mybuttons from "../components/PageSite/Mybuttons";
import AddSiteModal from "../components/PageSite/AddSite";
import EditSiteModal from "../components/PageSite/EditSite";
import DetailSiteModal from "../components/PageSite/detail";
import {  siteService } from "../services/api";
import { toast } from "react-toastify";
import { SiteResponseDto } from "../models/site";



export default function Sites(){

      const [sites, setSite]= useState<SiteResponseDto[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [selectedSite, setSelecetedSite] = useState<SiteResponseDto | null>(null);
      const [searchTerm, setSearchTerm] = useState('');

      const [isOpen, setIsOpen] = useState({
          confirmation:false,
          update:false,
          add:false,
          detail:false,
          
        });

            const filteredSites = sites.filter((q) =>
              q.nomSite.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.nomQuartier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.nomPrefecture?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.nomRegion?.toLowerCase().includes(searchTerm.toLowerCase())||
              q.etat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              q.nomSousPrefecture?.toLowerCase().includes(searchTerm.toLowerCase())  ||
              q.numeroSite?.toLowerCase().includes(searchTerm.toLowerCase())  
              
            );

      const loadSites = async () =>{
        try{
             setLoading(true);
              const response = await siteService.getAll();
              setSite(response.data.data.content);
              setError(error);
        }catch(error){
          setError('Erreur lors du chargement des Sites');
        }finally{
          setLoading(false);
        }   
      }; 

      const handleDelete = async(id:number)=>{
        try{
          await siteService.delete(id);
          toast.success("Site supprimé avec succès", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                        
           });
          await loadSites();
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

      useEffect(()=>{
        loadSites();
      }, [])

    const columns: GridColDef<SiteResponseDto>[] = [    
      { field: 'id', 
        headerName: 'Nº',
        width: 51,
        sortable: false,
        flex:1,
        
        
      },
    
      { field: 'numeroSite', headerName: 'No Site', width: 119, sortable: false,  },
      
      { field: 'nomSite', headerName: 'Non Site', width: 119, sortable: false,  },

      


      {
        field: 'nomQuartier',
        headerName: 'Quartier',
        width: 227,
        sortable: false,
        flex:1,
       
      },
      {
        field: 'nomSousPrefecture',
        headerName: 'Sous Prefecture',
        flex:1, 
        width: 213,
        sortable: false,
        //editable: true,
      },
      {
        field: 'nomPrefecture',
        headerName: 'Préfecture',
        
        width: 176,
        sortable: false,
        flex:1,
        
      },
     
      {
        field: 'superficie',
        headerName: 'Sup.(m2)',
        sortable: false,
        width: 207,
        flex:1,
       // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },

      {
        field: 'hpilone',
        headerName: 'H Pilone (m)',
        sortable: false,
        width: 110,
        flex:1,
       // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },

      {
        field: 'etat',
        headerName: 'Etat',
        sortable: false,
        width: 110,
        flex:1,
       // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },
    
      {
      field: "options",
      headerName: "Options",
      type: "actions",
      width: 154,
      flex:1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<IoEye size={18} color="#000000" />}
          label="Voir"
          onClick={()=> {
            setSelecetedSite(params.row);
            setIsOpen({...isOpen,detail:true})}}
        />,
        <GridActionsCellItem
          icon={<TiPencil size={18} color="#000" />}
          label="Modifier"
          onClick={()=>{
            setSelecetedSite(params.row)
            setIsOpen({...isOpen,update:true})}}
        />,

        <GridActionsCellItem
          icon={<IoTrashOutline size={18} color="red" />}
          label="Supprimer"
          onClick={()=>{
            setSelecetedSite(params.row)
            setIsOpen({...isOpen,confirmation:true})}}
         
          showInMenu={false}
        />,
      ],
    }
    ];
    

    //  if(loading) return <div>Chargement...</div>;
    //  if(error) return <div>Erreur: {error}</div>;

    return(
        <>
        <div>
            <Sidebar/>
            <Myheader title="Gestion des Sites"
            label="Nouveau Site" 
            total={sites.length}
            onLabelClick={() =>setIsOpen({...isOpen,add:true})}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
             />
            <Mybuttons />     
        </div>
                  
        <div>
            <Box  className=" ml-[337px] mt-[26px] mr-[28px]  " >
            <DataGrid
                //rows={sites}
                rows={filteredSites}
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
                    backgroundColor:'none',
                    
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
        </div>

        <SupprimerModal 
                  open={isOpen.confirmation} 
                  onClose={() => setIsOpen({...isOpen,confirmation:false})}
                  onConfirm={() => selectedSite && handleDelete(selectedSite.id!)}
        />

        <AddSiteModal  open={isOpen.add}
         onClose={() => setIsOpen({...isOpen,add:false})} 
         onSuccess={loadSites}
         />


        <EditSiteModal open={isOpen.update}
         onClose={() => setIsOpen({...isOpen,update:false})} 
         onSuccess={loadSites}
         site={selectedSite}

         /> 


         <DetailSiteModal open={isOpen.detail} 
         onClose={() => setIsOpen({...isOpen,detail:false})}
         site={selectedSite}
         />  
        
        </>
    )
}