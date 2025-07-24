import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Myheader from "../components/layout/myheader";
import Sidebar from "../components/layout/sidebar";
import MybuttonQuartier from "../components/PageQuartier/MybuttonQuartier";
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { useEffect, useState } from "react";
import AddQuartierModal from "../components/PageQuartier/AddQuartier";
import EditQuartierModal from "../components/PageQuartier/EditQuartier";
import DeleteQuartierModal from "../components/PageQuartier/DeleteQuartier";
import DetailQuartierModal from "../components/PageQuartier/DetailQuartier";
import {  Quartiers, QuartierService } from "../services/quartier";
import { toast } from "react-toastify";


export default function Quartier(){

      const [quartier, setQuartier] = useState<Quartiers[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [selectedQuartier, setSelecetedQuartier] = useState<Quartiers | null>(null);

            const loadQuartier = async () => {
              try{
                  setLoading(true);
                  const response = await QuartierService.getAll();
                  console.log(response);
                  setQuartier(response.data.data);
                  setError(error)
              }catch(error){
                setError('Erreur lors du chargement des quartier')
              }finally{
                setLoading(false)
              }
            }


              const handleDelete = async(id:number)=>{
                   try{
                       await QuartierService.delete(id);
                      toast.success("Quartier supprimé avec success", {
                          position: "top-right",
                          autoClose: 4000,
                          hideProgressBar: false,
                          
                        });
                       await loadQuartier();
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
                      loadQuartier();
                   }, [])
                  

     const [isOpen, setIsOpen] = useState({
                  confirmation:false,
                  update:false,
                  add:false,
                  detail:false,
                  
                });

    

    const columns: GridColDef<Quartiers>[] = [    
      


        { field: 'id',
          headerName: 'ID',
          width: 119,
          sortable: false, 
        },


    {
        field: 'nom',
        headerName: 'Nom Quartier',
        width: 227,
        sortable: false,
        flex:1,
      },



      

      { field: 'nomSousPrefecture', headerName: 'Nom CRD ', width: 119, sortable: false, flex:1,  },

      { field: 'nomPrefecture', headerName: 'Nom Prefecture', width: 119, sortable: false, flex:1, },
      
  
      {
        field: 'nomRegion',
        headerName: 'Region',
        width: 176,
        sortable: false,
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
          icon={<IoEye size={18} color="#000000" />}
          label="Voir"
          onClick={()=>{
           setSelecetedQuartier(params.row)
            setIsOpen({...isOpen,detail:true})}}
        />,
        <GridActionsCellItem
          icon={<TiPencil size={18} color="#000" />}
          label="Modifier"
          onClick={()=>{
            setSelecetedQuartier(params.row)
            setIsOpen({...isOpen,update:true})}}
        />,

        <GridActionsCellItem
          icon={<IoTrashOutline size={18} color="red" />}
          label="Supprimer"
          onClick={()=>{
            setSelecetedQuartier(params.row)
            setIsOpen({...isOpen,confirmation:true})}}
         
          showInMenu={false}
        />,
      ],
    }
    ];
    
   

    return(
        <>
            <div>
                <Sidebar />
                <Myheader title="Quartiers" label="Nouveau quartier" total={quartier.length} onLabelClick={() =>setIsOpen({...isOpen,add:true})} />
                <MybuttonQuartier/>
            </div>

            <div>
                 <Box  className=" ml-[337px] mt-[26px] mr-[28px] " >
            <DataGrid
                rows={quartier}
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

            <AddQuartierModal 
              open={isOpen.add} 
              onClose={() => setIsOpen({...isOpen,add:false})}
              onSuccess={loadQuartier} 

             />


            <EditQuartierModal 
              open={isOpen.update} 
              onClose={() => setIsOpen({...isOpen,update:false})} 
              onSuccess={loadQuartier}
              quartier={selectedQuartier} 

             />


            <DetailQuartierModal 
              open={isOpen.detail} 
              onClose={() => setIsOpen({...isOpen,detail:false})}
              quartier={selectedQuartier} 

            />


            <DeleteQuartierModal  
            open={isOpen.confirmation} 
            onClose={() => setIsOpen({...isOpen,confirmation:false})}
            onConfirm={() => selectedQuartier && handleDelete(selectedQuartier.id!)} 
            />
        </>
    )
}