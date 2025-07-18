import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/sidebar";
import Myheader from "../components/layout/myheader";
import MybuttonContrat from "../components/PageContrat/MybuttonContrat";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import AddContratModal from "../components/PageContrat/AddContrat";
import EditContratModal from "../components/PageContrat/EditContrat";
import DetailContratModal from "../components/PageContrat/DetailContrat";
import DeleteContratModal from "../components/PageContrat/DeleteContrat";
import { Contrats, contratService } from "../services/contrat";



export default function Contrat(){

  const [contrat, setContrat]= useState<Contrats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContrat, setSelecetedContrat] = useState<Contrats | null>(null);

        const loadContrat = async () =>{
          try{
               setLoading(true);
                const response = await contratService.getAll();
                setContrat(response.data);
                setError(error);
          }catch(error){
            setError('Erreur lors du chargement des contrats');
          }finally{
            setLoading(false);
          }   
        };


              const handleDelete = async(id:number)=>{
                try{
                  await contratService.delete(id);
                  await loadContrat();
                  setIsOpen({...isOpen, confirmation: false});
                }catch(error){
                  setError('Erreur lors de la suppression');
                  console.error(error);
                }
              };

              useEffect(()=>{
                      loadContrat();
                    }, [])

    const [isOpen, setIsOpen] = useState({
              confirmation:false,
              update:false,
              add:false,
              detail:false,
              
            });

        const columns: GridColDef<Contrats>[] = [    
      { field: 'Numero', 
        headerName: 'Nº Contrat',
        width: 51,
        sortable: false,
        flex:1,
        
        
      },
         

      { field: 'NomSite', headerName: 'Non Site', width: 119, sortable: false,  },

      { field: 'NoSite', headerName: 'Nº Site', width: 119, sortable: false,  },

      {
        field: 'debut',
        headerName: 'Date Début',
        width: 227,
        sortable: false,
        flex:1,
       
      },
      {
        field: 'mt_mensuel',
        headerName: 'Mt mensuel',
        flex:1, 
        width: 213,
        sortable: false,
        //editable: true,
      },
      {
        field: 'aug',
        headerName: 'Aug', 
        width: 176,
        sortable: false,
        flex:1,
        
      },
     
      {
        field: 'cfu',
        headerName: 'CFU',
        sortable: false,
        width: 207,
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
        field: 'type',
        headerName: 'Type',
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
          onClick={() =>setIsOpen({...isOpen,detail:true})}
        />,
        <GridActionsCellItem
          icon={<TiPencil size={18} color="#000" />}
          label="Modifier"
          onClick={() =>setIsOpen({...isOpen,update:true})}
        />,

        <GridActionsCellItem
          icon={<IoTrashOutline size={18} color="red" />}
          label="Supprimer"
          onClick={() =>setIsOpen({...isOpen,confirmation:true})}
         
          showInMenu={false}
        />,
      ],
    }
    ];
    
    // const rows = [
    //   { Numero: 3622, id: 1, NomSite:'FRIGUIADI' , NoSite: '2518',  debut: '05/07/2022', fin:'04/07/2027',mt_mensuel:1764706, aug:'0.0', cfu:'15.0', etat:'En service', type:'Location'  },
    // ];

    return(
        <>
            <div>
                <Sidebar />
                <Myheader title="Contrat" label="Nouveau contrat" total={20} onLabelClick={() =>setIsOpen({...isOpen,add:true})} />
                <MybuttonContrat />
            </div>

            <div>
                
                    <div>
            <Box  className=" ml-[337px] mt-[26px] mr-[28px] " >
            <DataGrid
                rows={contrat}
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
        </div>

        <AddContratModal  
        open={isOpen.add} 
        onClose={() => setIsOpen({...isOpen,add:false})} 
       // onSuccess{loadContrat}
        />


        <EditContratModal  
        open={isOpen.update} 
        onClose={() => setIsOpen({...isOpen,update:false})} 
       // onSuccess={loadContrat}
        />


        <DetailContratModal  
        open={isOpen.detail} 
        onClose={() => setIsOpen({...isOpen,detail:false})} 
        //contrat={selectedContrat}
        />


        <DeleteContratModal  
        open={isOpen.confirmation} 
        onClose={() => setIsOpen({...isOpen,confirmation:false})} 
       // onConfirm={() => selectedContrat && handleDelete(selectedContrat.id!)}
        />


        </>
    )
}